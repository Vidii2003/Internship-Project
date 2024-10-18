import React, { useState } from 'react';
import { FaUser, FaPhone, FaCalendarAlt, FaTransgender } from 'react-icons/fa';
import { FaSortDown } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styled from 'styled-components';
import './style.css';

// List of country codes
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

const titles = ["Mr", "Mrs", "Ms", "Dr"]; // Add more titles as needed

const PersonalInformation = ({ onNext, onPrevious }) => {
  const [title, setTitle] = useState('');
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
  const [gender, setGender] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [hideYear, setHideYear] = useState(false);
  const [bloodGroup, setBloodGroup] = useState(''); // Checkbox state

  // Generate arrays for days, months, and years
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const validateMobile = (mobile) => {
    const regex = /^[0-9]{7,15}$/;
    return regex.test(mobile);
  };

  const validateFirstName = () => firstName.trim() !== ''; 
  const validateLastName = () => lastName.trim() !== ''; 
  const validateFatherName = () => fatherName.trim() !== ''; 
  const validateMotherName = () => motherName.trim() !== ''; 
  const validateGenderName = () => gender.trim() !== '';

  const handleNext = () => {
    const fullMobile1 = `${countryCode1}${mobile1}`;

    if (!validateFirstName()) {
      alert('Please enter your First Name.');
      return;
    }
    if (!validateLastName()) {
      alert('Please enter your Last Name.');
      return;
    }
    if (!validateFatherName()) {
      alert('Please enter your Father\'s Name.');
      return;
    }
    if (!validateMotherName()) {
      alert('Please enter your Mother\'s Name.');
      return;
    }
    if (!validateGenderName()) {
      alert('Please enter your Gender');
      return;
    }
    if (!validateMobile(mobile1)) {
      alert('Enter valid mobile numbers.');
      return;
    }
    alert(`Primary Mobile Number: ${fullMobile1}`);
    onNext();
  };

  return (
    <div className='form-container per'>
      <div className='form-box'>
        <h2 className="s1th1">Personal Information</h2>
        <div className='form-group'>
          <div className="input-box">
            <select className="title" value={title} onChange={(e) => setTitle(e.target.value)}>
              <option value="">Select Title</option>
              {titles.map((titleOption, index) => (
                <option key={index} value={titleOption}>{titleOption}</option>
              ))}
            </select>
            <FaSortDown className="icon5"/>
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <FaUser className="icon7" />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <FaUser className="icon7" />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <FaUser className="icon7" />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Father's Name"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              required
            />
            <FaUser className="icon7" />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Mother's Name"
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
              required
            />
            <FaUser className="icon7" />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Spouse's Name"
              value={spouseName}
              onChange={(e) => setSpouseName(e.target.value)}
            />
            <FaUser className="icon7" />
          </div>
          <div className="input-box1">
          <h2>Primary Mobile Number: <span className="required">*</span></h2>
          <PhoneInputWrapper>
            <PhoneInput
              className="phone1"
              country={'in'}  // Default country (India)
              value={mobile1}  // Update value with mobile state
              onChange={(value) => setMobile1(value)}  // Handle phone input changes
              placeholder="Mobile Number"
              enableAreaCodes={true}  // Enable area codes
              disableCountryCode={false}  // Ensure country code is displayed
              disableDropdown={false}  // Allow user to select the country code via dropdown
              countryCodeEditable={false}  // Prevent country code from being editable
              inputProps={{
                name: 'mobilenumber',
                required: true,
                autoFocus: false
              }}
            />
            <FaPhone className="icon3" />
          </PhoneInputWrapper>
          </div>
          
          <div className="input-box1">
          <h2>Secondary Mobile Number: </h2>
          <PhoneInputWrapper>
            <PhoneInput
              className="phone1"
              country={'in'}  // Default country (India)
              value={mobile2}  // Update value with mobile state
              onChange={(value) => setMobile2(value)}  // Handle phone input changes
              placeholder="Mobile Number"
              enableAreaCodes={true}  // Enable area codes
              disableCountryCode={false}  // Ensure country code is displayed
              disableDropdown={false}  // Allow user to select the country code via dropdown
              countryCodeEditable={false}  // Prevent country code from being editable
              inputProps={{
                name: 'mobilenumber',
                required: true,
                autoFocus: false
              }}
            />
            <FaPhone className="icon3" />
          </PhoneInputWrapper>
          </div>

          <div className="input-box">
            <h2 className="dobh2">Date of Birth:<span className="required">*</span></h2>
            <div className="checkbox-container">
                <input 
                  className="dob"
                  type="checkbox" 
                  id="hideYear" 
                  checked={hideYear} 
                  onChange={() => setHideYear(!hideYear)} 
                />
                <label className="dobla" htmlFor="hideYear">Not willing to give year</label>
              </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <select className="date" value={day} onChange={(e) => setDay(e.target.value)} style={{ marginRight: '10px' }}>
                <option value="">Day</option>
                {days.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <select className="date" value={month} onChange={(e) => setMonth(e.target.value)} style={{ marginRight: '10px' }}>
                <option value="">Month</option>
                {months.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              {!hideYear && (
                <select className="date" value={year} onChange={(e) => setYear(e.target.value)} style={{ marginRight: '10px' }}>
                  <option value="">Year</option>
                  {years.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              )}
              <FaCalendarAlt className="icon4" />
            </div>
          </div>

          <div className="input-box">
            <select className="title" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Prefer not to say</option>
            </select>
            <FaSortDown className="icon2"/>
            <FaTransgender className="icon6" />
          </div>

          <div className="input-box">
            <select className="title" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            <FaSortDown className="icon2"/>
            <BiSolidDonateBlood className="icon6" />
          </div>

          <button onClick={onPrevious} className="res2">Previous</button>
          <button onClick={handleNext} className="res1">Next</button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
