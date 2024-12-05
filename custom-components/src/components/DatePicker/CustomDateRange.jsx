import React from "react";

function CustomDateRange({ customRange, onCustomRangeChange }) {
  const handleFromChange = (e) => {
    const fromDate = e.target.value;
    onCustomRangeChange(fromDate, customRange.to);
  };

  const handleToChange = (e) => {
    const toDate = e.target.value;
    onCustomRangeChange(customRange.from, toDate);
  };

  return (
    <div className="custom-date-range">
      <label>
        From:
        <input
          type="date"
          value={customRange.from}
          onChange={handleFromChange}
        />
      </label>
      <label>
        To:
        <input type="date" value={customRange.to} onChange={handleToChange} />
      </label>
    </div>
  );
}

export default CustomDateRange;
