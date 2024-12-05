import React from "react";

const Button = ({ type, label, onClick, styles }) => {
  return (
    <button type={type} onClick={onClick} style={styles}>
      {label}
    </button>
  );
};

export default Button;
