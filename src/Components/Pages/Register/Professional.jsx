import './Professional.css';
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './style.css';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaUserTie, FaMoneyBillWave } from "react-icons/fa"; // Importing icons

function Professional({ onNext, onPrevious }) {
    const [data, setData] = useState({});
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();

    function getData(e) {
        let name = e.target.name;
        let value = e.target.value;

        setData((prev) => {
            return { ...prev, [name]: value };
        });
    }

    function handleSubmit(e) {
        e.preventDefault(); // Prevent the default form submission
        alert('Registration Successfully!!');
        navigate('/'); // Navigate to login page after the alert
    }

    console.log(state);

    return (
        <div className='form-container4'>
            <div className='form-box4'>
                <div className='personal-form'>
                    <h1 className='profh1'>Professional Details</h1>

                    {/* Job Role Input with Icon */}
                    <div className="input-container4">
                        <input type='text' name='jobrole' onChange={getData} placeholder="Job Role" />
                        <FaBriefcase className="icon-prof" />
                    </div>

                    {/* Company Name Input with Icon */}
                    <div className="input-container4">
                        <input type='text' name='companyname' onChange={getData} placeholder="Company Name" />
                        <FaBuilding className="icon-prof" />
                    </div>

                    {/* Company Location Input with Icon */}
                    <div className="input-container4">
                        <input type='text' name='companylocation' onChange={getData} placeholder="Company Location" />
                        <FaMapMarkerAlt className="icon-prof" />
                    </div>

                    {/* Job Position Input with Icon */}
                    <div className="input-container4">
                        <input type='text' name='jobposition' onChange={getData} placeholder="Job Position" />
                        <FaUserTie className="icon-prof" />
                    </div>

                    {/* Annual Income Input with Icon */}
                    <div className="input-container4">
                        <input type='number' name='annualincome' onChange={getData} placeholder="Annual Income" />
                        <FaMoneyBillWave className="icon-prof" />
                    </div>

                    <div className="form-actions4">
                        <button type="button" onClick={onPrevious} className='res2'>Prev</button>
                        <button type="submit" onClick={handleSubmit} className='res1'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Professional;
