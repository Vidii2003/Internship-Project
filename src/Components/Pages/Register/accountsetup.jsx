// src/AccountSetup.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { GiRotaryPhone } from "react-icons/gi";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import './style.css'; // Make sure this file contains your styles

// List of country codes
const PhoneInputWrapper = styled.div`
  .react-tel-input {
    position: relative;
    width: 100%; /* Adjust width to 100% */
    height: 50px;
    margin: 30px 0px 60px;
    top: 30px;
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
    right: 10px;
    bottom: 5px;
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

const AccountSetup = ({ onNext }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // State to hold error messages
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateMobile = () => {
    const regex = /^[0-9]{7,15}$/;
    return regex.test(mobile);
  };

  const validatePassword = () => {
    const minLength = 6;
    const maxLength = 10;
    const uppercaseRegEx = /[A-Z]/;
    const lowercaseRegEx = /[a-z]/;
    const specialCharRegEx = /[^A-Za-z0-9]/;
    const number = /[0-9]/;

    if (password.length < minLength || password.length > maxLength) {
      setError(`Password must be between ${minLength} and ${maxLength} characters long.`);
      return false;
    }
    if (!uppercaseRegEx.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!lowercaseRegEx.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return false;
    }
    if (!specialCharRegEx.test(password)) {
      setError("Password must contain at least one special character.");
      return false;
    }
    if (!number.test(password)) {
      setError("Password must contain at least one number.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Reset error message

    const fullMobileNumber = mobile; // You may want to include country code logic here

    // Validation checks
    if (!validateMobile()) {
      setError('Enter a valid mobile number.');
      return;
    }
    if (!validatePassword()) {
      return; // Error messages are set in validatePassword
    }
    
    alert(`Mobile Number: ${fullMobileNumber}`); // This can be replaced with better handling logic
    onNext(); // Navigate to the next page (Personal Information)
  };

  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="wrapper">
      <div className="form-box acc">
        <form onSubmit={handleSubmit}>
          <h1 className="sth1">Account Setup</h1>
          <PhoneInputWrapper>
            <PhoneInput
              className="phone1"
              country={'in'}  // Default country (India)
              value={mobile}  // Update value with mobile state
              onChange={(value) => setMobile(value)}  // Handle phone input changes
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
            <GiRotaryPhone className="ph6" />
          </PhoneInputWrapper>

          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye className="icon1"/> : <FaEyeSlash className="icon1"/>}
            </span>
          </div>

          <div className="input-box">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
            <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEye className="icon1"/> : <FaEyeSlash className="icon1"/>}
            </span>
          </div>

          {error && <div className="error">{error}</div>} {/* Display error message */}

          <button type="submit" className="res">Next</button>
        </form>
      </div>
    </div>
  );
};

export default AccountSetup;
