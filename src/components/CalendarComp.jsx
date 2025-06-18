import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarStyles.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DailyBoxDataForm,
  DialogDescription,
} from "./index";
import { Check, X, SquareArrowOutUpRight, Hand } from "lucide-react";
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

  const getShotDirectionIcon = (isSelected) => (
    <svg
      width="15px"
      height="15px"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      fill={isSelected ? "#ffffff" : "#000000"}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill={isSelected ? "#ffffff" : "#000000"}
          d="M290.2 49.04c-15.7.1-32.3 13.83-38 35.81-6.5 25.15 4.7 47.85 22.1 52.35 17.4 4.5 38.2-9.9 44.7-35 6.5-25.16-4.6-47.82-22.1-52.33-2.2-.56-4.4-.84-6.7-.83zM89.04 68.3L77.5 87.31c32.4 15.99 63.1 33.49 96.4 46.49 9.5-3.8 18.8-7.8 28-12-40.2-15.4-76.7-33.69-112.86-53.5zm148.06 56.1c-47.8 25.4-97.9 41.6-153.64 61.1l8.08 16.4c51.96-16.1 111.26-32.9 161.16-56-6.9-5.5-12.1-12.9-15.6-21.5zm30.3 34.8c-22.5 10.8-46.8 20.2-71.4 28.7-20.3 45.6-27.7 94.9-36.8 140.1l-2.1 10.5-101.02-39.4-16.03 25.4 130.25 60.7c1-1.4 1.7-2.5 2.9-4.5 3.9-6.7 9.2-16.6 15.2-28.6 11.9-23.8 26.7-55.9 40.4-88.1 13.8-32.1 26.4-64.4 33.9-88.4 1.9-6.1 3.5-11.6 4.7-16.4zm-31.9 134.6c-5.5 12.5-11.1 24.8-16.5 36.3 25 37.4 57 79 94.9 109.2l23.3-17.6c-35.8-39.7-72.9-84.3-101.7-127.9zM423.9 367a48 48 0 0 0-48 48 48 48 0 0 0 48 48 48 48 0 0 0 48-48 48 48 0 0 0-48-48z"
        ></path>
      </g>
    </svg>
  );

  const tileContent = ({ view, date }) => {
    if (view === "month") {
      const dataKey = date.toDateString();
      const penaltyData = penaltyDataMap[dataKey];
      const isSelected = selectedDate.toDateString() === date.toDateString();

      const shotDirection =
        penaltyData?.shotDirection === "left"
          ? "L"
          : penaltyData?.shotDirection === "right"
          ? "R"
          : penaltyData?.shotDirection === "center"
          ? "C"
          : "";

      const gkDirection =
        penaltyData?.gkDirection === "left"
          ? "L"
          : penaltyData?.gkDirection === "right"
          ? "R"
          : penaltyData?.gkDirection === "center"
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
                isSelected ? "text-white" : "text-blue-500 hover:text-blue-700"
              }`}
            />
          </div>

          {penaltyData && (
            <>
              {/* Position indicator - bottom left (non-clickable) */}
              <div className="absolute bottom-0 left-0.5">
                <div className="flex flex-wrap items-center">
                  {getShotDirectionIcon(isSelected)}
                  <p className="text-xs font-bold !ms-0.5"> {shotDirection}</p>
                </div>
              </div>

              {gkDirection && (
                <div className="absolute top-0.5 left-0.5">
                  <div className="flex flex-wrap items-center">
                    <Hand
                      className={`h-3 w-3 ${
                        selectedDate.toDateString() === date.toDateString()
                          ? "text-white"
                          : "text-black"
                      }`}
                    />
                    <p className="text-xs font-bold !ms-0.5"> {gkDirection}</p>
                  </div>
                </div>
              )}

              {/* Success indicator - bottom right (non-clickable) */}
              <div className="absolute bottom-0.5 right-0.5">
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
            <Hand className="h-4 w-4 text-black" />
            <span>Goalkeeper Jump Direction</span>
          </div>
          <div className="flex items-center gap-1">
            {getShotDirectionIcon(false)}
            <span>Shot Direction</span>
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
                <span className="font-medium">Shot Direction:</span>{" "}
                {penaltyDataMap[selectedDate.toDateString()].shotDirection
                  ?.charAt(0)
                  .toUpperCase() +
                  penaltyDataMap[
                    selectedDate.toDateString()
                  ].shotDirection?.slice(1)}
              </p>
              <p>
                <span className="font-medium">Goalkeeper Jump Direction:</span>{" "}
                {penaltyDataMap[selectedDate.toDateString()].gkDirection
                  ?.charAt(0)
                  .toUpperCase() +
                  penaltyDataMap[
                    selectedDate.toDateString()
                  ].gkDirection?.slice(1) || "N/A"}
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
