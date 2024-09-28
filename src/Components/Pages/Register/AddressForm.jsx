import React, { useState } from 'react';
import './AddressForm.css';
import './style.css';

const AddressForm = ({ onNext, onPrevious }) => {
  const [Email,setEmail] = useState('');
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

  // State for checkbox
  const [copyAddress, setCopyAddress] = useState(false);

  // Handle changes in communication address fields
  const handleCommChange = (e, setter) => {
    setter(e.target.value);
    if (copyAddress) {
      switch (e.target.name) {
        case 'commDoorNo':
          setPermDoorNo(e.target.value);
          break;
        case 'commStreetName':
          setPermStreetName(e.target.value);
          break;
        case 'commArea':
          setPermArea(e.target.value);
          break;
        case 'commCity':
          setPermCity(e.target.value);
          break;
        case 'commDistrict':
          setPermDistrict(e.target.value);
          break;
        case 'commState':
          setPermState(e.target.value);
          break;
        case 'commCountry':
          setPermCountry(e.target.value);
          break;
        case 'commPincode':
          setPermPincode(e.target.value);
          break;
        default:
          break;
      }
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setCopyAddress(isChecked);

    if (isChecked) {
      setPermDoorNo(commDoorNo);
      setPermStreetName(commStreetName);
      setPermArea(commArea);
      setPermCity(commCity);
      setPermDistrict(commDistrict);
      setPermState(commState);
      setPermCountry(commCountry);
      setPermPincode(commPincode);
    } else {
      setPermDoorNo('');
      setPermStreetName('');
      setPermArea('');
      setPermCity('');
      setPermDistrict('');
      setPermState('');
      setPermCountry('');
      setPermPincode('');
    }
    
}
const handleNext = () => {
  onNext(); // Navigate to next page
}
  return (
    <div className='form-container'>
      <div className='form-box'>
    <div>
      <h1>Contact Details</h1>
      
      <div>
        <label>
          Email:
          <input
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        </label>
      </div>
      <div>
        <h2>Current Address</h2>
        <label>
          Door No:
          <input
            type="text"
            name="commDoorNo"
            value={commDoorNo}
            onChange={(e) => handleCommChange(e, setCommDoorNo)}
          />
        </label>
        <br />
        <label>
          Street Name:
          <input
            type="text"
            name="commStreetName"
            value={commStreetName}
            onChange={(e) => handleCommChange(e, setCommStreetName)}
          />
        </label>
        <br />
        <label>
          Area:
          <input
            type="text"
            name="commArea"
            value={commArea}
            onChange={(e) => handleCommChange(e, setCommArea)}
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="commCity"
            value={commCity}
            onChange={(e) => handleCommChange(e, setCommCity)}
          />
        </label>
        <br />
        <label>
          District:
          <input
            type="text"
            name="commDistrict"
            value={commDistrict}
            onChange={(e) => handleCommChange(e, setCommDistrict)}
          />
        </label>
        <br />
        <label>
          State:
          <input
            type="text"
            name="commState"
            value={commState}
            onChange={(e) => handleCommChange(e, setCommState)}
          />
        </label>
        <br />
        <label>
          Country:
          <input
            type="text"
            name="commCountry"
            value={commCountry}
            onChange={(e) => handleCommChange(e, setCommCountry)}
          />
        </label>
        <br />
        <label>
          Pincode:
          <input
            type="text"
            name="commPincode"
            value={commPincode}
            onChange={(e) => handleCommChange(e, setCommPincode)}
          />
        </label>
      </div>
      <br/>
      <div>
        
          <input
            type="checkbox"
            checked={copyAddress}
            onChange={handleCheckboxChange}
          />
          <label>
          Current Address is same as Permanent Address
        </label>
      </div>
      

      <div>
        <h2>Permanent Address</h2>
        <label>
          Door No:
          <input
            type="text"
            value={permDoorNo}
            onChange={(e) => setPermDoorNo(e.target.value)}
            disabled={copyAddress}
          />
        </label>
        <br />
        <label>
          Street Name:
          <input
            type="text"
            value={permStreetName}
            onChange={(e) => setPermStreetName(e.target.value)}
            disabled={copyAddress}
          />
        </label>
        <br />
        <label>
          Area:
          <input
            type="text"
            value={permArea}
            onChange={(e) => setPermArea(e.target.value)}
            disabled={copyAddress}
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            value={permCity}
            onChange={(e) => setPermCity(e.target.value)}
            disabled={copyAddress}
          />
        </label>
        <br />
        <label>
          District:
          <input
            type="text"
            value={permDistrict}
            onChange={(e) => setPermDistrict(e.target.value)}
            disabled={copyAddress}
          />
        </label>
        <br />
        <label>
          State:
          <input
            type="text"
            value={permState}
            onChange={(e) => setPermState(e.target.value)}
            disabled={copyAddress}
          />
        </label>
        <br />
        <label>
          Country:
          <input
            type="text"
            value={permCountry}
            onChange={(e) => setPermCountry(e.target.value)}
            disabled={copyAddress}
          />
        </label>
        <br />
        <label>
          Pincode:
          <input
            type="text"
            value={permPincode}
            onChange={(e) => setPermPincode(e.target.value)}
            disabled={copyAddress}
          />
        </label>
        <br/>
        <br/>
        <div className='form-actions' style={{ marginTop: '20px' }}>
        <button onClick={onPrevious} style={{ marginRight: '10px' }}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>
      </div>
      
    </div>
    </div>
    </div>
  );
};
export default AddressForm;