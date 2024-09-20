import React, { useState } from "react";
import './forgetmemberid.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styled from 'styled-components';
import { GiRotaryPhone } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

const PhoneInputWrapper = styled.div`
  .react-tel-input {
    position: relative;
    width: 100%; /* Adjust width to 100% */
    height: 50px;
    margin: 30px 0;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, .1);
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
    border-right: 2px solid rgba(255, 255, 255, .1);
    border-radius: 40px 0 0 40px; /* Rounded left side */
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
    padding-left: 60px; /* Make space for the flag dropdown */
    background: transparent;
    color: #fff;
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
    color: #fff;
    padding: 10px 20px 10px 70px; /* Padding for flag dropdown space */
    font-size: 20px;
    right:10px;
    bottom:5px;
    border-radius: 40px;
  }

  .react-tel-input input::placeholder {
    color: rgba(255, 255, 255, 0.7);
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
        const phoneNumber = mobilenumber.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
        if (phoneNumber.length < 7 || phoneNumber.length > 15) {
            isValid = false;
            errors.mobilenumber = "Please provide a valid mobile number.";
        }

        setErrors(errors);
        return isValid;
    };

    const handlememberid = (e) => {
        e.preventDefault();
        if (validate()) {
            // Display the alert and navigate after the alert is acknowledged
            alert("Your Member ID is ");
            setInput({
                mobilenumber: ''
            });
            setAction('');

            // Navigate to the login page after alert
            navigate('/'); // Replace '/login' with the path to your login page
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
                            country={'in'}  // Default country (India)
                            value={input.mobilenumber}
                            onChange={handlePhoneChange}  // Update the input value
                            placeholder="Mobile Number"
                            enableAreaCodes={true}  // Enable area codes
                            disableCountryCode={false}  // Ensure country code is displayed
                            disableDropdown={false}  // Allow user to select the country code via dropdown
                            countryCodeEditable={false}  // Prevent country code from being editable
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
