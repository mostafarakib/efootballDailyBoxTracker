import React from "react";
import classes from "./Button.module.css";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  hoverColor = "hover:bg-blue-700",
  textColor = "text-white",

  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        w-full border border-transparent rounded-md text-sm font-medium  focus:outline-none cursor-pointer ${bgColor} ${hoverColor} ${textColor} ${className} ${classes.button}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
