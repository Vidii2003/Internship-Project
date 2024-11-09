import './Professional.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from 'axios'; // Import Axios
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaUserTie, FaMoneyBillWave } from "react-icons/fa"; // Importing icons

function Professional({ onNext, onPrevious, formData }) {
    const [data, setData] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate

    function getData(e) {
        const { name, value } = e.target;
        setData((prev) => {
            return { ...prev, [name]: value }; // Update state with new data
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Merge and format data here
        const finalData = {
            title: formData.personalInfo.title,
            first_name: formData.personalInfo.firstName,
            last_name: formData.personalInfo.lastName,
            middle_name: formData.personalInfo.middleName,
            mobile_1: formData.personalInfo.mobile1,
            mobile_2: formData.personalInfo.mobile2,
            father_name: formData.personalInfo.fatherName,
            mother_name: formData.personalInfo.motherName,
            spouse_name: formData.personalInfo.spouseName,
            blood_group: formData.personalInfo.bloodGroup,
            gender: formData.personalInfo.gender,
            role: formData.personalInfo.role,
            dob: formData.personalInfo.dob,
            email_id: formData.addressDetails.email,
            current_address_1: formData.addressDetails.commAddress.doorNo,
            current_address_2: formData.addressDetails.commAddress.streetName,
            current_city: formData.addressDetails.commAddress.city,
            current_district: formData.addressDetails.commAddress.district,
            current_state: formData.addressDetails.commAddress.state,
            current_country: formData.addressDetails.commAddress.country,
            current_pin_code: formData.addressDetails.commAddress.pincode,
            permanent_address_1: formData.addressDetails.permAddress.doorNo,
            permanent_address_2: formData.addressDetails.permAddress.streetName,
            permanent_city: formData.addressDetails.permAddress.city,
            permanent_district: formData.addressDetails.permAddress.district,
            permanent_state: formData.addressDetails.permAddress.state,
            permanent_country: formData.addressDetails.permAddress.country,
            permanent_pin_code: formData.addressDetails.permAddress.pincode,
            highest_qualification: formData.qualificationDetails.Qualification,
            institute_name: formData.qualificationDetails.Institute,
            stream: formData.qualificationDetails.stream,
            passed_out_year: formData.qualificationDetails.passedoutyear,
            skills: formData.qualificationDetails.Skills,
            job_category: data.jobrole,
            company_name: data.companyname,
            job_designation: data.jobposition,
            company_location: data.companylocation,
            annual_income: data.annualIncome,
        };

        // Show alert with all collected data
        alert(JSON.stringify(finalData, null, 2));

        try {
            // Send data to backend with proper headers
            const response = await axios.post(
                'http://127.0.0.1:8000/api/createmember/',
                finalData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            console.log(response.data); // Handle success response
            // Call onNext with the final data and navigate to summary
            onNext(finalData);
            navigate('/'); // Adjust the path as necessary
        } catch (error) {
            console.error('Error:', error.response?.data || error); // Log the exact error
            alert(JSON.stringify(error.response?.data || 'An error occurred while sending data.', null, 2)); // Display detailed error message
        }
    };

    return (
        <div className='form-container4'>
            <div className='form-box4'>
                <form className='personal-form' onSubmit={handleSubmit}> {/* Add form tag here */}
                    <h1 className='profh1'>Professional Details</h1>

                    {/* Job Role Input with Icon */}
                    <div className="input-container4">
                        <input type='text' name='jobrole' onChange={getData} placeholder="Job Role" required />
                        <FaBriefcase className="icon-prof" />
                    </div>

                    {/* Company Name Input with Icon */}
                    <div className="input-container4">
                        <input type='text' name='companyname' onChange={getData} placeholder="Company Name" required />
                        <FaBuilding className="icon-prof" />
                    </div>

                    {/* Company Location Input with Icon */}
                    <div className="input-container4">
                        <input type='text' name='companylocation' onChange={getData} placeholder="Company Location" required />
                        <FaMapMarkerAlt className="icon-prof" />
                    </div>

                    {/* Job Position Input with Icon */}
                    <div className="input-container4">
                        <input type='text' name='jobposition' onChange={getData} placeholder="Job Position" required />
                        <FaUserTie className="icon-prof" />
                    </div>

                    {/* Annual Income Input with Icon */}
                    <div className="input-container4">
                        <input type='number' name='annualIncome' onChange={getData} placeholder="Annual Income" required />
                        <FaMoneyBillWave className="icon-prof" />
                    </div>

                    <div className='form-actions4' style={{ marginTop: '20px' }}>
                        <button type="button" onClick={onPrevious} className='res2' style={{ marginRight: '10px' }}>Prev</button>
                        <button type="submit" className='res1'>Submit</button> {/* This triggers handleSubmit */}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Professional;