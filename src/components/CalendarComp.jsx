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
import { Check, X, SquareArrowOutUpRight } from "lucide-react"; // For success/failure icons

function CalendarComp() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dialogDate, setDialogDate] = useState(null);

  const handleDateClick = (date) => {
    console.log("Selected date:", date);
    setSelectedDate(date);
  };

  const handleOpenDialog = (e, date) => {
    e.stopPropagation(); // to prevent the calendar from changing the selected date
    setDialogOpen(true);

    setDialogDate(date);

    console.log("Opening dialog for date:", date);
  };

  const tileContent = ({ view, date }) => {
    if (view === "month") {
      return (
        <div className="pointer-events-none">
          {/* File icon - top right (clickable) */}
          <div
            className="pointer-events-auto cursor-pointer absolute top-1 right-1"
            onClick={(e) => handleOpenDialog(e, date)}
          >
            <SquareArrowOutUpRight className="h-3 w-3 text-blue-500 hover:text-blue-700" />
          </div>

          {/* Position indicator - bottom left (non-clickable) */}

          <div className="absolute bottom-0.5 left-1">
            <span className="text-xs font-bold">L</span>
          </div>

          {/* Success indicator - bottom right (non-clickable) */}
          <div className="absolute bottom-0.5 right-1">
            <Check className="h-3 w-3 text-green-500" />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateClick}
        value={currentDate}
        tileContent={tileContent}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger className="hidden" /> {/* Hidden trigger */}
        <DialogContent className="dialog-content">
          <DialogHeader>
            <DialogTitle>Penalty for {dialogDate?.toDateString()}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <DailyBoxDataForm />
          </div>
        </DialogContent>
      </Dialog>

      <div className="selected-date">
        Selected Date: {selectedDate.toDateString()}
      </div>
    </div>
  );
}

export default CalendarComp;
