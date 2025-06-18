import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import databaseService from "@/appwrite/service";

function CalendarComp() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dialogDate, setDialogDate] = useState(null);
  const [penaltyDataMap, setPenaltyDataMap] = useState({});

  const userData = useSelector((state) => state.auth.userData);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleOpenDialog = (e, date) => {
    e.stopPropagation(); // to prevent the calendar from changing the selected date
    setDialogOpen(true);

    setDialogDate(date);
  };

  const refreshPenaltyData = async () => {
    try {
      const allData = await databaseService.getAllPenaltyData(userData.$id);
      const mappedData = {};

      allData.forEach((data) => {
        const dataKey = new Date(data.date).toDateString();
        mappedData[dataKey] = data;
      });

      setPenaltyDataMap(mappedData);
    } catch (error) {
      console.error("Error fetching penalty data:", error);
    }
  };

  useEffect(() => {
    if (userData?.$id) {
      refreshPenaltyData();
    }
  }, [userData?.$id]);

  const tileContent = ({ view, date }) => {
    if (view === "month") {
      const dataKey = date.toDateString();
      const penaltyData = penaltyDataMap[dataKey];

      const direction =
        penaltyData?.direction === "left"
          ? "L"
          : penaltyData?.direction === "right"
          ? "R"
          : penaltyData?.direction === "center"
          ? "C"
          : "";
      return (
        <div className="pointer-events-none">
          {/* File icon - top right (clickable) */}
          <div
            className="pointer-events-auto cursor-pointer absolute top-1 right-1"
            onClick={(e) => handleOpenDialog(e, date)}
          >
            <SquareArrowOutUpRight className="h-3 w-3 text-blue-500 hover:text-blue-700" />
          </div>

          {penaltyData && (
            <>
              {/* Position indicator - bottom left (non-clickable) */}
              <div className="absolute bottom-0.5 left-1">
                <span className="text-xs font-bold">{direction}</span>
              </div>

              {/* Success indicator - bottom right (non-clickable) */}
              <div className="absolute bottom-0.5 right-1">
                {penaltyData.scored ? (
                  <Check className="h-3 w-3 text-green-500" />
                ) : (
                  <X className="h-3 w-3 text-red-500" />
                )}
              </div>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={(date) => {
          setCurrentDate(date);
          handleDateClick(date);
        }}
        value={currentDate}
        tileContent={tileContent}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="dialog-content">
          <DialogHeader>
            <DialogTitle>Penalty for {dialogDate?.toDateString()}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <DailyBoxDataForm
              date={dialogDate}
              refreshPenaltyData={refreshPenaltyData}
              setDialogOpen={setDialogOpen}
            />
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
