import React, { useState } from "react";
import './Login.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdSendToMobile } from "react-icons/md";
import { GiRotaryPhone } from "react-icons/gi";
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const Login = () => {
    const [action, setAction] = useState('');
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    let [errors, setErrors] = useState({});
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        let isValid = true;
        errors = {};
        const { email, password, confirmPassword } = input;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            errors.email = "Please enter a valid email address.";
        }

        const minLength = 6;
        const maxLength = 10;
        const uppercaseRegEx = /[A-Z]/;
        const lowercaseRegEx = /[a-z]/;
        const specialCharRegEx = /[^A-Za-z0-9]/;

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

        if (password !== confirmPassword) {
            isValid = false;
            errors.confirmPassword = "Passwords do not match.";
        }

        if (!isCheckboxChecked) {
            isValid = false;
            errors.checkbox = "You must agree to the terms and conditions.";
        }

        setErrors(errors);
        return isValid;
    };

    const handlelogin = (e) => {
        e.preventDefault();
        if (validate()) {
            alert("Login Successful!");
            setInput({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            setIsCheckboxChecked(false); // Reset checkbox
            setAction('');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`wrapper ${action}`}>
            <div className="form-box login">
                <form action="" onSubmit={handlelogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Member ID" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Mobile Number" required />
                        <GiRotaryPhone className="ph3" />
                    </div>
                    <div className="input-box">
                        <input type={showPassword ? "text" : "password"} placeholder="Password" required />
                        <FaLock className="icon" />
                        <span className="password-toggle" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEye className="icon1" /> : <FaEyeSlash className="icon1" />}
                        </span>
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        {/* Replace a tags with Link components */}
                        <Link to="/Memberid" className="member">Forgot MemberID?</Link><br/>
                        <Link to="/ResetPassword" className="pr">Forgot Password?</Link>
                    </div>

                    <Link to="/Dashboard" className="sr" > <button type="submit" className="btn"><MdSendToMobile className="ph"/>Login</button> </Link>
                    <div className="register-link">
                        <p>
                        Don't have an account? <Link to="/Register">Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
