import React, { useState } from 'react';
import { FaPhone, FaTransgender } from 'react-icons/fa';
import { BiSolidDonateBlood } from 'react-icons/bi';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './style.css';

const titles = ["Mr", "Mrs", "Ms", "Dr"];

const PersonalInformation = ({ registeredMobile, onNext, onPrevious }) => {
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [spouseName, setSpouseName] = useState('');
  const [mobile1] = useState(registeredMobile); // Store the registered mobile number directly
  const [mobile2, setMobile2] = useState('');
  const [gender, setGender] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [shareYear, setShareYear] = useState(true); // For the year-sharing option

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
        bloodGroup
      });
    }
  };

  return (
    
    <div className='form-container'>
      <div className='form-box'>
        <h2>Personal Information</h2>
        <div className='form-group'>
          {errorMessage && <div className='error-message'>{errorMessage}</div>}

          <div>
            <label>Title:<span className="required">*</span></label>
            <select value={title} onChange={(e) => setTitle(e.target.value)}>
              <option value="">Select Title</option>
              {titles.map((titleOption, index) => (
                <option key={index} value={titleOption}>{titleOption}</option>
              ))}
            </select>
          </div>

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

          <div>
            <label>Primary Mobile Number:<span className="required">*</span></label>
            <input type="text" value={mobile1} readOnly className="read-only-mobile" />
            <FaPhone className="icon3" />
          </div>

          <div>
            <label>Alternate Mobile Number:</label>
            <PhoneInput
              country={'in'}
              value={mobile2}
              onChange={(value) => setMobile2(value)}
              placeholder="Mobile Number"
              enableAreaCodes={true}
              disableCountryCode={false}
              disableDropdown={false}
              countryCodeEditable={false}
              inputProps={{ name: 'mobile2', required: true, autoFocus: false }}
            />
            <FaPhone className="icon3" />
          </div>

          <div>
            <label>Date of Birth:<span className="required">*</span></label>
            <div className="dob-selectors">
              <select value={day} onChange={(e) => setDay(e.target.value)}>
                <option value="">Day</option>
                {days.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <select value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="">Month</option>
                {months.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              {shareYear && (
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="">Year</option>
                  {years.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              )}
            </div>
            <label>
              <input type="checkbox" checked={shareYear} onChange={(e) => setShareYear(e.target.checked)} />
              Share my year of birth
            </label>
          </div>

          <div>
            <label>Gender:<span className="required">*</span></label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <FaTransgender className="icon3" />
          </div>

          <div>
            <label>Blood Group:</label>
            <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <BiSolidDonateBlood className="icon3" />
          </div>

        </div>

        <div className='form-navigation'>
          <button className="res2" onClick={onPrevious}>Previous</button>
          <button className="res1" onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;