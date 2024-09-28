// src/Components/Logo.jsx

import React from "react";
import logo from "../Assets/Logo.jpg"; // Adjust the path as necessary

const Logo = () => {
  return (
    <div style={{ textAlign: "center", margin: "10px 0 10px" }}>
      <img src={logo} alt="Logo" style={{ height: "150px" }} /> {/* Adjust size as needed */}
    </div>
  );
};

export default Logo;
