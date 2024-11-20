import React, { useState } from 'react';
import { FaEnvelope, FaHome, FaMapMarkedAlt, FaCity, FaBuilding, FaFlag, FaGlobe, FaMailBulk } from 'react-icons/fa'; // Import icons
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdShareLocation } from "react-icons/md";
import './style.css';

const AddressForm = ({ onNext, onPrevious, savedData = {} }) => {
  // Communication address state with saved data
  const [email, setEmail] = useState(savedData.email || '');
  const [commDoorNo, setCommDoorNo] = useState(savedData.commDoorNo || '');
  const [commStreetName, setCommStreetName] = useState(savedData.commStreetName || '');
  const [commArea, setCommArea] = useState(savedData.commArea || '');
  const [commCity, setCommCity] = useState(savedData.commCity || '');
  const [commDistrict, setCommDistrict] = useState(savedData.commDistrict || '');
  const [commState, setCommState] = useState(savedData.commState || '');
  const [commCountry, setCommCountry] = useState(savedData.commCountry || '');
  const [commPincode, setCommPincode] = useState(savedData.commPincode || '');

  // Permanent address state with saved data
  const [permDoorNo, setPermDoorNo] = useState(savedData.permDoorNo || '');
  const [permStreetName, setPermStreetName] = useState(savedData.permStreetName || '');
  const [permArea, setPermArea] = useState(savedData.permArea || '');
  const [permCity, setPermCity] = useState(savedData.permCity || '');
  const [permDistrict, setPermDistrict] = useState(savedData.permDistrict || '');
  const [permState, setPermState] = useState(savedData.permState || '');
  const [permCountry, setPermCountry] = useState(savedData.permCountry || '');
  const [permPincode, setPermPincode] = useState(savedData.permPincode || '');

  const [sameAsComm, setSameAsComm] = useState(savedData.sameAsComm || false);

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
  const handlePrevious = () => {
    onPrevious({
      email,
      commDoorNo,
      commStreetName,
      commArea,
      commCity,
      commDistrict,
      commState,
      commCountry,
      commPincode,
      permDoorNo,
      permStreetName,
      permArea,
      permCity,
      permDistrict,
      permState,
      permCountry,
      permPincode,
      commAddress: {
        doorNo: commDoorNo,
        streetName: commStreetName,
        area: commArea,
        city: commCity,
        district: commDistrict,
        state: commState,
        country: commCountry,
        pincode: commPincode,
      },
      permAddress: {
        doorNo: permDoorNo,
        streetName: permStreetName,
        area: permArea,
        city: permCity,
        district: permDistrict,
        state: permState,
        country: permCountry,
        pincode: permPincode,
      },
      sameAsComm,
    }); // Navigate to the previous step
  };
  
  const handleNext = () => {
    onNext({
      email,
      commDoorNo,
      commStreetName,
      commArea,
      commCity,
      commDistrict,
      commState,
      commCountry,
      commPincode,
      permDoorNo,
      permStreetName,
      permArea,
      permCity,
      permDistrict,
      permState,
      permCountry,
      permPincode,
      commAddress: {
        doorNo: commDoorNo,
        streetName: commStreetName,
        area: commArea,
        city: commCity,
        district: commDistrict,
        state: commState,
        country: commCountry,
        pincode: commPincode,
      },
      permAddress: {
        doorNo: permDoorNo,
        streetName: permStreetName,
        area: permArea,
        city: permCity,
        district: permDistrict,
        state: permState,
        country: permCountry,
        pincode: permPincode,
      },
      sameAsComm,
    }); // Navigate to next page
  }

  return (
    <div className='form-container add'>
      <div className='form-box'>
        <h2 className="a1th1">Address Information</h2>
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

          <button onClick={handlePrevious} className="res2">Previous</button>
          <button onClick={handleNext} className="res1">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;