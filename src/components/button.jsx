import React, { useState } from "react";
import "./button.css"; // Import the CSS file

const Button = ({ label = "Button", href = "/" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a href={href}>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsHovered(false)}
        onMouseUp={() => setIsHovered(true)}
      >
        <span
          className="transition"
          style={{
            width: isHovered ? "14em" : "0",
            height: isHovered ? "14em" : "0",
          }}
        ></span>
        <span className="gradient"></span>
        <span className="label">{label}</span>
      </button>
    </a>
  );
};

export default Button;
