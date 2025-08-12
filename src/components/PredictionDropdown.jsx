import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./UI/popover";

function PredictionDropdown({ children }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">
          Today's Tips
        </p>
      </PopoverTrigger>
      <PopoverContent className="w-64">{children}</PopoverContent>
    </Popover>
  );
}

export default PredictionDropdown;
