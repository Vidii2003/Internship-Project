import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Pages/Login/Login";
import ResetPass from "./Components/Pages/Login/resetpass";
import Forgotmemberid from "./Components/Pages/Login/forgetmemberid";
import SetupWizard from "./Components/Pages/Register/setupwizard";
import Layout from "./Components/Pages/Layout"; // Import the Layout component

const App = () => {
  return (
    <Router>
      <Layout> {/* Wrap your Routes in the Layout component */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ResetPassword" element={<ResetPass />} />
          <Route path="/Memberid" element={<Forgotmemberid />} />
          <Route path="/Register" element={<SetupWizard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
