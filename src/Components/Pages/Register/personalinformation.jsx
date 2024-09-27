// src/PersonalInformation.js
import React, { useState } from 'react';
import './style.css';

// List of country codes
const countryCodes = ["+91", "+1", "+44", "+61"]; // Add more codes as needed

const PersonalInformation = ({ onNext, onPrevious }) => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [spouseName, setSpouseName] = useState('');
  const [mobile1, setMobile1] = useState('');
  const [mobile2, setMobile2] = useState('');
  const [countryCode1, setCountryCode1] = useState('+91');
  const [countryCode2, setCountryCode2] = useState('+91');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  const validateMobile = (mobile) => {
    const regex = /^[0-9]{7,15}$/;
    return regex.test(mobile);
  };

  const validateFirstName = () => {
    return firstName.trim() !== ''; // Check if first name is not empty
  };

  const validateLastName = () => {
    return lastName.trim() !== ''; 
  };
  const validateFatherName = () => {
    return fatherName.trim() !== ''; 
  };

  const validateMotherName = () => {
    return motherName.trim() !== ''; 
  };
  const validatedobName = () => {
    return dob.trim() !== ''; 
  };

  const validateGenderName = () => {
    return gender.trim() !== ''; 
  };

  const handleNext = () => {
    const fullMobile1 = `${countryCode1}${mobile1}`;
    



    if (!validateFirstName()) {
      alert('Please enter your First Name.'); // Show alert if not valid
      return;
    }
    if (!validateLastName()) {
      alert('Please enter your Last Name.'); // Show alert if not valid
      return;
    }
    if (!validateFatherName()) {
      alert('Please enter your Father\'s Name.'); // Show alert if not valid
      return;
    }

    if (!validateMotherName()) {
      alert('Please enter your Mother\'s Name.'); // Show alert if not valid
      return;
    }

    if (!validatedobName()) {
      alert('Please enter your Date of Birth'); // Show alert if not valid
      return;
    }

    if (!validateGenderName()) {
      alert('Please enter your Gender'); // Show alert if not valid
      return;
    }
    
    if (!validateMobile(mobile1) ) {
      alert('Enter valid mobile numbers.');
      return;
    }
    alert(`Primary Mobile Number: ${fullMobile1}`);
    onNext(); // Navigate to next page
  };

  return (
    <div className='form-container'>
      <div className='form-box'>
      <h2>Personal Information</h2>
      <div className='form-group'>
      <div>
        <label>First Name:<span className="required">*</span></label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div>
        <label>Middle Name:</label>
        <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
      </div>
      <div>
        <label>Last Name:<span className="required">*</span></label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div>
        <label>Father's Name:<span className="required">*</span></label>
        <input type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
      </div>
      <div>
        <label>Mother's Name:<span className="required">*</span></label>
        <input type="text" value={motherName} onChange={(e) => setMotherName(e.target.value)} />
      </div>
      <div>
        <label>Spouse's Name:</label>
        <input type="text" value={spouseName} onChange={(e) => setSpouseName(e.target.value)} />
      </div>
      <div >
        <label>Primary Mobile Number:<span className="required">*</span></label>
        <div className='phone-input'style={{ display: 'flex' }}>
          <select
            value={countryCode1}
            onChange={(e) => setCountryCode1(e.target.value)}
            style={{ marginRight: '10px' }}
          >
            {countryCodes.map((code, index) => (
              <option key={index} value={code}>
                {code}
              </option>
            ))}
          </select>
          <input type="text" value={mobile1} onChange={(e) => setMobile1(e.target.value)} />
        </div>
      </div>
      <div >
        <label>Alternate Mobile Number:</label>
        <div className='phone-input'style={{ display: 'flex' }}>
          <select
            value={countryCode2}
            onChange={(e) => setCountryCode2(e.target.value)}
            style={{ marginRight: '10px' }}
          >
            {countryCodes.map((code, index) => (
              <option key={index} value={code}>
                {code}
              </option>
            ))}
          </select>
          <input type="text" value={mobile2} onChange={(e) => setMobile2(e.target.value)} />
        </div>
      </div>
      <div>
        <label>Date of Birth:<span className="required">*</span></label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      </div>
      <div>
        <label>Gender:<span className="required">*</span></label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Prefer not to say</option>
        </select>
      </div>
      <div>
        <label>Blood Group:</label>
        <input type="text" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} />
      </div>
      <div className='form-actions' style={{ marginTop: '20px' }}>
        <button onClick={onPrevious} style={{ marginRight: '10px' }}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>
      </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
