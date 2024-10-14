import React, { useState } from "react";
import { FaGraduationCap, FaUserGraduate, FaBuilding, FaStream, FaLaptopCode, FaCalendarAlt } from "react-icons/fa"; // Import icons
import './qualification.css';
import { useNavigate } from "react-router-dom";

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
    <div className="form-container qual">
      <div className="form-box">
        <h3 className="form-topic">Qualification</h3>
        <form className="form-rapper" onSubmit={getValue}>
          <div className="input-box">
            <select name="Qualification" required id="select" className="select-field">
              <option>---------------SELECT--------------</option>
              <option value={"SSSLC"}>SSLC</option>
              <option value={'HSC'}>HSC</option>
              <option value={"DEGREE"}>Degree</option>
              <option value={"M,sc."}>M,sc.</option>
              <option value={"PHD"}>PHD</option>
            </select>
            <FaGraduationCap className="icon-qual" />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="stream"
              placeholder="Stream"
              required
              id="stream"
            />
            <FaStream className="icon-qual" />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="Skills"
              placeholder="Skills"
              required
              id="skills"
            />
            <FaLaptopCode className="icon-qual" />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Institute name"
              name="Institute"
              required
              id="institute"
            />
            <FaBuilding className="icon-qual" />
          </div>

          <div className="input-box">
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

          <div className='form-actions' style={{ marginTop: '20px' }}>
            <button onClick={onPrevious} className="form-btn">Previous</button>
            <button onClick={handleNext} className="form-btn">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Qualification;
