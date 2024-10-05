import './personal.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Personal({ onNext, onPrevious }){

  // const navigate = useNavigate();
  let [data,Setdata] = useState({})
  const location = useLocation();
  const {state} = location
  function getdata(e){
    let name = e.target.name
    let value = e.target.value

    Setdata((pre)=>{
      return{...pre,[name]:[value]}
    })
  }
  console.log(state)
    return(
        <div className="personal-container">
          <div className="header-location">
                <h5>Account setup &#62; Personal Details &#62; Countact Defaios &#62; Qualification &#62; Professional Details</h5>
                <h3 className="logout">Logout</h3>
          </div>
          <hr id='hrtag'></hr>
          <div className='persnol-form-rapper'>
            <form className='personal-form'>
            <h3>Professional Deteails</h3>
                  <div className="input-container">
                    <label>Job catagory</label>
                    <input type='text' id='text' name='jobrole'onChange={getdata}></input>
                  </div>
                  <div className="input-container">
                  <label>Company name</label>
                  <input type='text' id='text' name='companyname'onChange={getdata}></input>
                  </div>
                  <div className="input-container">
                    <label>Company current Location</label>
                    <input type='text' id='text' name='companylocation'onChange={getdata}></input>
                  </div>
                  <div className="input-container">
                  <label>Job position</label>
                  <input type='text' id='text' name='Jobposition'onChange={getdata}></input>
                  </div>
                  <div className="input-container">
                  <label>Annual income</label>
                  <input type='number' id='text' name='Annualincoome'onChange={getdata}></input>
                  </div>
                  <div className='form-actions' style={{ marginTop: '20px' }}>
                    <button onClick={onPrevious} style={{ marginRight: '10px' }}>Prev</button>
                    <button>subbmit</button>
                  </div>
            </form>
          </div>  
        </div>
    )
}

export default Personal;


// navigate('/Detail', {replace: true , state: {data,state}})}