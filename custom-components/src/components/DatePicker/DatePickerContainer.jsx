import React, { useState } from "react";
import PresetButtons from "./PresetButtons";
import CustomDateRange from "./CustomDateRange";
import "./DatePicker.css";

function DatePickerContainer({ onDateChange }) {
  const [selectedRange, setSelectedRange] = useState(null);
  const [customRange, setCustomRange] = useState({ from: "", to: "" });

  const handlePresetClick = (preset) => {
    let range = null;

    switch (preset) {
      case "today":
        range = { from: new Date().toISOString().split("T")[0], to: new Date().toISOString().split("T")[0] };
        break;
      case "yesterday":
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        range = { from: yesterday.toISOString().split("T")[0], to: yesterday.toISOString().split("T")[0] };
        break;
      case "thisMonth":
        const now = new Date();
        range = {
          from: new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0],
          to: new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0],
        };
        break;
      case "lastMonth":
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        range = {
          from: new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1).toISOString().split("T")[0],
          to: new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0).toISOString().split("T")[0],
        };
        break;
      case "custom":
        range = null; // No action, user selects manually
        break;
      default:
        break;
    }

    setSelectedRange(range);
    if (range) {
      onDateChange(range); // Notify parent of the selected range
    }
  };

  const handleCustomRangeChange = (from, to) => {
    setCustomRange({ from, to });
    const range = { from, to };
    setSelectedRange(range);
    onDateChange(range); // Notify parent of the selected custom range
  };

  return (
    <div className="date-picker-container">
      <PresetButtons onPresetClick={handlePresetClick} />
      {selectedRange === null && (
        <CustomDateRange
          customRange={customRange}
          onCustomRangeChange={handleCustomRangeChange}
        />
      )}
      {selectedRange && (
        <div className="selected-range">
          <p>Selected Range:</p>
          <p>
            From: {selectedRange.from} - To: {selectedRange.to}
          </p>
        </div>
      )}
    </div>
  );
}

export default DatePickerContainer;
