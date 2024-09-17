import React, { useState } from "react";
import './resetpass.css';
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ResetPass = () => {
    const [action, setAction] = useState('');
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobilenumber: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            errors.mobilenumber = "Mobile number must be between 7 and 15 digits.";
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
        }

        if (!uppercaseRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one uppercase letter.";
        }

        if (!lowercaseRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one lowercase letter.";
        }

        if (!specialCharRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one special character.";
        }

        if (!number.test(password)) {
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

    const handleResetPass = (e) => {
        e.preventDefault();
        if (validate()) {
            // Perform reset password logic here
            alert("Reset Password Successful!");
            setInput({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                mobilenumber: ''
            });
            setAction('');
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
                    
                    <div className="input-box">
                        <PhoneInput
                            country={'us'}
                            value={input.mobilenumber}
                            onChange={handlePhoneChange}
                            placeholder="Mobile Number"
                            required
                        />
                        {errors.mobilenumber && <div className="error">{errors.mobilenumber}</div>}
                    </div>

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

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPass;
