import React from "react";
import { BasicSpinnerProps } from "./basic.spinner.interfaces";

const sizeClassMap: Record<number, string> = {
  4: "h-4 w-4",
  6: "h-6 w-6",
  8: "h-8 w-8",
  10: "h-10 w-10",
  12: "h-12 w-12",
  16: "h-16 w-16",
  20: "h-20 w-20",
  24: "h-24 w-24",
};

const BasicSpinner: React.FC<BasicSpinnerProps> = ({ size = 16 }) => {
  const sizeClass = sizeClassMap[size] || "h-6 w-6";
  return (
    <svg
      className={`mr-3 ${sizeClass} animate-spin text-indigo-500`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24
"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export default BasicSpinner;
