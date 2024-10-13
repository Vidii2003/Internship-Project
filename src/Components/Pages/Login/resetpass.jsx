import React, { useState } from "react";
import './resetpass.css';
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from "react-router-dom"; // Add this for navigation
import styled from 'styled-components';
import { GiRotaryPhone } from "react-icons/gi";

const PhoneInputWrapper = styled.div`
  .react-tel-input {
    position: relative;
    width: 100%; /* Adjust width to 100% */
    height: 50px;
    margin: 30px 0px 60px;
    top:30px;
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


const ResetPass = () => {
    const [action, setAction] = useState('');
    const [input, setInput] = useState({
        password: '',
        confirmPassword: '',
        mobilenumber: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate(); // Use for navigation after successful form submission

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    };

    const handlePhoneChange = (value) => {
        setInput((prevInput) => ({
            ...prevInput,
            mobilenumber: value
        }));
    };

    const validate = () => {
        let isValid = true;
        let errors = {};
        const { mobilenumber, password, confirmPassword } = input;
    
        // Mobile number validation (7-15 digits)
        const phoneNumber = mobilenumber.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
        if (phoneNumber.length < 7 || phoneNumber.length > 15) {
            isValid = false;
            errors.mobilenumber = "Please provide a valid Mobile number.";
            // Stop further validation if mobilenumber is invalid
            setErrors(errors);
            return false;
        }
    
        // Password validation rules
        const minLength = 6;
        const maxLength = 10;
        const uppercaseRegEx = /[A-Z]/;
        const lowercaseRegEx = /[a-z]/;
        const specialCharRegEx = /[^A-Za-z0-9]/;
        const number = /[0-9]/;
    
        if (password.length < minLength || password.length > maxLength) {
            isValid = false;
            errors.password = `Password must be between ${minLength} and ${maxLength} characters long.`;
            // Stop further validation if password is invalid
            setErrors(errors);
            return false;
        }
    
        if (!uppercaseRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one uppercase letter.";
            setErrors(errors);
            return false;
        }
    
        if (!lowercaseRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one lowercase letter.";
            setErrors(errors);
            return false;
        }
    
        if (!specialCharRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one special character.";
            setErrors(errors);
            return false;
        }
    
        if (!number.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one number.";
            setErrors(errors);
            return false;
        }
    
        if (password !== confirmPassword) {
            isValid = false;
            errors.confirmPassword = "Passwords do not match.";
            setErrors(errors);
            return false;
        }
    
        setErrors(errors);
        return isValid;
    };
    

    const handleResetPass = (e) => {
        e.preventDefault();
        if (validate()) {
            // Perform reset password logic here
            alert("Reset Password Successful!");
            setInput({
                password: '',
                confirmPassword: '',
                mobilenumber: ''
            });
            setAction('');
            // Redirect to login page after successful reset
            navigate("/"); // Replace "/login" with your actual login page path
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className={`wrapper ${action}`}>
            <div className="form-box pass">
                <form className="form" onSubmit={handleResetPass}>
                    <h1>Reset Password</h1>
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
                        <GiRotaryPhone className="ph1" />
                        {errors.mobilenumber && <div className="error">{errors.mobilenumber}</div>}
                    </PhoneInputWrapper>

                    <div className="input-box">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={input.password}
                            onChange={handleChange}
                            required
                        />
                        <FaLock className="icon" />
                        <span className="password-toggle" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEye className="icon1"/> : <FaEyeSlash className="icon1"/>}
                        </span>
                        <div className="password-hint">Password must be 6-10 characters long, contain at least one uppercase letter, one lowercase letter, and one special character.</div>
                    </div>
                    {errors.password && <div className="error">{errors.password}</div>}

                    <div className="input-box">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={input.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <FaLock className="icon" />
                        <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                            {showConfirmPassword ? <FaEye className="icon1"/> : <FaEyeSlash className="icon1"/>}
                        </span>
                    </div>
                    {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}

                    <button type="submit" className="res">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPass;
