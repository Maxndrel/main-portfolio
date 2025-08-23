import React from "react";
import clsx from "clsx";

const Button = ({ children, onClick, type = "button", variant = "primary", className }) => {
  const baseStyles =
    "inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium transition-colors duration-300 focus:outline-none";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-gray-400 text-gray-800 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseStyles, variants[variant], className)}
    >
      {children}
    </button>
  );
};

export default Button;
