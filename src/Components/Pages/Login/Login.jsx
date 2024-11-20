import React, { useState } from "react";
import axios from "axios";
import './Login.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { GiRotaryPhone } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate

const Login = () => {
    const [input, setInput] = useState({

        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();  // Initialize useNavigate for redirection

    // Update input state
    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        const { member_id, username, password } = input;
    
        try {
            const response = await axios.post('http://3.106.52.122/core/login/', {

                username,
                password
            });
    
            if (response.status === 200) {
                alert("Login Successful!");
                // Pass username to the next page using navigate with state
                navigate("/Dashboard", { state: { username } });
            }
        } catch (error) {
            // Check if the error has a response from the server
            if (error.response && error.response.data) {
                // Set the errors in state to display in the form if needed
                setErrors(error.response.data);
    
                // Trigger alert with error messages

                if (error.response.data.username) {

                    alert(`Error with Mobile Number: ${error.response.data.username[0]}`);
                } else if (error.response.data.password) {
                    alert(`Error with Password: ${error.response.data.password[0]}`);
                } else if (error.response.data.non_field_errors) {
                    alert(`Login error: ${error.response.data.non_field_errors[0]}`);
                } else {
                    alert("An unknown error occurred. Please check the form and try again.");
                }
            } else {
                // Handle case when the error does not come with a detailed response
                alert("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="wrapper">
            <div className="form-box login">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Mobile Number" 
                            value={input.username} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <GiRotaryPhone className="icon" />
                    </div>
                    <div className="input-box">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            placeholder="Password" 
                            value={input.password} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <FaLock className="icon" />
                        <span className="password-toggle" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEye className="icon1" /> : <FaEyeSlash className="icon1" />}
                        </span>
                    </div>
                    {errors.non_field_errors && <p className="error">{errors.non_field_errors[0]}</p>}
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <Link to="/Memberid" className="member">Forget MemberID?</Link><br/>
                        <Link to="/ResetPassword" className="pr">Forgot Password?</Link>
                    </div>
                    <button type="submit" className="btn">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <Link to="/Register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;