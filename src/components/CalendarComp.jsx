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

  const getShotDirectionIcon = (penaltyData, isSelected) => {
    let fillColor = "black";
    if (isSelected) {
      fillColor = "white";
    }
    if (penaltyData?.shotDirection) {
      fillColor = "white";
    }

    return (
      <svg
        width="15px"
        height="15px"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            fill={fillColor}
            d="M290.2 49.04c-15.7.1-32.3 13.83-38 35.81-6.5 25.15 4.7 47.85 22.1 52.35 17.4 4.5 38.2-9.9 44.7-35 6.5-25.16-4.6-47.82-22.1-52.33-2.2-.56-4.4-.84-6.7-.83zM89.04 68.3L77.5 87.31c32.4 15.99 63.1 33.49 96.4 46.49 9.5-3.8 18.8-7.8 28-12-40.2-15.4-76.7-33.69-112.86-53.5zm148.06 56.1c-47.8 25.4-97.9 41.6-153.64 61.1l8.08 16.4c51.96-16.1 111.26-32.9 161.16-56-6.9-5.5-12.1-12.9-15.6-21.5zm30.3 34.8c-22.5 10.8-46.8 20.2-71.4 28.7-20.3 45.6-27.7 94.9-36.8 140.1l-2.1 10.5-101.02-39.4-16.03 25.4 130.25 60.7c1-1.4 1.7-2.5 2.9-4.5 3.9-6.7 9.2-16.6 15.2-28.6 11.9-23.8 26.7-55.9 40.4-88.1 13.8-32.1 26.4-64.4 33.9-88.4 1.9-6.1 3.5-11.6 4.7-16.4zm-31.9 134.6c-5.5 12.5-11.1 24.8-16.5 36.3 25 37.4 57 79 94.9 109.2l23.3-17.6c-35.8-39.7-72.9-84.3-101.7-127.9zM423.9 367a48 48 0 0 0-48 48 48 48 0 0 0 48 48 48 48 0 0 0 48-48 48 48 0 0 0-48-48z"
          ></path>
        </g>
      </svg>
    );
  };

  const getGkDirectionIcon = (penaltyData, isSelected) => {
    let fillColor = "black";
    if (isSelected) {
      fillColor = "white";
    }
    if (penaltyData?.gkDirection) {
      fillColor = "white";
    }

    if (penaltyData?.shotDirection === "left") {
      return (
        <svg
          fill={fillColor}
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="16px"
          height="16px"
          viewBox="0 0 488.975 488.976"
          xmlSpace="preserve"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <g>
                {" "}
                <path d="M165.675,180.711c14.543,0,26.329,11.788,26.329,26.331c0,14.539-11.786,26.327-26.329,26.327 c-14.545,0-26.331-11.788-26.331-26.327C139.344,192.499,151.13,180.711,165.675,180.711z"></path>{" "}
                <circle cx="26.331" cy="189.926" r="26.331"></circle>{" "}
                <path d="M321.513,251.146l-72.195-51.295l104.567-51.886c6.725-3.334,9.47-11.491,6.144-18.211 c-3.342-6.721-11.485-9.476-18.218-6.137l-112.107,55.627c-3.362,1.665-5.723,4.534-6.839,7.828l-43.557,53.371l-61.492,7.875 l-67.172-27.513c-6.949-2.854-14.892,0.487-17.729,7.423c-2.847,6.943,0.479,14.876,7.43,17.729l70.489,28.869 c1.641,0.669,3.388,1.014,5.147,1.014c0.583,0,1.154-0.04,1.729-0.108l66.547-8.516l117.973,63.791 c1.223,1.006,2.541,1.919,4.056,2.576l3.559,1.543l1.896,1.025l0.02-0.2l52.998,22.923c1.788,0.773,3.688,1.227,5.619,1.351 l98.774,6.516c0.385,0.024,0.754,0.04,1.135,0.04c8.864,0,16.33-6.885,16.927-15.865c0.613-9.365-6.468-17.456-15.829-18.069 l-95.821-6.332l-55.783-24.133c-1.135-0.484-2.301-0.829-3.455-1.058l2.137-16.307l151.168,21.228 c0.797,0.116,1.595,0.169,2.376,0.169c8.34,0,15.609-6.14,16.804-14.627c1.302-9.286-5.166-17.886-14.467-19.18L321.513,251.146z"></path>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      );
    }
    if (penaltyData?.shotDirection === "center") {
      return (
        <svg
          width="15px"
          height="15px"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill={fillColor}
        >
          {/* <!-- Head --> */}
          <circle cx="50" cy="15" r="10" />

          {/* <!-- Wider Body --> */}
          <rect x="42" y="25" width="16" height="30" />

          {/* <!-- Arms --> */}
          <path d="M42,30 L15,40 Q13,42 15,45 L20,45 Q21,43 23,42 L42,35 Z" />
          <path d="M58,30 L85,40 Q87,42 85,45 L80,45 Q79,43 77,42 L58,35 Z" />

          {/* <!-- Legs --> */}
          <path d="M42,55 L28,80 Q26,82 28,85 L33,85 Q34,83 36,82 L42,70 Z" />
          <path d="M58,55 L72,80 Q74,82 72,85 L67,85 Q66,83 64,82 L58,70 Z" />
        </svg>
      );
    }
    if (penaltyData?.shotDirection === "right") {
      return (
        <svg
          fill={fillColor}
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="16px"
          height="16px"
          viewBox="0 0 488.975 488.976"
          xmlSpace="preserve"
          transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <g>
                {" "}
                <path d="M165.675,180.711c14.543,0,26.329,11.788,26.329,26.331c0,14.539-11.786,26.327-26.329,26.327 c-14.545,0-26.331-11.788-26.331-26.327C139.344,192.499,151.13,180.711,165.675,180.711z"></path>{" "}
                <circle cx="26.331" cy="189.926" r="26.331"></circle>{" "}
                <path d="M321.513,251.146l-72.195-51.295l104.567-51.886c6.725-3.334,9.47-11.491,6.144-18.211 c-3.342-6.721-11.485-9.476-18.218-6.137l-112.107,55.627c-3.362,1.665-5.723,4.534-6.839,7.828l-43.557,53.371l-61.492,7.875 l-67.172-27.513c-6.949-2.854-14.892,0.487-17.729,7.423c-2.847,6.943,0.479,14.876,7.43,17.729l70.489,28.869 c1.641,0.669,3.388,1.014,5.147,1.014c0.583,0,1.154-0.04,1.729-0.108l66.547-8.516l117.973,63.791 c1.223,1.006,2.541,1.919,4.056,2.576l3.559,1.543l1.896,1.025l0.02-0.2l52.998,22.923c1.788,0.773,3.688,1.227,5.619,1.351 l98.774,6.516c0.385,0.024,0.754,0.04,1.135,0.04c8.864,0,16.33-6.885,16.927-15.865c0.613-9.365-6.468-17.456-15.829-18.069 l-95.821-6.332l-55.783-24.133c-1.135-0.484-2.301-0.829-3.455-1.058l2.137-16.307l151.168,21.228 c0.797,0.116,1.595,0.169,2.376,0.169c8.34,0,15.609-6.14,16.804-14.627c1.302-9.286-5.166-17.886-14.467-19.18L321.513,251.146z"></path>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      );
    }

    return null;
  };

  const getTileClassName = ({ view, date }) => {
    if (view === "month") {
      const penaltyDataKey = date.toDateString();
      const penaltyData = penaltyDataMap[penaltyDataKey];
      const isSelected = selectedDate.toDateString() === date.toDateString();

      if (isSelected) {
        return "!bg-gradient-to-br !from-blue-400 !to-blue-600 text-white";
      }
      if (penaltyData?.scored === true) {
        return "!bg-gradient-to-br !from-green-400 !to-green-600 text-white";
      } else if (penaltyData?.scored === false) {
        return "!bg-gradient-to-br !from-red-400 !to-red-600 !text-white";
      }
    }
    return "";
  };

  const tileContent = ({ view, date }) => {
    if (view === "month") {
      const penaltyDataKey = date.toDateString();
      const penaltyData = penaltyDataMap[penaltyDataKey];
      const isSelected = selectedDate.toDateString() === date.toDateString();

      const openDialogIconClassName = () => {
        if (isSelected) {
          return "text-white";
        }
        if (penaltyData?.scored === true || penaltyData?.scored === false) {
          return "text-white";
        }
        return "text-blue-500";
      };

      return (
        <div className="pointer-events-none">
          {/* open dialog button - top right */}
          <div
            className="pointer-events-auto cursor-pointer absolute top-1 right-1"
            onClick={(e) => handleOpenDialog(e, date)}
          >
            <SquareArrowOutUpRight
              className={`h-3 w-3 ${openDialogIconClassName()}`}
            />
          </div>

          {penaltyData && (
            <>
              {/* Position indicator - bottom left (non-clickable) */}
              {penaltyData?.shotDirection && (
                <div className="absolute top-0.5 left-0.5 ">
                  <div>{getShotDirectionIcon(penaltyData, isSelected)}</div>
                </div>
              )}

              {penaltyData?.gkDirection && (
                <div className="absolute bottom-0 left-0.5">
                  <div>
                    {/* <Hand
                      className={`h-3 w-3 ${
                        selectedDate.toDateString() === date.toDateString()
                          ? "text-white"
                          : "text-black"
                      }`}
                    /> */}
                    {getGkDirectionIcon(penaltyData, isSelected)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <h2 className="font-bold text-2xl text-center mb-5">
        Your Efootball Daily Game Box Records
      </h2>
      <Calendar
        onChange={(date) => {
          setCurrentDate(date);
          handleDateClick(date);
        }}
        value={currentDate}
        tileContent={tileContent}
        tileClassName={getTileClassName}
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

      <div className="mt-2 px-4 space-y-3">
        {/* Legend */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 text-sm text-gray-700">
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
            <span className="hidden md:inline">
              {getShotDirectionIcon(false)}
            </span>
            <span className="font-semibold md:hidden">
              Bottom Left Corner:{" "}
            </span>
            <span>Shot Direction</span>
          </div>
          <div className="flex items-center gap-1">
            <Hand className="h-4 w-4 text-black hidden md:inline" />
            <span className="font-semibold md:hidden">Top Left Corner: </span>
            <span>Goalkeeper Jump Direction</span>
          </div>
        </div>

        {/* Selected Date and Data */}
        <div className="p-4 rounded-md border border-gray-300 bg-gray-50 shadow-sm">
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
