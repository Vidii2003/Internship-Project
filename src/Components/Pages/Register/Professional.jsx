import './Professional.css';
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Professional({ onNext, onPrevious }){

  const [data, setData] = useState({});
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  function getData(e) {
    let name = e.target.name;
    let value = e.target.value;

    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission
    alert('Registration Successfully!!');
    navigate('/'); // Navigate to login page after the alert
  }

  console.log(state);

  return (
    <div className="personal-container">
      <div className='persnol-form-rapper'>
        <form className='personal-form'>
          <h3>Professional Details</h3>
          <div className="input-container">
            <label>Job category</label>
            <input type='text' id='text' name='jobrole' onChange={getData}></input>
          </div>
          <div className="input-container">
            <label>Company name</label>
            <input type='text' id='text' name='companyname' onChange={getData}></input>
          </div>
          <div className="input-container">
            <label>Company current Location</label>
            <input type='text' id='text' name='companylocation' onChange={getData}></input>
          </div>
          <div className="input-container">
            <label>Job position</label>
            <input type='text' id='text' name='Jobposition' onChange={getData}></input>
          </div>
          <div className="input-container">
            <label>Annual income</label>
            <input type='number' id='text' name='Annualincoome' onChange={getData}></input>
          </div>
          <div className='form-actions' style={{ marginTop: '20px' }}>
            <button onClick={onPrevious} style={{ marginRight: '10px' }}>Prev</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Professional;
