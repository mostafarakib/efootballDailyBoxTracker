import React, { useState } from "react";
import { RadioInput, Button } from "../components";

import classes from "./DailyBoxDataForm.module.css";
function DailyBoxDataForm() {
  const [selectedDirection, setSelectedDirection] = useState("");
  const [goalScored, setGoalScored] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedDirection) {
      alert("Please select a direction");
      return;
    }

    if (!goalScored) {
      alert("Please select if goal was scored");
      return;
    }

    console.log("Form submitted", {
      selectedDirection,
      goalScored,
    });
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
