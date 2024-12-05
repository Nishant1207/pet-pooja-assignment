import React, { useState, useMemo } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import "./Table.css";

const TableContainer = ({ data, columns }) => {
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [styleConfig, setStyleConfig] = useState({
    headerFontSize: "16px",
    bodyFontSize: "14px",
    headerBgColor: "#f5f5f5",
    bodyBgColor: "#ffffff",
    headerFontColor: "#333333",
    bodyFontColor: "#000000",
  });

  // Filter and sort logic
  const filteredData = useMemo(() => {
    let filtered = [...data];
    Object.entries(filters).forEach(([key, value]) => {
      filtered = filtered.filter((row) =>
        row[key].toString().toLowerCase().includes(value.toLowerCase())
      );
    });
    return filtered;
  }, [data, filters]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sortConfig]);

  return (
    <div className="table-container">
      <TableHeader
        columns={columns}
        filters={filters}
        setFilters={setFilters}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        styleConfig={styleConfig}
      />
      <TableBody
        data={sortedData}
        columns={columns}
        styleConfig={styleConfig}
      />
    </div>
  );
};

export default TableContainer;
