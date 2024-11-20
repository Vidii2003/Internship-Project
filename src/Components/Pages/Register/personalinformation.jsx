
import React, { useState } from 'react'; 
import { FaUser, FaPhone, FaCalendarAlt, FaTransgender } from 'react-icons/fa';
import { FaSortDown } from "react-icons/fa";
import { BiSolidDonateBlood } from 'react-icons/bi';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styled from 'styled-components';
import './style.css';

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

const titles = ["Mr", "Mrs", "Ms", "Dr"];

const PersonalInformation = ({ 
  registeredMobile, 
  onNext, 
  onPrevious, 
  savedData = {} 
}) => {
  const [title, setTitle] = useState(savedData.title || '');
  const [firstName, setFirstName] = useState(savedData.firstName || '');
  const [middleName, setMiddleName] = useState(savedData.middleName || '');
  const [lastName, setLastName] = useState(savedData.lastName || '');
  const [fatherName, setFatherName] = useState(savedData.fatherName || '');
  const [motherName, setMotherName] = useState(savedData.motherName || '');
  const [spouseName, setSpouseName] = useState(savedData.spouseName || '');
  const [mobile1] = useState(registeredMobile); // Store the registered mobile number directly
  const [mobile2, setMobile2] = useState(savedData.mobile2 || '');
  const [gender, setGender] = useState(savedData.gender || '');
  const [day, setDay] = useState(savedData.day || '');
  const [month, setMonth] = useState(savedData.month || '');
  const [year, setYear] = useState(savedData.year || '');
  const [bloodGroup, setBloodGroup] = useState(savedData.bloodGroup || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [shareYear, setShareYear] = useState(savedData.shareYear !== undefined ? savedData.shareYear : true);
  // Days, months, and years arrays for dropdown
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  // Validation function for mobile number
  const validateMobile = (mobile) => /^[0-9]{7,15}$/.test(mobile.replace(/^\+?\d{1,3}/, ''));

  const validateRequiredFields = () => {
    setErrorMessage('');
    if (!firstName || !lastName || !fatherName || !motherName || !gender) {
      setErrorMessage('Please fill all required fields.');
      return false;
    }
    if (!validateMobile(mobile1)) {
      setErrorMessage('Enter a valid primary mobile number.');
      return false;
    }
    return true;
  };
  const handlePrev = () => {
    onPrevious({
      title,
      firstName,
      middleName,
      lastName,
      fatherName,
      motherName,
      spouseName,
      mobile1,
      mobile2,
      gender,
      day,
      month,
      year,
      bloodGroup,
      shareYear,
    });
  };
  
  const handleNext = () => {
    let role = 'user';
    if (mobile1 === '+919994418225') role = 'moderator';
    else if (mobile1 === '+919876543210') role = 'admin';

    if (validateRequiredFields()) {
      onNext({
        title,
        firstName,
        lastName,
        middleName,
        mobile1,
        mobile2,
        fatherName,
        motherName,
        spouseName,
        gender,
        role,
        dob: shareYear ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` : `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        day,
        month,
        year,
        bloodGroup,
        shareYear,
      });
    }

  };

  return (
    
    <div className='form-container per'>
      <div className='form-box'>
        <h2 className="s1th1">Personal Information</h2>
        <div className='form-group'>
          {errorMessage && <div className='error-message'>{errorMessage}</div>}

          <div className="input-box">
            {/*<label>Title:<span className="required">*</span></label>*/}
            <select className="title" value={title} onChange={(e) => setTitle(e.target.value)} required>
              <option value="">Select Title</option>
              {titles.map((titleOption, index) => (
                <option key={index} value={titleOption}>{titleOption}</option>
              ))}
            </select>
            <FaSortDown className="icon5"/>
          </div>

          <div className="input-box">
            {/*<label>First Name:<span className="required">*</span></label>*/}
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
            {/*<label>Middle Name:</label>*/}
            <input 
              type="text"
              placeholder="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
           />
           <FaUser className="icon7" />
          </div>

          <div className="input-box">
            {/*<label>Last Name:<span className="required">*</span></label>*/}
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
            {/*<label>Father's Name:<span className="required">*</span></label>*/}
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
            {/*<label>Mother's Name:<span className="required">*</span></label>*/}
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
            {/*<label>Spouse's Name:</label>*/}
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
                type="text"
                value={mobile1}
                disabled
                className="phone1 read-only-mobile"
                placeholder="Mobile Number"
                name="mobilenumber"
                required
                autoFocus={false}
              />
              <FaPhone className="icon3" />
            </PhoneInputWrapper>
          </div>

          <div className="input-box1">
            <h2>Alternate Mobile Number: </h2>
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
                  name: 'mobile2',
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
                id="shareYear" 
                checked={shareYear} 
                onChange={(e) => setShareYear(e.target.checked)} 
              />
              <label className="dobla" htmlFor="shareYear">Share my year of birth</label>
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
              {shareYear && (
                <select className="date" value={year} onChange={(e) => setYear(e.target.value)} style={{ marginRight: '10px' }}>
                  <option value="">Year</option>
                  {years.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              )}
              <FaCalendarAlt className="icon4" />
            </div>
          </div>

          <div className="input-box">
            <select className="title" value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <FaSortDown className="icon2" />
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
            <FaSortDown className="icon2" />
            <BiSolidDonateBlood className="icon6" />
          </div>
        </div>
        <button className="res2" onClick={handlePrev}>Previous</button>
        <button className="res1" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default PersonalInformation;
