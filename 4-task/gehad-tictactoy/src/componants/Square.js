import React from "react";
function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`w-24 h-24 bg-white bg-opacity-10 border-2 border-gray-500 text-4xl text-white font-bold flex items-center justify-center transition-colors duration-300 ${
        highlight
          ? "bg-pink-700 bg-opacity-30 border-pink-600"
          : "hover:bg-white hover:bg-opacity-20"
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
