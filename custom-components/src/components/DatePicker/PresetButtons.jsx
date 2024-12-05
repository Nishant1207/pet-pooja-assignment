import React from "react";

function PresetButtons({ onPresetClick }) {
  return (
    <div className="preset-buttons">
      <button onClick={() => onPresetClick("today")}>Today</button>
      <button onClick={() => onPresetClick("yesterday")}>Yesterday</button>
      <button onClick={() => onPresetClick("thisMonth")}>This Month</button>
      <button onClick={() => onPresetClick("lastMonth")}>Last Month</button>
      <button onClick={() => onPresetClick("custom")}>Custom Range</button>
    </div>
  );
}

export default PresetButtons;
