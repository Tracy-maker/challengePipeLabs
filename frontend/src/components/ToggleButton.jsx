import React from "react";

const ToggleButton = ({ showDelayed, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`px-4 py-2 rounded text-white ${
        !showDelayed ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {!showDelayed ? "Show All Shipments" : "Show Delayed Shipments"}
    </button>
  );
};

export default ToggleButton;
