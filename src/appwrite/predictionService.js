import { Client, Databases, ID, Permission, Query, Role } from "appwrite";
import config from "../config/config";
import databaseService from "./service";

export class PredictionService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  // Helper: get user's timezone via browser (fallback to Asia/Dhaka)
  getUserTimezone() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return tz || "Asia/Dhaka";
    } catch {
      return "Asia/Dhaka";
    }
  }

  /**
   * Return the YYYY-MM-DD local date string for the given Date (instant),
   * computed in the provided timeZone.
   *
   * - Preserves the absolute instant (no timezone shifting of the underlying moment).
   * - Uses Intl.formatToParts to safely extract year/month/day in the target zone.
   * - Returns null for invalid input dates.
   *
   * @param {Date|string|number} date - Date instance (or value accepted by new Date()).
   * @param {string|null} timeZone - IANA timezone string, e.g. "Asia/Dhaka".
   * @returns {string|null} YYYY-MM-DD or null if invalid date
   */
  getLocalDateString(date = new Date(), timeZone = null) {
    const tz = timeZone || this.getUserTimezone();

    // Normalize input into a Date instance
    const inputDate = date instanceof Date ? date : new Date(date);

    if (!(inputDate instanceof Date) || isNaN(inputDate.getTime())) {
      // invalid date input: be explicit and return null so callers can handle it
      console.warn("getLocalDateString: invalid date provided:", date);
      return null;
    }

    try {
      // Use formatToParts to get the components in the target timezone.
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: tz,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).formatToParts(inputDate);

      const y = parts.find((p) => p.type === "year")?.value;
      const m = parts.find((p) => p.type === "month")?.value;
      const d = parts.find((p) => p.type === "day")?.value;

      if (!y || !m || !d) {
        console.warn("getLocalDateString: could not extract date parts", parts);
        return null;
      }

      return `${y}-${m}-${d}`; // already zero-padded by '2-digit' option
    } catch (err) {
      // Intl API could throw for an unknown timezone string — fallback & warn
      console.warn(
        "getLocalDateString: Intl error or invalid timezone:",
        tz,
        err
      );

      // Last-resort fallback: compute using UTC (not ideal)
      const fallback = new Date(inputDate.toISOString());
      const fy = fallback.getUTCFullYear();
      const fm = String(fallback.getUTCMonth() + 1).padStart(2, "0");
      const fd = String(fallback.getUTCDate()).padStart(2, "0");
      return `${fy}-${fm}-${fd}`;
    }
  }

  // Compute a prediction from array of entries.
  // entries: [{ date: "2025-07-03", shot: "left", gk: "right", scored: true }, ...]
  // options: { decay: 0.9, modelVersion: "v1.0", minEntries: 5 }
  computePredictionFromEntries(entries = [], options = {}) {
    // Validate input
    if (!Array.isArray(entries)) {
      console.error("computePredictionFromEntries: entries must be an array");
      return { error: "Invalid input" };
    }

    // Default options
    const decay = Math.max(0.1, Math.min(0.99, options.decay || 0.9));
    const modelVersion = String(options.modelVersion || "v1.0");
    const minEntries = Math.max(1, parseInt(options.minEntries) || 5);

    // normalize and only keep entries with shot
    const played = entries
      .filter((e) => e && e.shot)
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (played.length < minEntries) {
      return {
        modelVersion,
        entriesCount: played.length,
        note: `insufficient_data (min ${minEntries} required)`,
      };
    }

    // compute weights: newer entries get larger weight
    const n = played.length;
    const weights = Array.from({ length: n }, (_, i) =>
      Math.pow(decay, n - 1 - i)
    ); // index 0 oldest, index n-1 newest

    const shotTotals = { left: 0, center: 0, right: 0 };
    const gkTotals = { left: 0, center: 0, right: 0 };

    for (let i = 0; i < played.length; i++) {
      const e = played[i];
      const w = weights[i] || 1;
      const s = (e.shot || "").toLowerCase();
      const g = (e.gk || "").toLowerCase();
      if (s && shotTotals.hasOwnProperty(s)) shotTotals[s] += w;
      if (g && gkTotals.hasOwnProperty(g)) gkTotals[g] += w;
    }

    const sumShots = shotTotals.left + shotTotals.center + shotTotals.right;
    const sumGks = gkTotals.left + gkTotals.center + gkTotals.right;

    const shotProb = {
      left: sumShots ? shotTotals.left / sumShots : 0,
      center: sumShots ? shotTotals.center / sumShots : 0,
      right: sumShots ? shotTotals.right / sumShots : 0,
    };

    const gkProb = {
      left: sumGks ? gkTotals.left / sumGks : 0,
      center: sumGks ? gkTotals.center / sumGks : 0,
      right: sumGks ? gkTotals.right / sumGks : 0,
    };

    // P(score | shot) estimated from raw counts (unweighted)
    // We'll compute simple counts (you can also weight them if desired)
    const counts = {
      left: { scored: 0, total: 0 },
      center: { scored: 0, total: 0 },
      right: { scored: 0, total: 0 },
    };

    for (const e of played) {
      const s = (e.shot || "").toLowerCase();
      if (s && counts[s]) {
        counts[s].total += 1;
        if (e.scored) counts[s].scored += 1;
      }
    }

    const pScoreGivenShot = {
      left: counts.left.total ? counts.left.scored / counts.left.total : 0,
      center: counts.center.total
        ? counts.center.scored / counts.center.total
        : 0,
      right: counts.right.total ? counts.right.scored / counts.right.total : 0,
    };

    const predictedScoredProb =
      shotProb.left * pScoreGivenShot.left +
      shotProb.center * pScoreGivenShot.center +
      shotProb.right * pScoreGivenShot.right;

    // top-1 shot (most probable)
    const shotEntries = Object.entries(shotProb).sort((a, b) => b[1] - a[1]);
    const predictedShot = shotEntries[0][0];
    const predictedShotProb = shotEntries[0][1];

    const sourceDataRange = {
      from: played[0]?.date
        ? new Date(played[0].date).toISOString().slice(0, 10)
        : null,
      to: played[played.length - 1]?.date
        ? new Date(played[played.length - 1].date).toISOString().slice(0, 10)
        : null,
    };

    return {
      modelVersion,
      entriesCount: played.length,
      predictedShot,
      predictedShotProb,
      predictedScoredProb,
      shotProb,
      gkProb,
      pScoreGivenShot,
      sourceDataRange,
    };
  }

  // Upsert a prediction document for user + targetDate
  // payload should be the object with fields you want to save (we'll add userId & targetDate if not present)
  async createOrUpdatePrediction(userId, targetDate, payload = {}) {
    try {
      // Helper: ensure JSON-like fields are stored as strings
      const normalizeJsonField = (val) => {
        if (val === undefined || val === null) return null;
        if (typeof val === "string") return val;
        try {
          return JSON.stringify(val);
        } catch {
          return String(val);
        }
      };

      // Build normalized payload (so callers can pass objects or strings)
      const normalizedPayload = {
        ...payload,
        sourceDataRange: normalizeJsonField(payload.sourceDataRange),
        metadata: normalizeJsonField(payload.metadata),
      };

      const q = [
        Query.equal("userId", userId),
        Query.equal("targetDate", targetDate),
        Query.limit(1),
      ];
      const res = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwritePredictionsCollectionId,
        q
      );

      // Allowed fields that exist in your collection schema (only these will be sent to Appwrite)
      const allowedFields = [
        "userId",
        "targetDate",
        "predictionText",
        "predictionProbability",
        "predictionDirection",
        "modelVersion",
        "sourceDataRange",
        "predictionMethod",
        "metadata",
      ];

      if (res.documents.length > 0) {
        const doc = res.documents[0];

        // Compare sourceDataRange (string form). If identical => no update needed.
        const existingSourceRange = doc.sourceDataRange ?? null;
        const newSourceRange = normalizedPayload.sourceDataRange ?? null;

        // If source range unchanged AND prediction text/probability unchanged, skip update
        const existingPredText = doc.predictionText ?? null;
        const existingPredProb = doc.predictionProbability ?? null;

        const newPredText =
          normalizedPayload.predictionText ?? existingPredText ?? null;
        const newPredProb =
          normalizedPayload.predictionProbability ?? existingPredProb ?? null;

        const sourceUnchanged = existingSourceRange === newSourceRange;
        const predUnchanged =
          existingPredText === newPredText &&
          Number(existingPredProb) === Number(newPredProb);

        if (sourceUnchanged && predUnchanged) {
          // nothing changed relevant to predictions -> return existing doc (no DB write)
          return doc;
        }

        // Build payloadToSave with only allowed fields (avoid sending Appwrite system attrs)
        const payloadToSave = {};
        allowedFields.forEach((key) => {
          // prefer normalizedPayload value (if present), otherwise keep existing doc's value
          if (normalizedPayload[key] !== undefined) {
            payloadToSave[key] = normalizedPayload[key];
          } else if (doc[key] !== undefined) {
            payloadToSave[key] = doc[key];
          } else {
            // don't set undefined values
          }
        });

        const updated = await this.databases.updateDocument(
          config.appwriteDatabaseId,
          config.appwritePredictionsCollectionId,
          doc.$id,
          payloadToSave
        );
        return updated;
      } else {
        const docPayload = {
          ...normalizedPayload,
          userId,
          targetDate,
        };

        // Only keep allowed fields for creation
        const payloadToCreate = {};
        allowedFields.forEach((key) => {
          if (docPayload[key] !== undefined && docPayload[key] !== null) {
            payloadToCreate[key] = docPayload[key];
          }
        });

        const permissions = [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
        ];

        const created = await this.databases.createDocument(
          config.appwriteDatabaseId,
          config.appwritePredictionsCollectionId,
          ID.unique(),
          payloadToCreate,
          permissions
        );
        return created;
      }
    } catch (err) {
      console.error("PredictionService.createOrUpdatePrediction error:", err);
      throw err;
    }
  }

  // Get one prediction doc for user + targetDate
  async getPredictionForDate(userId, targetDate) {
    try {
      const res = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwritePredictionsCollectionId,
        [
          Query.equal("userId", userId),
          Query.equal("targetDate", targetDate),
          Query.limit(1),
        ]
      );
      return res.documents.length ? res.documents[0] : null;
    } catch (err) {
      console.error("PredictionService.getPredictionForDate error:", err);
      return null;
    }
  }

  async computeAndSavePredictionForDate(userId, targetDate, options = {}) {
    try {
      // fetch all penalty data for user
      const raw = await databaseService.getAllPenaltyData(userId, 1000);

      // transform
      const entries = (raw || []).map((d) => ({
        date: d.date,
        shot: (d.shotDirection || d.shot || "").toLowerCase() || null,
        gk: (d.gkDirection || d.gk || "").toLowerCase() || null,
        scored: !!d.scored,
      }));

      // Exclude entries whose local date equals targetDate (IMPORTANT edge case)
      // Some stored dates may include time, so normalize to YYYY-MM-DD
      const filtered = entries.filter((e) => {
        if (!e.date) return false;
        // get date part in user's timezone (we don't have timezone per record; assume record.date is yyyy-mm-dd or ISO)
        const dISO = new Date(e.date);
        if (isNaN(dISO)) {
          // fallback: if stored as yyyy-mm-dd already
          return e.date.slice(0, 10) !== targetDate;
        } else {
          const recLocal = new Date(
            dISO.toLocaleString("en-US", { timeZone: this.getUserTimezone() })
          );
          const recDateStr = recLocal.toISOString().slice(0, 10);
          return recDateStr !== targetDate;
        }
      });

      // compute prediction from filtered data (exclude today)
      const computed = this.computePredictionFromEntries(filtered, options);

      // prepare doc payload
      let predictionText = "Not enough history to produce a reliable tip.";
      let predictionProbability = 0;
      let predictionDirection = null;

      if (computed.predictedShot) {
        // use conditional probability for the predicted shot if available, else use overall predictedScoredProb
        const condProb = computed.pScoreGivenShot?.[computed.predictedShot];
        predictionProbability =
          typeof condProb === "number" && condProb > 0
            ? condProb
            : computed.predictedScoredProb || 0;
        predictionDirection = computed.predictedShot;
        const pct = Math.round(predictionProbability * 100);
        predictionText = `Today has ${pct}% probability of scoring a goal if you shoot to the ${predictionDirection}.`;
      }

      const docPayload = {
        userId,
        targetDate,
        predictionText,
        predictionProbability,
        predictionDirection,
        modelVersion: computed.modelVersion || options.modelVersion || "v1.0",
        sourceDataRange: computed.sourceDataRange
          ? JSON.stringify(computed.sourceDataRange)
          : null,
        predictionMethod: options.predictionMethod || "recency-weighted",
        metadata: JSON.stringify({
          entriesCount: computed.entriesCount ?? 0,
          shotProb: computed.shotProb ?? { left: 0, center: 0, right: 0 },
          gkProb: computed.gkProb ?? { left: 0, center: 0, right: 0 },
          pScoreGivenShot: computed.pScoreGivenShot ?? {
            left: 0,
            center: 0,
            right: 0,
          },
          predictedScoredProb: computed.predictedScoredProb ?? 0,
        }),
      };

      const saved = await this.createOrUpdatePrediction(
        userId,
        targetDate,
        docPayload
      );
      return { computed, doc: saved };
    } catch (err) {
      console.error(
        "PredictionService.computeAndSavePredictionForDate error:",
        err
      );
      throw err;
    }
  }

  // Convenience: compute & save prediction for user's local "today"
  async computeAndSavePredictionForToday(userId, options = {}) {
    const tz = options.timeZone || this.getUserTimezone();
    const targetDate = this.getLocalDateString(new Date(), tz);
    return this.computeAndSavePredictionForDate(userId, targetDate, options);
  }

  // Public helper: recompute prediction after a penalty save
  async recomputeAfterPenaltySave(userId, savedDateISO = null) {
    try {
      // If no date provided, assume it's from today and don't recompute
      if (!savedDateISO) {
        console.log("No saved date provided - skipping recomputation");
        return null;
      }

      // Parse the saved date and get today's date in user's timezone
      const savedDate = new Date(savedDateISO);
      if (isNaN(savedDate.getTime())) {
        console.warn("Invalid saved date provided - skipping recomputation");
        return null;
      }

      // Get today's date in user's timezone for accurate comparison
      const today = new Date();
      const userTimezone = this.getUserTimezone();

      // Convert both dates to user's timezone for fair comparison
      const savedLocal = new Date(
        savedDate.toLocaleString("en-US", { timeZone: userTimezone })
      );
      const todayLocal = new Date(
        today.toLocaleString("en-US", { timeZone: userTimezone })
      );

      // Extract just the date part (YYYY-MM-DD) for comparison
      const savedDateStr = savedLocal.toISOString().slice(0, 10);
      const todayDateStr = todayLocal.toISOString().slice(0, 10);

      // Only recompute if the saved penalty is from a previous day
      if (savedDateStr < todayDateStr) {
        console.log(
          `Recomputing prediction: saved data from ${savedDateStr} (historical)`
        );
        return await this.computeAndSavePredictionForToday(userId);
      } else if (savedDateStr === todayDateStr) {
        console.log(
          `Skipping recomputation: saved data from ${savedDateStr} (today)`
        );
        return null;
      } else {
        console.warn(
          `Future date detected: ${savedDateStr} - skipping recomputation`
        );
        return null;
      }
    } catch (err) {
      console.warn("PredictionService.recomputeAfterPenaltySave error:", err);
      return null;
    }
  }
}

const predictionService = new PredictionService();
export default predictionService;
