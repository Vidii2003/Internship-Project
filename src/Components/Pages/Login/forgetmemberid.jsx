import React, { useState } from "react";
import './forgetmemberid.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styled from 'styled-components';
import { GiRotaryPhone } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PhoneInputWrapper = styled.div`
  .react-tel-input {
    position: relative;
    width: 100%;
    height: 50px;
    margin: 30px 0;
    background: transparent;
    border: 2px solid rgba(0, 0, 0, .1);
    border-radius: 40px;
  }

  .react-tel-input .flag-dropdown {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: transparent;
    border: none;
    font-size: 20px;
    border-right: 2px solid rgba(0, 0, 0, .1);
    border-radius: 40px 0 0 40px;
    padding: 0 10px;
  }

  .react-tel-input .selected-flag {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 40px;
    padding-left: 5px;
  }

  .react-tel-input .form-control {
    width: 100%;
    height: 100%;
    padding-left: 60px;
    background: transparent;
    color: #000000;
    border: none;
    outline: none;
    font-size: 16px;
    border-radius: 40px;
  }

  .react-tel-input input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: #000000;
    padding: 10px 20px 10px 70px;
    font-size: 20px;
    right: 10px;
    bottom: 5px;
    border-radius: 40px;
  }

  .react-tel-input input::placeholder {
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 20px;
  }
  
  .react-tel-input .country-list {
    background: #fff;
    color: #000;
  }
`;

const Forgotmemberid = () => {
    const [action, setAction] = useState('');
    const [input, setInput] = useState({
        mobilenumber: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate

    const handlePhoneChange = (value) => {
        setInput((prevInput) => ({
            ...prevInput,
            mobilenumber: value
        }));
    };

    const validate = () => {
        let isValid = true;
        let errors = {};
        const { mobilenumber } = input;

        // Mobile number validation (7-15 digits)
        const phoneNumber = mobilenumber.replace(/[^0-9]/g, '');
        if (phoneNumber.length < 7 || phoneNumber.length > 15) {
            isValid = false;
            errors.mobilenumber = "Please provide a valid mobile number.";
        }

        setErrors(errors);
        return isValid;
    };

    const [loading, setLoading] = useState(false); // Add loading state

    const handlememberid = async (e) => {
      e.preventDefault();
      if (validate()) {
          console.log("Payload:", { mobilenumber: input.mobilenumber });  // Log the payload
          try {
              const response = await axios.post('http://3.106.52.122/core/retrieve-member-id/', {
                  mobilenumber: input.mobilenumber,
              });
              // ... handle the response
          } catch (error) {
              if (error.response) {
                  console.log("Error Response:", error.response.data);  // Log the response data
                  if (error.response.status === 404) {
                      setErrors({ mobilenumber: "No user found with this mobile number." });
                  } else {
                      alert("An error occurred. Please try again later.");
                  }
              } else {
                  alert("An error occurred. Please try again later.");
              }
          
              // ... handle error
          }
      }
  };
  


    return (
        <div className={`wrapper ${action}`}>
            <div className="form-box member">
                <form className="form" onSubmit={handlememberid}>
                    <h1>Forgot Member ID</h1>
                    <PhoneInputWrapper>
                        <PhoneInput
                            className="phone"
                            country={'in'}
                            value={input.mobilenumber}
                            onChange={handlePhoneChange}
                            placeholder="Mobile Number"
                            enableAreaCodes={true}
                            disableCountryCode={false}
                            disableDropdown={false}
                            countryCodeEditable={false}
                            inputProps={{
                                name: 'mobilenumber',
                                required: true,
                                autoFocus: true
                            }}
                        />
                        <GiRotaryPhone className="ph2" />
                        {errors.mobilenumber && <div className="error">{errors.mobilenumber}</div>}
                    </PhoneInputWrapper>
                    <button type="submit" className="mem">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Forgotmemberid;
