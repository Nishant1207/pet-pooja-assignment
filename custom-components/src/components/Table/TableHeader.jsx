import React from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import FilterInput from "./FilterInput";

const TableHeader = ({ columns, filters, setFilters, sortConfig, setSortConfig, styleConfig }) => {
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: null, direction: null };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <div className="table-header" style={{ backgroundColor: styleConfig.headerBgColor }}>
      <div className="header-row" style={{ fontSize: styleConfig.headerFontSize, color: styleConfig.headerFontColor }}>
        {columns.map((col) => (
          <div key={col.key} className="header-cell" onClick={() => handleSort(col.key)}>
            {col.title}
            {sortConfig.key === col.key ? (
              sortConfig.direction === "asc" ? (
                <FaSortUp />
              ) : (
                <FaSortDown />
              )
            ) : (
              col.sortable && <FaSort />
            )}
          </div>
        ))}
      </div>
      <div className="filter-row">
        {columns.map((col) =>
          col.filterable ? (
            <FilterInput
              key={col.key}
              value={filters[col.key] || ""}
              onChange={(value) => setFilters((prev) => ({ ...prev, [col.key]: value }))}
            />
          ) : (
            <div key={col.key} className="filter-placeholder"></div>
          )
        )}
      </div>
    </div>
  );
};

export default TableHeader;
