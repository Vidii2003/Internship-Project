import React, { useState } from "react";
import './resetpass.css';
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import { GiRotaryPhone } from "react-icons/gi";

const PhoneInputWrapper = styled.div`
  .react-tel-input {
    position: relative;
    width: 100%;
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
    padding: 10px 20px 10px 70px;
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

const ResetPass = () => {
    const [input, setInput] = useState({
        password: '',
        confirmPassword: '',
        mobilenumber: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
        setErrors({ ...errors, [name]: '' });
    };

    const handlePhoneChange = (value) => {
        setInput((prevInput) => ({
            ...prevInput,
            mobilenumber: value // Ensure this matches your input state key
        }));
        setErrors({ ...errors, mobilenumber: '' });
    };

    const validate = () => {
        let isValid = true;
        let errors = {};
        const { mobilenumber, password, confirmPassword } = input;

        const phoneNumber = mobilenumber.replace(/[^0-9]/g, '');
        if (phoneNumber.length < 7 || phoneNumber.length > 15) {
            isValid = false;
            errors.mobilenumber = "Please provide a valid mobile number.";
        }

        const minLength = 6;
        const maxLength = 10;
        const uppercaseRegEx = /[A-Z]/;
        const lowercaseRegEx = /[a-z]/;
        const specialCharRegEx = /[^A-Za-z0-9]/;
        const number = /[0-9]/;

        if (password.length < minLength || password.length > maxLength) {
            isValid = false;
            errors.password = `Password must be ${minLength}-${maxLength} characters long.`;
        } else if (!uppercaseRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one uppercase letter.";
        } else if (!lowercaseRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one lowercase letter.";
        } else if (!specialCharRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one special character.";
        } else if (!number.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one number.";
        }

        if (password !== confirmPassword) {
            isValid = false;
            errors.confirmPassword = "Passwords do not match.";
        }

        setErrors(errors);
        return isValid;
    };

    const handleResetPass = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            try {
                const fullMobile = `+${input.mobilenumber}`;
                const response = await axios.post('http://localhost:8000/api/reset_password/', {
                    mobilenumber: fullMobile,
                    password: input.password
                });

                if (response.status === 200) {
                    alert("Reset Password Successful!");
                    setInput({ password: '', confirmPassword: '', mobilenumber: '' });
                    navigate("/"); 
                } else {
                    alert("Failed to reset password.");
                }
            } catch (error) {
                const errorMessage = error.response?.data?.error || "An error occurred. Please try again.";
                setErrors({ ...errors, form: errorMessage });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="wrapper">
            <div className="form-box pass">
                <form className="form" onSubmit={handleResetPass}>
                    <h1>Reset Password</h1>
                    <PhoneInputWrapper>
                        <PhoneInput
                            className="phone"
                            country={'in'}
                            value={input.mobilenumber}
                            onChange={handlePhoneChange}
                            placeholder="Mobile Number"
                            enableAreaCodes
                            disableCountryCode={false}
                            disableDropdown={false}
                            countryCodeEditable={false}
                            inputProps={{ name: 'mobilenumber', required: true, autoFocus: true }}
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
                        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEye className="icon1"/> : <FaEyeSlash className="icon1"/>}
                        </span>
                        <div className="password-hint">Password must be 6-10 characters, contain uppercase, lowercase, and a special character.</div>
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
                        <span className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <FaEye className="icon1"/> : <FaEyeSlash className="icon1"/>}
                        </span>
                    </div>
                    {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}

                    {errors.form && <div className="error">{errors.form}</div>}

                    <button type="submit" className="res" disabled={isSubmitting}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPass;
