import React, { useState } from 'react';
import { FaEnvelope, FaHome, FaMapMarkedAlt, FaCity, FaBuilding, FaFlag, FaGlobe, FaMailBulk } from 'react-icons/fa'; // Import icons
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdShareLocation } from "react-icons/md";
import './style.css';

const AddressForm = ({ onNext, onPrevious }) => {
  const [email, setEmail] = useState('');
  const [commDoorNo, setCommDoorNo] = useState('');
  const [commStreetName, setCommStreetName] = useState('');
  const [commArea, setCommArea] = useState('');
  const [commCity, setCommCity] = useState('');
  const [commDistrict, setCommDistrict] = useState('');
  const [commState, setCommState] = useState('');
  const [commCountry, setCommCountry] = useState('');
  const [commPincode, setCommPincode] = useState('');

  // State for permanent address fields
  const [permDoorNo, setPermDoorNo] = useState('');
  const [permStreetName, setPermStreetName] = useState('');
  const [permArea, setPermArea] = useState('');
  const [permCity, setPermCity] = useState('');
  const [permDistrict, setPermDistrict] = useState('');
  const [permState, setPermState] = useState('');
  const [permCountry, setPermCountry] = useState('');
  const [permPincode, setPermPincode] = useState('');

  const [sameAsComm, setSameAsComm] = useState(false);

  // Function to handle checkbox
  const handleSameAsComm = () => {
    setSameAsComm(!sameAsComm);
    if (!sameAsComm) {
      setPermDoorNo(commDoorNo);
      setPermStreetName(commStreetName);
      setPermArea(commArea);
      setPermCity(commCity);
      setPermDistrict(commDistrict);
      setPermState(commState);
      setPermCountry(commCountry);
      setPermPincode(commPincode);
    } else {
      // Clear permanent address fields when checkbox is unchecked
      setPermDoorNo('');
      setPermStreetName('');
      setPermArea('');
      setPermCity('');
      setPermDistrict('');
      setPermState('');
      setPermCountry('');
      setPermPincode('');
    }
  };

  const handleNext = () => {
    // Add your validation and navigation logic here
    onNext();
  };

  return (
    <div className='form-container add'>
      <div className='form-box'>
        <h1 className="s1th1">Address Information</h1>
        <div className='form-group'>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaEnvelope className="icon9" />
          </div>

          <div className="input-box3">
            <h2 className="cah2">Communication Address</h2>

            <div className="input-box">
              <input
                type="text"
                placeholder="Door No."
                value={commDoorNo}
                onChange={(e) => setCommDoorNo(e.target.value)}
                required
              />
              <FaHome className="icon8" />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Street Name"
                value={commStreetName}
                onChange={(e) => setCommStreetName(e.target.value)}
                required
              />
              <FaMapMarkedAlt className="icon8" />
            </div>
            <div className="input-box">
              
              <input
                type="text"
                placeholder="Area"
                value={commArea}
                onChange={(e) => setCommArea(e.target.value)}
                required
              />
              <MdShareLocation className="icon8" />
            </div>
            <div className="input-box">
              
              <input
                type="text"
                placeholder="City"
                value={commCity}
                onChange={(e) => setCommCity(e.target.value)}
                required
              />
              <FaCity className="icon8" />
            </div>
            <div className="input-box">
              
              <input
                type="text"
                placeholder="District"
                value={commDistrict}
                onChange={(e) => setCommDistrict(e.target.value)}
                required
              />
              <FaBuilding className="icon8" />
            </div>
            <div className="input-box">
              
              <input
                type="text"
                placeholder="State"
                value={commState}
                onChange={(e) => setCommState(e.target.value)}
                required
              />
              <FaLocationCrosshairs className="icon8"/>
            </div>
            <div className="input-box">
              
              <input
                type="text"
                placeholder="Country"
                value={commCountry}
                onChange={(e) => setCommCountry(e.target.value)}
                required
              />
              <FaGlobe className="icon8" />
            </div>
            <div className="input-box">
              
              <input
                type="text"
                placeholder="Pincode"
                value={commPincode}
                onChange={(e) => setCommPincode(e.target.value)}
                required
              />
              <FaMailBulk className="icon8" />
            </div>
          </div>

          <div className="checkbox-container1">
            <input
              className="dob"
              type="checkbox"
              id="sameAsComm"
              checked={sameAsComm}
              onChange={handleSameAsComm}
            />
            <label className="doblasame" htmlFor="sameAsComm">Same as Communication Address</label>
          </div>

          <div className="input-box3">
            <h2 className="cah2">Permanent Address</h2>

            <div className="input-box">
              
              <input
                type="text"
                placeholder="Door No."
                value={permDoorNo}
                onChange={(e) => setPermDoorNo(e.target.value)}
                required
              />
              <FaHome className="icon8" />
            </div>
            <div className="input-box">
              
              <input
                type="text"
                placeholder="Street Name"
                value={permStreetName}
                onChange={(e) => setPermStreetName(e.target.value)}
                required
              />
              <FaMapMarkedAlt className="icon8" />
            </div>
            <div className="input-box">
              
              <input
                type="text"
                placeholder="Area"
                value={permArea}
                onChange={(e) => setPermArea(e.target.value)}
                required
              />
              <MdShareLocation className="icon8" />
            </div>
            <div className="input-box">
              
              <input
                type="text"
                placeholder="City"
                value={permCity}
                onChange={(e) => setPermCity(e.target.value)}
                required
              />
              <FaCity className="icon8" />
            </div>
            <div className="input-box">
              
              <input
                type="text"
                placeholder="District"
                value={permDistrict}
                onChange={(e) => setPermDistrict(e.target.value)}
                required
              />
              <FaBuilding className="icon8" />
            </div>
            <div className="input-box">
              
              <input
                type="text"
                placeholder="State"
                value={permState}
                onChange={(e) => setPermState(e.target.value)}
                required
              />
              <FaLocationCrosshairs className="icon8"/>
            </div>
            <div className="input-box">
              
              <input
                type="text"
                placeholder="Country"
                value={permCountry}
                onChange={(e) => setPermCountry(e.target.value)}
                required
              />
              <FaGlobe className="icon8" />
            </div>
            <div className="input-box">
              
              <input
                type="text"
                placeholder="Pincode"
                value={permPincode}
                onChange={(e) => setPermPincode(e.target.value)}
                required
              />
              <FaMailBulk className="icon8" />
            </div>
          </div>

          <button onClick={onPrevious} className="res2">Previous</button>
          <button onClick={handleNext} className="res1">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
