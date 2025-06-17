import React, { useState } from "react";
import { RadioInput, Button } from "../components";

import classes from "./DailyBoxDataForm.module.css";
import { useSelector } from "react-redux";
import databaseService from "@/appwrite/service";
function DailyBoxDataForm({ date }) {
  const [selectedDirection, setSelectedDirection] = useState("");
  const [goalScored, setGoalScored] = useState("");

  const userData = useSelector((state) => state.auth.userData);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedDirection) {
      alert("Please select a direction");
      return;
    }

    if (!goalScored) {
      alert("Please select if goal was scored");
      return;
    }

    // Format date as YYYY-MM-DD using local timezone (avoids UTC conversion issues)
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is 0-indexed
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;

    try {
      console.log("Form submitted", {
        selectedDirection,
        goalScored,
      });
      await databaseService.savePenaltyData(
        userData.$id,
        formattedDate,
        goalScored === "Yes",
        selectedDirection.toLowerCase()
      );
      alert("Data saved successfully!");
      // Reset form after successful submission
      setSelectedDirection("");
      setGoalScored("");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("An error occurred while saving the data. Please try again.");
      return;
    }
  };

  return (
    <div className={`flex justify-center items-center`}>
      <form
        className={`border border-gray-300 rounded-lg space-y-6 max-w-lg w-full ${classes["form-container"]}`}
        onSubmit={handleSubmit}
      >
        <RadioInput
          label="Select Direction"
          name="direction"
          value={selectedDirection}
          onChange={(e) => setSelectedDirection(e.target.value)}
          options={["Left", "Center", "Right"]}
          className={`${classes["input-bottom-space"]}`}
        />

        <RadioInput
          label="Goal Scored?"
          name="goalScored"
          value={goalScored}
          onChange={(e) => setGoalScored(e.target.value)}
          options={["Yes", "No"]}
          orientation="horizontal"
          className={`${classes["input-bottom-space"]}`}
        />

        <Button type="submit" className="w-full">
          Save Data
        </Button>
      </form>
    </div>
  );
}

export default DailyBoxDataForm;
