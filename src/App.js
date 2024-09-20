import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Pages/Login/Login";
import ResetPass from "./Components/Pages/Login/resetpass";
import Forgotmemberid from "./Components/Pages/Login/forgetmemberid";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ResetPassword" element={<ResetPass />} />
        <Route path="/Memberid" element={<Forgotmemberid/>}/>
      </Routes>
    </Router>
  );
};

export default App;
