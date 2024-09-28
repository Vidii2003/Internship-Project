// src/AccountSetup.js
import React, { useState } from 'react';
import './style.css'


// List of country codes
const countryCodes = ["+91", "+1", "+44", "+61"]; // Add more codes as needed

const AccountSetup = ({ onNext }) => {
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default country code
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateMobile = () => {
    const regex = /^[0-9]{7,15}$/;
    return regex.test(mobile);
  };

  const validatePassword = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,12}$/;
    return regex.test(password);
  };

  const handleSubmit = () => {
    const fullMobileNumber = `${countryCode}${mobile}`; // Concatenate country code with mobile number

    if (!validateMobile()) {
      alert('Enter a valid mobile number.');
      return;
    }
    if (!validatePassword()) {
      alert('Enter a valid password (Uppercase, Lowercase, Digit, Special Character).');
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    alert(`Mobile Number: ${fullMobileNumber}`);
    onNext(); // Navigate to next page (Personal Information)
  };

  return (
    <body style={{height: '100vh'}}>
    <div className='form-container' >
      <div className='form-box'>
      <h2>Account Setup</h2>
      <div className='form-group'>
        <label>Primary Mobile Number:<span className="required">*</span></label>
        <div className='phone-input' style={{ display: 'flex' }}>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            style={{ marginRight: '10px' }}
          >
            {countryCodes.map((code, index) => (
              <option key={index} value={code}>
                {code}
              </option>
            ))}
          </select>
          <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </div>
      
      <div>
        <label>Password:<span className="required">*</span></label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>Confirm Password:<span className="required">*</span></label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>

      <div className='form-action' >
      <button onClick={handleSubmit}>Next</button>
      </div>
    </div>
    </div>
    </div>
    </body>
  );
};

export default AccountSetup;
