import React, { useState } from "react";
import { FaGraduationCap, FaUserGraduate, FaBuilding, FaStream, FaLaptopCode, FaCalendarAlt } from "react-icons/fa"; // Import icons
import { FaSortDown } from "react-icons/fa";
import './qualification.css';
import { useNavigate } from "react-router-dom";
import './style.css';
function Qualification({ onNext, onPrevious }) {
  let [value, setValue] = useState({});
  
  const handleNext = () => {
    onNext();
  }

  const navigate = useNavigate();

  function getValue(e) {
    e.preventDefault();
    const select = document.getElementById("select");
    const year = document.getElementById("year");
    const stream = document.getElementById("stream");
    const institute = document.getElementById("institute");
    const skills = document.getElementById("skills");

    setValue((prev) => {
      return {
        ...prev,
        [select.name]: select.value,
        [year.name]: year.value,
        [stream.name]: stream.value,
        [institute.name]: institute.value,
        [skills.name]: skills.value
      };
    });
  }

  console.log(value);

  return (
    <div className="form-container5 qual">
      <div className="form-box5">
        <h2 className="qualh2">Qualification</h2>
        <form className="form-rapper5" onSubmit={getValue}>
          <div className="input-box5">
            <select name="Qualification" required id="select" className="select-field">
              <option>Qualification</option>
              <option value={"SSSLC"}>SSLC</option>
              <option value={'HSC'}>HSC</option>
              <option value={"DEGREE"}>Degree</option>
              <option value={"M,sc."}>M,sc.</option>
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
            />
            <FaCalendarAlt className="icon-qual" />
          </div>

          
            <button onClick={onPrevious} className="res2">Previous</button>
            <button onClick={handleNext} className="res1">Next</button>
          
        </form>
      </div>
    </div>
  );
}

export default Qualification;
