import React from "react";
import classes from "./Button.module.css";

function Button({
  children,
  type = "button",
  bgColor = "bg-gradient-to-r from-green-500 to-blue-600",
  hoverColor = "hover:from-green-600 hover:to-blue-700",
  textColor = "text-white",

  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-8 py-4 rounded-lg text-lg font-semibold focus:outline-none cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-xl ${bgColor} ${hoverColor} ${textColor} ${className} ${classes.button}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
