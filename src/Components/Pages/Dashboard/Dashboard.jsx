import React, { useState } from "react";
import Logo from '../../Assets/Logo.jpg';
import "./Dashboard.css"; // Assuming the same CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMenorah,
  faIdCard,
  faAddressBook,
  faUserGraduate,
  faBriefcase,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isEditing, setIsEditing] = useState(false);

  // Dashboard state
  const [dashboardData, setDashboardData] = useState({
    id: "01",
    name: "John Doe",  // This will update with firstName and lastName
    JobTitle: "Software Developer",
    Mobilenumber:"9876543210",
    address: "123 Main St, Cityville, ST, 12345",
  });

  // Personal Information state
  const [personalInfo, setPersonalInfo] = useState({
    id: "01",
    firstName: "John",
    lastName: "Doe",
    motherName: "Alisa",
    fatherName: "Jacob",
    spouseName: "Lisa",
    dob: "22-02-1988",
    gender: "Male",
    bloodGroup: "O+",
  });

  // Contact Details state
  const [contactDetails, setContactDetails] = useState({
    id: "01",
    name: "John Doe",
    Mobilenumber:"9876543210",
    email: "Johndoe21@gmail.com",
    address: "123 Main St, Cityville, ST, 12345",
    city: "Nagercoil",
    district: "Kanyakumari",
    state: "Tamilnadu",
  });

  // Qualification Details state
  const [qualificationDetails, setQualificationDetails] = useState({
    id: "01",
    maxQualification: "UG or PG",
    major: "Computer",
    institution: "College or University",
  });

  // Professional Details state
  const [professionalDetails, setProfessionalDetails] = useState({
    id: "01",
    JobTitle: "Software Developer",
    companyName: "TCS",
    responsibilities: "Developed web applications, optimized databases",
    location: "USA",
    employmentType: "FULLTIME",
  });

  const showSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsEditing(false); // Reset editing state on section change
  };

  const handleEdit = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleUpdate = () => {
    // Update the dashboardData with first and last name
    const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;
    setDashboardData((prev) => ({
      ...prev,
      name: fullName,
    }));

    // Update other sections with the changes from dashboard
    setPersonalInfo((prev) => ({
      ...prev,
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
    }));

    setContactDetails((prev) => ({
      ...prev,
      name: fullName,  // Updating name in contact details
    }));

    alert("Details updated successfully!");

    // Exit editing mode
    setIsEditing(false);
  };

  const handleChange = (section, field, value) => {
    if (section === "dashboard") {
      setDashboardData((prev) => ({ ...prev, [field]: value }));
      // If first name or last name is changed, update personal info and contact details
      if (field === "name") {
        const [firstName, lastName] = value.split(" ");
        setPersonalInfo((prev) => ({ ...prev, firstName, lastName }));
        setContactDetails((prev) => ({ ...prev, name: value }));
      }
    } else if (section === "personal-info") {
      setPersonalInfo((prev) => ({ ...prev, [field]: value }));
      // Update dashboard name when first or last name is changed
      if (field === "firstName" || field === "lastName") {
        const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;
        setDashboardData((prev) => ({ ...prev, name: fullName }));
        setContactDetails((prev) => ({ ...prev, name: fullName }));
      }
    } else if (section === "contact-details") {
      setContactDetails((prev) => ({ ...prev, [field]: value }));
    } else if (section === "qualification-details") {
      setQualificationDetails((prev) => ({ ...prev, [field]: value }));
    } else if (section === "professional-details") {
      setProfessionalDetails((prev) => ({ ...prev, [field]: value }));
    }
  };

  const renderTable = (data, section) => {
    return Object.keys(data).map((key) => (
      <tr key={key}>
        <th>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
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
              <span className="nav-item1">JOHN DOE</span>
            </a>
          </li>
          <li>
            <a href="#" id="a"  onClick={() => showSection("dashboard")}>
              <FontAwesomeIcon icon={faMenorah} />
              <span className="nav-item">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" id="a" onClick={() => showSection("personal-info")}>
              <FontAwesomeIcon icon={faIdCard} />
              <span className="nav-item">Personal Information</span>
            </a>
          </li>
          <li>
            <a href="#" id="a" onClick={() => showSection("contact-details")}>
              <FontAwesomeIcon icon={faAddressBook} />
              <span className="nav-item">Contact Details</span>
            </a>
          </li>
          <li>
            <a href="#" id="a" onClick={() => showSection("qualification-details")}>
              <FontAwesomeIcon icon={faUserGraduate} />
              <span className="nav-item">Qualification Details</span>
            </a>
          </li>
          <li>
            <a href="#" id="a" onClick={() => showSection("professional-details")}>
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
          <a href="#" id="a" >
            <img src={Logo} alt="Logo" className="custom-logo" />
          </a>
          <h1 style={{ paddingLeft: "180px" }}>JOHN DOE</h1>
        </div>

        <div className="section-content">
          {activeSection === "dashboard" && (
            <div id="dashboard">
              <h2 className="text-center">DASHBOARD</h2>
              <div className="container mt-5" style={{ maxWidth: "600px" }}>
                <table className="table-bordered border-primary">
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>
                        {isEditing ? (
                          <input
                            type="text"
                            value={dashboardData.name}
                            onChange={(e) => handleChange("dashboard", "name", e.target.value)}
                          />
                        ) : (
                          dashboardData.name
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Job Title</th>
                      <td>
                        {isEditing ? (
                          <input
                            type="text"
                            value={dashboardData.JobTitle}
                            onChange={(e) => handleChange("dashboard", "JobTitle", e.target.value)}
                          />
                        ) : (
                          dashboardData.JobTitle
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Mobilenumber</th>
                      <td>
                        {isEditing ? (
                          <input
                            type="text"
                            value={dashboardData.Mobilenumber}
                            onChange={(e) => handleChange("dashboard", "Mobilenumber", e.target.value)}
                          />
                        ) : (
                          dashboardData.Mobilenumber
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Address</th>
                      <td>
                        {isEditing ? (
                          <input
                            type="text"
                            value={dashboardData.address}
                            onChange={(e) => handleChange("dashboard", "address", e.target.value)}
                          />
                        ) : (
                          dashboardData.address
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="button-container mt-3">
                  {!isEditing ? (
                    <button className="btn btn-primary" onClick={handleEdit}>
                      Edit
                    </button>
                  ) : (
                    <button className="btn btn-success" onClick={handleUpdate}>
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === "personal-info" && (
            <div id="personal-info">
              <h2 className="text-center">Personal Information</h2>
              <div className="container mt-5">
                <table className="table-bordered border-primary">
                  <tbody>{renderTable(personalInfo, "personal-info")}</tbody>
                </table>
                <div className="button-container mt-3">
                  {!isEditing ? (
                    <button className="btn btn-primary" onClick={handleEdit}>
                      Edit
                    </button>
                  ) : (
                    <button className="btn btn-success" onClick={handleUpdate}>
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === "contact-details" && (
            <div id="contact-details">
              <h2 className="text-center">Contact Details</h2>
              <div className="container mt-5">
                <table className="table-bordered border-primary">
                  <tbody>{renderTable(contactDetails, "contact-details")}</tbody>
                </table>
                <div className="button-container mt-3">
                  {!isEditing ? (
                    <button className="btn btn-primary" onClick={handleEdit}>
                      Edit
                    </button>
                  ) : (
                    <button className="btn btn-success" onClick={handleUpdate}>
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === "qualification-details" && (
            <div id="qualification-details">
              <h2 className="text-center">Qualification Details</h2>
              <div className="container mt-5">
                <table className="table-bordered border-primary">
                  <tbody>{renderTable(qualificationDetails, "qualification-details")}</tbody>
                </table>
                <div className="button-container mt-3">
                  {!isEditing ? (
                    <button className="btn btn-primary" onClick={handleEdit}>
                      Edit
                    </button>
                  ) : (
                    <button className="btn btn-success" onClick={handleUpdate}>
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === "professional-details" && (
            <div id="professional-details">
              <h2 className="text-center">Professional Details</h2>
              <div className="container mt-5">
                <table className="table-bordered border-primary">
                  <tbody>{renderTable(professionalDetails, "professional-details")}</tbody>
                </table>
                <div className="button-container mt-3">
                  {!isEditing ? (
                    <button className="btn btn-primary" onClick={handleEdit}>
                      Edit
                    </button>
                  ) : (
                    <button className="btn btn-success" onClick={handleUpdate}>
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
