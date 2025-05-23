import React, { forwardRef, useId, useState } from "react";
import classes from "./Input.module.css";
import { Eye, EyeOff } from "lucide-react";

function Input(
  { label, icon: Icon, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="w-full">
      {label && (
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className={`relative ${classes["input-container"]} `}>
        {/* Input icon */}
        {Icon && (
          <div
            className={`${classes["icon-container"]} absolute top-2.5 left-2.5 flex items-center`}
          >
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className} ${classes["input"]}`}
          type={inputType}
          ref={ref}
          id={id}
          {...props}
        />
        {/* Show and hide password icon */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-0.5 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default forwardRef(Input);
