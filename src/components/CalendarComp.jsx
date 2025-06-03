import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarStyles.css";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DailyBoxDataForm,
} from "./index"; // Update import path
import { Check, X } from "lucide-react"; // For success/failure icons

function CalendarComp() {
  const [date, setDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Mock data - replace with your actual data
  const [penaltyData, setPenaltyData] = useState({
    "2025-05-28": { position: "R", success: true },
    "2025-05-27": { position: "L", success: false },
    "2025-05-26": { position: "M", success: true },
  });

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setDialogOpen(true);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateStr = date.toISOString().split("T")[0];
      const data = penaltyData[dateStr];

      if (penaltyData) {
        return (
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
            <span className="text-xs font-bold">{penaltyData.position}</span>
            {penaltyData.success ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <X className="h-3 w-3 text-red-500" />
            )}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateClick}
        value={date}
        tileContent={tileContent}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger className="hidden" /> {/* Hidden trigger */}
        <DialogContent className="dialog-content">
          <DialogHeader>
            <DialogTitle>
              Penalty for {selectedDate?.toDateString()}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <DailyBoxDataForm />
          </div>
        </DialogContent>
      </Dialog>

      <div className="selected-date">Selected Date: {date.toDateString()}</div>
    </div>
  );
}

export default CalendarComp;
