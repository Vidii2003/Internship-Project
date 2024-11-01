import React, { useState } from 'react';
import AccountSetup from './accountsetup'; // Assuming you've already implemented this component
import PersonalInformation from './personalinformation';
import AddressForm from './AddressForm';
import Qualification from './qualification';
import Professional from './Professional';

const SetupWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    
    personalInfo: {},
    addressDetails: {},
    qualificationDetails: {},
    professionalDetails: {}
  });

  const handleNext = (data) => {
    // Update formData based on the current step
    switch (step) {
      case 1:
        setFormData((prevState) => ({
          ...prevState,
          accountDetails: data,
        }));
        break;
      case 2:
        setFormData((prevState) => ({
          ...prevState,
          personalInfo: data,
        }));
        break;
      case 3:
        setFormData((prevState) => ({
          ...prevState,
          addressDetails: data,
        }));
        break;
      case 4:
        setFormData((prevState) => ({
          ...prevState,
          qualificationDetails: data,
        }));
        break;
      case 5:
        setFormData((prevState) => ({
          ...prevState,
          professionalDetails: data,
        }));
        break;
      default:
        break;
    }

    // Move to the next step
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    const finalData = {
      ...formData.personalInfo,
      ...formData.addressDetails,
      ...formData.qualificationDetails,
      ...formData.professionalDetails
    };
    alert(JSON.stringify(finalData, null, 2));  // Show JSON in alert for checking
  };


  return (
    <div>
      {step === 1 && (
        <AccountSetup
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <PersonalInformation
          registeredMobile={formData.accountDetails.mobile || ''}
          countryCode={formData.accountDetails.countryCode || '+91'}
          mobile={formData.accountDetails.mobile || ''}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
      {step === 3 && (
        <AddressForm
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
      {step === 4 && (
        <Qualification
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
      {step === 5 && (
        <Professional
          onNext={handleSubmit}
          onPrevious={handlePrevious}
          formData={formData} // Pass collected data to Professional component
        />
      )}
    </div>
  );
};

export default SetupWizard;