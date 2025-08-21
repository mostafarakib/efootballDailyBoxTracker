import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./UI/popover";
import { useSelector } from "react-redux";
import predictionService from "../appwrite/predictionService";
import { Loader } from ".";

function PredictionDropdown() {
  const user = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // Helper: get YYYY-MM-DD in local timezone
  const getLocalToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    if (!user?.$id) return;

    const fetchPrediction = async () => {
      try {
        setLoading(true);
        setError(null);
        const today = getLocalToday();

        const res = await predictionService.getPredictionForDate(
          user.$id,
          today
        );

        console.log("Prediction for today:", res);

        if (res.userId) {
          setPrediction(res);
        } else {
          setPrediction(null);
        }
      } catch (error) {
        console.error("PredictionDropdown error:", error);
        setError("Could not fetch today's tip.");
      } finally {
        setLoading(false);
      }
    };
    fetchPrediction();
  }, [user?.$id]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">
          Today's Tips
        </p>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        {loading && <Loader />}

        {error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && !error && !prediction && (
          <p className="text-sm text-gray-400">
            No tip available for today yet. Try updating your data!
          </p>
        )}

        {!loading && prediction && (
          <div className="space-y-2">
            <h3 className="font-semibold text-center">Your Tip</h3>
            <p className=" text-sm">{prediction.predictionText}</p>
            {prediction.predictionProbability && (
              <p className="text-xs">
                Confidence:{" "}
                <span className="font-bold text-green-500">
                  {Math.round(prediction.predictionProbability * 100)}
                </span>
                %
              </p>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default PredictionDropdown;
