import { Client, Databases, ID, Query } from "appwrite";
import config from "../config/config.js";

export class DataBaseService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  async savePenaltyData(userId, date, scored, direction, notes = "") {
    try {
      const existingData = await this.getPenaltyDataByDate(userId, date);

      // Helper function to format to local timestamp as yyyy/mm/dd hh:mm:ss
      const formatTimestamp = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };

      // to match the expected format in the database
      const normalizedScored = Boolean(scored);
      const normalizedDirection = direction.toLowerCase();

      // If data already exists, check if update is needed
      if (existingData) {
        // Check if any of the fields have changed
        const hasChanged =
          existingData.scored !== normalizedScored ||
          existingData.direction !== normalizedDirection ||
          existingData.notes !== notes;

        // If no changes, return existing data without DB operation
        if (!hasChanged) {
          return { data: existingData, noChanges: true };
        }

        // Only update if data has changed
        const penaltyData = {
          userId,
          date,
          scored: Boolean(scored), // Ensure scored is a boolean
          direction: direction.toLowerCase(), // Convert direction to lowercase
          notes,
          updatedAt: formatTimestamp(new Date()),
        };

        const result = await this.databases.updateDocument(
          config.appwriteDatabaseId,
          config.appwriteCollectionId,
          existingData.$id,
          penaltyData
        );

        return { data: result, noChanges: false };
      }
      // if no data exists, create a new document
      else {
        const penaltyData = {
          userId,
          date,
          scored: normalizedScored,
          direction: normalizedDirection,
          notes,
          updatedAt: formatTimestamp(new Date()),
        };

        const result = await this.databases.createDocument(
          config.appwriteDatabaseId,
          config.appwriteCollectionId,
          ID.unique(),
          penaltyData
        );

        return { data: result, noChanges: false };
      }
    } catch (error) {
      console.log("appwrite:: Error saving penalty data:", error);
      throw error;
    }
  }

  async getPenaltyDataByDate(userId, date) {
    try {
      const response = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [Query.equal("userId", userId), Query.equal("date", date)]
      );

      return response.documents.length > 0 ? response.documents[0] : null;
    } catch (error) {
      console.log("appwrite:: Error getting penalty data by date:", error);
      throw error;
    }
  }

  // Get all penalty data for a user
  async getAllPenaltyData(userId, limit = 100) {
    try {
      const response = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [
          Query.equal("userId", userId),
          Query.orderDesc("date"),
          Query.limit(limit),
        ]
      );

      return response.documents;
    } catch (error) {
      console.log("Database:: Error getting all penalty data:", error);
      return [];
    }
  }

  // Delete penalty data for a specific date
  async deletePenaltyData(userId, date) {
    try {
      const existingData = await this.getPenaltyDataByDate(userId, date);

      if (existingData) {
        return await this.databases.deleteDocument(
          config.appwriteDatabaseId,
          config.appwritePenaltyCollectionId,
          existingData.$id
        );
      }

      throw new Error("No data found for this date");
    } catch (error) {
      console.log("Database:: Error deleting penalty data:", error);
      throw error;
    }
  }
}

const databaseService = new DataBaseService();
export default databaseService;
