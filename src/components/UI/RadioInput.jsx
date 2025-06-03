import React, { useId } from "react";
import classes from "./RadioInput.module.css";

function RadioInput({
  label,
  options = [],
  name,
  value,
  className = "",
  orientation = "vertical", // "vertical" or "horizontal"
  onChange,
  ...props
}) {
  const id = useId();
  const groupName = name || id;

  return (
    <>
      <div className="w-full p-6">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div
          className={`${
            orientation === "horizontal" ? "flex gap-4" : "space-y-2"
          } ${className}`}
        >
          {options?.map((option, index) => {
            const optionId = `${id}-${index}`;
            return (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={optionId}
                  name={groupName}
                  value={option}
                  checked={value === option}
                  onChange={onChange}
                  className={`h-4 w-4 not-even:text-blue-600 border-gray-300 ${classes["input-checkbox"]}`}
                  {...props}
                />
                <label
                  htmlFor={optionId}
                  className={`ml-2 text-sm text-gray-700 cursor-pointer ${classes["options-label"]}`}
                >
                  {option}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default RadioInput;
