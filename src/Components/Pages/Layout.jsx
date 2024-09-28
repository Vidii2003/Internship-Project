// src/Components/Layout.jsx

import React from "react";
import Logo from "./Logo";

const Layout = ({ children }) => {
  return (
    <div>
      <Logo />
      {children}
    </div>
  );
};

export default Layout;
