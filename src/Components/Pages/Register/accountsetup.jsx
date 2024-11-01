import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import './style.css'; // Assuming you have styles in this file

// Styled component for PhoneInput
const PhoneInputWrapper = styled.div`
  .react-tel-input {
    position: relative;
    width: 100%;
    height: 50px;
    margin: 30px 0px 60px;
    top: 30px;
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

const AccountSetup = ({ onNext }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // For validation errors
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validate mobile number
  const validateMobile = () => {
    const regex = /^[0-9]{7,15}$/;
    return regex.test(mobile.replace(/^\+?\d{1,3}/, '')); // Strip the country code and validate
  };

  // Validate password
  const validatePassword = () => {
    const minLength = 8;
    const maxLength = 16;
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Validation
    if (!validateMobile()) {
      setError('Enter a valid mobile number.');
      return;
    }
    if (!validatePassword()) {
      return; // Password validation sets its own error
    }

    try {
      // Manually add '+' before the mobile number
      const fullMobile = `+${mobile}`;

      // Submit the form data to the backend
      const response = await axios.post('http://localhost:8000/api/account-setup/', {
        mobile: fullMobile, // Pass the full mobile number including the "+"
        password: password,
      });

      // Assuming the backend returns member_id and mobile
      const { member_id, mobile: registeredMobile } = response.data;

      alert(`Registration Successful!\nMobile Number: ${registeredMobile}\nMember ID: ${member_id}`);

      // Call onNext to move to the next step (Personal Information)
      onNext({
        mobile: fullMobile, // Pass the full mobile number including the "+"
      });

    } catch (error) {
      if (error.response && error.response.data) {
        setError('Error: ' + (error.response.data.error || 'Registration failed. Please try again.'));
      } else {
        setError('Error: Registration failed. Please try again.');
      }
    }
  };

  // Toggle password visibility
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
          <h2 className="sth1">Account Setup</h2>

          {/* Phone input */}
          <PhoneInputWrapper>
            <PhoneInput
              className="phone1"
              country={'in'} // Default country (India)
              value={mobile} // Mobile number value
              onChange={(value) => setMobile(value)} // Update mobile state
              placeholder="Mobile Number"
              enableAreaCodes={true}
              disableCountryCode={false}
              disableDropdown={false}
              countryCodeEditable={false}
              inputProps={{
                name: 'mobile',
                required: true,
                autoFocus: true
              }}
            />
          </PhoneInputWrapper>

          {/* Password input */}
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
              {showPassword ? <FaEye className="icon1" /> : <FaEyeSlash className="icon1" />}
            </span>
          </div>

          {/* Confirm password input */}
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
              {showConfirmPassword ? <FaEye className="icon1" /> : <FaEyeSlash className="icon1" />}
            </span>
          </div>

          {/* Error message display */}
          {error && <div className="error">{error}</div>}

          {/* Submit button */}
          <button type="submit" className="res">Next</button>
        </form>
      </div>
    </div>
  );
};

export default AccountSetup;