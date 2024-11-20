import React, { useState } from "react";
import { FaGraduationCap, FaStream, FaLaptopCode, FaBuilding, FaCalendarAlt } from "react-icons/fa"; // Import icons
import { FaSortDown } from "react-icons/fa";
import './qualification.css';
import { useNavigate } from "react-router-dom";
import './style.css';

function Qualification({ onNext, onPrevious, savedData = {} }) {
  // Initialize form data with savedData passed as props
  let [value, setValue] = useState({
    Qualification: savedData.Qualification || "",
    stream: savedData.stream || "",
    Skills: savedData.Skills || "",
    Institute: savedData.Institute || "",
    passedoutyear: savedData.passedoutyear || ""
  });

  const navigate = useNavigate();

  // Handle each input change individually
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePrevious = () => {
    onPrevious({
      Qualification: value.Qualification,
      stream: value.stream,
      Skills: value.Skills,
      Institute: value.Institute,
      passedoutyear: value.passedoutyear
    });
  };
  
  // Pass the collected form data to the next step
  const handleNext = (e) => {
    e.preventDefault();

    // Ensure that all required fields are filled before navigating
    if (value.Qualification) {
      onNext({
        Qualification: value.Qualification, // Pass other fields
        stream: value.stream,
        Skills: value.Skills,
        Institute: value.Institute,
        passedoutyear: value.passedoutyear
      });// Pass the current state (value) to the parent component
    } else {
      alert("Please fill in all the fields before proceeding.");
    }
  };

  return (
    <div className="form-container5 qual">
      <div className="form-box5">
        <h2 className="qualh2">Qualification</h2>
        <form className="form-rapper5" onSubmit={handleNext}>
          <div className="input-box5">
            <select
              name="Qualification"
              required
              id="select"
              className="select-field"
              value={value.Qualification}
              onChange={handleInputChange} // Handle input changes
            >
              <option value="">Qualification</option>
              <option value={"SSLC"}>SSLC</option>
              <option value={'HSC'}>HSC</option>
              <option value={"DEGREE"}>Degree</option>
              <option value={"M.sc."}>M.sc.</option>
              <option value={"PHD"}>PHD</option>
            </select>
            <FaSortDown className="icon10"/>
            <FaGraduationCap className="icon-qual" />
          </div>

          <div className="input-box5">
            <input
              type="text"
              name="stream"
              placeholder="Stream"
              id="stream"
              value={value.stream}
              onChange={handleInputChange} // Handle input changes
            />
            <FaStream className="icon-qual" />
          </div>

          <div className="input-box5">
            <input
              type="text"
              name="Skills"
              placeholder="Skills"
              id="skills"
              value={value.Skills}
              onChange={handleInputChange} // Handle input changes
            />
            <FaLaptopCode className="icon-qual" />
          </div>

          <div className="input-box5">
            <input
              type="text"
              placeholder="Institute name"
              name="Institute"
              id="institute"
              value={value.Institute}
              onChange={handleInputChange} // Handle input changes
            />
            <FaBuilding className="icon-qual" />
          </div>

          <div className="input-box5">
            <input
              type="number"
              placeholder="Passed out year"
              min={1990}
              max={5000}
              id="year"
              name="passedoutyear"
              value={value.passedoutyear}
              onChange={handleInputChange} // Handle input changes
            />
            <FaCalendarAlt className="icon-qual" />
          </div>

          <button onClick={handlePrevious} className="res2">Previous</button>
            <button onClick={handleNext} className="res1">Next</button>
        </form>
      </div>
    </div>
  );
}

export default Qualification;