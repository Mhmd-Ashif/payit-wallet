"use client";
// import "../global.css";

import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-white  hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 hover:text-gray-500"
    >
      {children}
    </button>
  );
};