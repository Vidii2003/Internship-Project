import React, { useState } from "react";
import './Login.css';
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

const LoginRegister = () => {
    const [action, setAction] = useState('');
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Password visibility state
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Confirm password visibility state

    const registerLink = () => {
        setAction('active');
    };

    const loginLink = () => {
        setAction('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        setIsCheckboxChecked(e.target.checked);
    };

    const validate = () => {
        let isValid = true;
        let errors = {};
        const { email, password, confirmPassword } = input;

        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            errors.email = "Please enter a valid email address.";
        }

        // Password validation rules
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

        // Check if confirm password matches
        if (password !== confirmPassword) {
            isValid = false;
            errors.confirmPassword = "Passwords do not match.";
        }

        // Check if the checkbox is checked
        if (!isCheckboxChecked) {
            isValid = false;
            errors.checkbox = "You must agree to the terms and conditions.";
        }

        setErrors(errors);
        return isValid;
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        if (validate()) {
            // Perform registration logic here
            alert("Registration Successful!");
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

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className={`wrapper ${action}`}>
            <div className="form-box login">
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Member ID" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Mobile Number" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type={showPassword ? "text" : "password"} placeholder="Password" required />
                        <FaLock className="icon" />
                        <span className="password-toggle" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEye className="icon1"/> : <FaEyeSlash className="icon1"/>}
                        </span>
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="#">Forgot Password?</a>
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
