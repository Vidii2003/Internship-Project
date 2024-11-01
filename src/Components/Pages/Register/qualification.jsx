import React, { useState } from "react";
import { FaGraduationCap, FaStream, FaLaptopCode, FaBuilding, FaCalendarAlt } from "react-icons/fa"; // Import icons
import { FaSortDown } from "react-icons/fa";
import './qualification.css';
import { useNavigate } from "react-router-dom";
import './style.css';

function Qualification({ onNext, onPrevious }) {
  let [value, setValue] = useState({
    Qualification: "",
    stream: "",
    Skills: "",
    Institute: "",
    passedoutyear: ""
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

  // Pass the collected form data to the next step
  const handleNext = (e) => {
    e.preventDefault();

    // Ensure that all required fields are filled before navigating
    if (value.Qualification && value.stream && value.Skills && value.Institute && value.passedoutyear) {
      onNext(value); // Pass the current state (value) to the parent component
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
              required
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
              required
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
              required
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
              required
              min={1990}
              max={2027}
              id="year"
              name="passedoutyear"
              value={value.passedoutyear}
              onChange={handleInputChange} // Handle input changes
            />
            <FaCalendarAlt className="icon-qual" />
          </div>

          <div className="form-navigation">
            <button type="button" onClick={onPrevious} className="res2">Previous</button>
            <button type="submit" className="res1">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Qualification;