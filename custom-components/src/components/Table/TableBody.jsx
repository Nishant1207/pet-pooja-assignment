import React from "react";

const TableBody = ({ data, columns, styleConfig }) => {
  return (
    <div className="table-body" style={{ backgroundColor: styleConfig.bodyBgColor }}>
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="body-row"
          style={{ fontSize: styleConfig.bodyFontSize, color: styleConfig.bodyFontColor }}
        >
          {columns.map((col) => (
            <div key={col.key} className="body-cell">
              {row[col.key]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableBody;
