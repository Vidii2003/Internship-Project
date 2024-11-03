import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Pages/Login/Login";
import ResetPass from "./Components/Pages/Login/resetpass";
import Forgotmemberid from "./Components/Pages/Login/forgetmemberid";
import SetupWizard from "./Components/Pages/Register/setupwizard";
import Layout from "./Components/Pages/Layout"; // Import the Layout component
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import SuperReporting from "./Components/Pages/SuperReporting";
const App = () => {
  return (
    <Router>
      <Layout> {/* Wrap your Routes in the Layout component */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ResetPassword" element={<ResetPass />} />
          <Route path="/Memberid" element={<Forgotmemberid />} />
          <Route path="/Register" element={<SetupWizard />} />
          <Route path="/SuperReporting" element={<SuperReporting />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
