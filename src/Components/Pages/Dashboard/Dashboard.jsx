import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; 
import Logo from '../../Assets/Logo.jpg';
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMenorah,
  faIdCard,
  faAddressBook,
  faUserGraduate,
  faBriefcase,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const location = useLocation();
  const { username } = location.state || {};  

  const [memberData, setMemberData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Username (mobile number):", username); 
    const fetchMemberData = async () => {
      try {
        const response = await axios.post('http://3.106.52.122/core/member_detail/', {
          mobile_number: username  
        });
        setMemberData(response.data); 
      } catch (error) {
        if (error.response && error.response.data) {
          setError(error.response.data.error); 
        } else {
          setError("An error occurred. Please try again.");
        }
      }
    };

    if (username) {
      fetchMemberData();  
    }
  }, [username]);

  const [activeSection, setActiveSection] = useState("dashboard");
  const [isEditing, setIsEditing] = useState(true);

  const handleEdit = () => {
    setIsEditing(true); 
  };

  const handleUpdate = () => {
    alert("Details updated successfully!");
    setIsEditing(false);
  };

  const handleChange = (section, key, value) => {
    setMemberData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  const renderTable = (data, section) => {
    if (!data) return null;
  
    return Object.keys(data).map((key) => (
      <tr key={key}>
        <th>
          {key
            .replace(/_/g, ' ') // Replace underscores with spaces
            .replace(/\b\w/g, (char) => char.toUpperCase())} {/* Capitalize each word */}
        </th>
        <td>
          {isEditing && key !== "id" ? (
            <input
              type="text"
              value={data[key]}
              onChange={(e) => handleChange(section, key, e.target.value)}
            />
          ) : (
            data[key]
          )}
        </td>
      </tr>
    ));
  };
  

  return (
    <div className="container">
      <nav className="Navi">
        <ul className="ul">
          <li>
            <a href="#" id="a" className="logo">
              <span className="nav-item1">{memberData ? memberData.first_name : "Loading..."}</span>
            </a>
          </li>
          <li>
            <a href="#" id="a" onClick={() => setActiveSection("dashboard")}>
              <FontAwesomeIcon icon={faMenorah} />
              <span className="nav-item">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" id="a" onClick={() => setActiveSection("personal-info")}>
              <FontAwesomeIcon icon={faIdCard} />
              <span className="nav-item">Personal Information</span>
            </a>
          </li>
          <li>
            <a href="#" id="a" onClick={() => setActiveSection("contact-details")}>
              <FontAwesomeIcon icon={faAddressBook} />
              <span className="nav-item">Contact Details</span>
            </a>
          </li>
          <li>
            <a href="#" id="a" onClick={() => setActiveSection("qualification-details")}>
              <FontAwesomeIcon icon={faUserGraduate} />
              <span className="nav-item">Qualification Details</span>
            </a>
          </li>
          <li>
            <a href="#" id="a" onClick={() => setActiveSection("professional-details")}>
              <FontAwesomeIcon icon={faBriefcase} />
              <span className="nav-item">Professional Details</span>
            </a>
          </li>
          <li>
            <a href="/" id="a" className="logout">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span className="nav-item">Log out</span>
            </a>
          </li>
        </ul>
      </nav>

      <section className="main">
        <div className="main-top">
          <a href="#" id="a">
            <img src={Logo} alt="Logo" className="custom-logo" />
          </a>
          <h1 style={{ paddingLeft: "180px" }}>{memberData ? memberData.first_name : "Loading..."}</h1>
        </div>

        <div className="section-content">
          {activeSection === "dashboard" && memberData && (
            <div id="dashboard">
              <h2 className="text-center">DASHBOARD</h2>
              <div className="container mt-5" style={{ maxWidth: "600px" }}>
                <table className="table-bordered border-primary">
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{memberData.first_name} {memberData.last_name}</td>
                    </tr>
                    <tr>
                      <th>Job Title</th>
                      <td>{memberData.job_designation || "Not Available"}</td>
                    </tr>
                    <tr>
                      <th>Mobile Number</th>
                      <td>{memberData.mobile_1}</td>
                    </tr>
                    <tr>
                      <th>Address</th>
                      <td>{memberData.current_address_1}, {memberData.current_city}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="button-container mt-3">
                  {!isEditing ? (
                    <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                  ) : (
                    <button className="btn btn-success" onClick={handleUpdate}>Update</button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === "personal-info" && memberData && (
            <div id="personal-info">
              <h2 className="text-center">Personal Information</h2>
              <div className="container mt-5">
                <table className="table-bordered border-primary">
                  <tbody>
                    {renderTable({
                      title:memberData.title,
                      first_name: memberData.first_name,
                      middle_name:memberData.middle_name,
                      last_name: memberData.last_name,
                      mother_name: memberData.mother_name,
                      father_name: memberData.father_name,
                      spouse_name: memberData.spouse_name,
                      mobile_2:memberData.mobile_2,
                      date_of_birth: memberData.date_of_birth,
                      gender: memberData.gender,
                      blood_group: memberData.blood_group,

                    }, "personal-info")}
                  </tbody>
                </table>
                <div className="button-container mt-3">
                  {!isEditing ? (
                    <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                  ) : (
                    <button className="btn btn-success" onClick={handleUpdate}>Update</button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === "contact-details" && memberData && (
            <div id="contact-details">
              <h2 className="text-center">Contact Details</h2>
              <div className="container mt-5">
                <table className="table-bordered border-primary">
                  <tbody>
                    {renderTable({
                      email_id: memberData.email_id,
                      current_address_1: memberData.current_address_1,
                      current_address_2: memberData.current_address_2,
                      current_city: memberData.current_city,
                      current_state: memberData.current_state,
                      current_country: memberData.current_country,
                      current_pin_code:memberData.current_pin_code,
                      permanent_address_1: memberData.current_address_1,
                      permanent_address_2: memberData.current_address_2,
                      permanent_city: memberData.current_city,
                      permanent_state: memberData.current_state,
                      permanent_country: memberData.current_country,
                      permanent_pin_code:memberData.current_pin_code,
                      
                    }, "contact-details")}
                  </tbody>
                </table>
                <div className="button-container mt-3">
                  {!isEditing ? (
                    <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                  ) : (
                    <button className="btn btn-success" onClick={handleUpdate}>Update</button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === "qualification-details" && memberData && (
            <div id="qualification-details">
              <h2 className="text-center">Qualification Details</h2>
              <div className="container mt-5">
                <table className="table-bordered border-primary">
                  <tbody>
                    {renderTable({
                      highest_qualification: memberData.highest_qualification,
                      institute_name: memberData.institute_name,
                      stream: memberData.stream,
                      passed_out_year: memberData.passed_out_year,
                      skills: memberData.skills
                    }, "qualification-details")}
                  </tbody>
                </table>
                <div className="button-container mt-3">
                  {!isEditing ? (
                    <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                  ) : (
                    <button className="btn btn-success" onClick={handleUpdate}>Update</button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === "professional-details" && memberData && (
            <div id="professional-details">
              <h2 className="text-center">Professional Details</h2>
              <div className="container mt-5">
                <table className="table-bordered border-primary">
                  <tbody>
                    {renderTable({
                      job_category: memberData.job_category,
                      company_name: memberData.company_name,
                      job_designation: memberData.job_designation,
                      company_location: memberData.company_location,
                      role: memberData.role
                    }, "professional-details")}
                  </tbody>
                </table>
                <div className="button-container mt-3">
                  {!isEditing ? (
                    <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                  ) : (
                    <button className="btn btn-success" onClick={handleUpdate}>Update</button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;