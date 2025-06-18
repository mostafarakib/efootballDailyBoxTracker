import React, { useState } from "react";
import { RadioInput, Button } from "../components";

import classes from "./DailyBoxDataForm.module.css";
import { useSelector } from "react-redux";
import databaseService from "../appwrite/service";
import { toast } from "sonner";
function DailyBoxDataForm({ date, refreshPenaltyData, setDialogOpen }) {
  const [selectedShotDirection, setSelectedShotDirection] = useState("");
  const [selectedGkDirection, setSelectedGkDirection] = useState("");
  const [goalScored, setGoalScored] = useState("");

  const userData = useSelector((state) => state.auth.userData);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedShotDirection) {
      toast("Please select a direction");
      return;
    }
    if (!selectedGkDirection) {
      toast("Please select a direction");
      return;
    }

    if (!goalScored) {
      toast("Please select if goal was scored");
      return;
    }

    // Format date as YYYY-MM-DD using local timezone (avoids UTC conversion issues)
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is 0-indexed
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;

    try {
      const result = await databaseService.savePenaltyData(
        userData.$id,
        formattedDate,
        goalScored === "Yes",
        selectedShotDirection.toLowerCase(),
        selectedGkDirection.toLowerCase()
      );

      if (result.noChanges) {
        toast("No changes detected. Data not updated.");
      } else {
        toast("Data saved successfully!");

        // Reset form after successful submission
        setSelectedShotDirection("");
        setSelectedGkDirection("");
        setGoalScored("");
        setDialogOpen(false);
        refreshPenaltyData();
      }
    } catch (error) {
      console.log("Error saving data:", error);
      toast("An error occurred while saving the data. Please try again.");
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
          label="Select Shot Direction"
          name="shotDirection"
          value={selectedShotDirection}
          onChange={(e) => setSelectedShotDirection(e.target.value)}
          options={["Left", "Center", "Right"]}
          className={`${classes["input-bottom-space"]}`}
        />

        <RadioInput
          label="Select Goalkeeper Direction"
          name="gkDirection"
          value={selectedGkDirection}
          onChange={(e) => setSelectedGkDirection(e.target.value)}
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
