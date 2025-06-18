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
  DialogDescription,
  DialogClose,
} from "./index"; // Update import path
import { Check, X, SquareArrowOutUpRight } from "lucide-react"; // For success/failure icons
import { useSelector } from "react-redux";
import databaseService from "../appwrite/service";

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
            <SquareArrowOutUpRight
              className={`h-3 w-3 ${
                selectedDate.toDateString() === date.toDateString()
                  ? "text-white"
                  : "text-blue-500 hover:text-blue-700"
              }`}
            />
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
      <h2 className="font-bold text-2xl text-center !mb-4">
        Your Efootball Daily Game Box Records
      </h2>
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
            <DialogDescription className="sr-only">
              Dialog for entering penalty data
            </DialogDescription>
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

      <div className="!mt-2 !px-4 !space-y-3">
        {/* Legend */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <Check className="h-4 w-4 text-green-500" />
            <span>Scored</span>
          </div>
          <div className="flex items-center gap-1">
            <X className="h-4 w-4 text-red-500" />
            <span>Missed</span>
          </div>
          <div className="flex items-center gap-1">
            <SquareArrowOutUpRight className="h-4 w-4 text-blue-500" />
            <span>Open / Edit</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold">L</span> <span>Left</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold">R</span> <span>Right</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold">C</span> <span>Center</span>
          </div>
        </div>

        {/* Selected Date and Data */}
        <div className="!p-4 rounded-md border border-gray-300 bg-gray-50 shadow-sm">
          <p className="text-sm font-semibold text-gray-800">
            Selected Date: {selectedDate.toDateString()}
          </p>

          {penaltyDataMap[selectedDate.toDateString()] ? (
            <div className="mt-2 text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Direction:</span>{" "}
                {penaltyDataMap[selectedDate.toDateString()].direction}
              </p>
              <p>
                <span className="font-medium">Scored:</span>{" "}
                {penaltyDataMap[selectedDate.toDateString()].scored
                  ? "Yes ✅"
                  : "No ❌"}
              </p>
              <p>
                <span className="font-medium">Notes:</span>{" "}
                {penaltyDataMap[selectedDate.toDateString()].notes || "N/A"}
              </p>
            </div>
          ) : (
            <p className="mt-2 text-sm text-gray-500">
              No penalty data for this date.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarComp;
