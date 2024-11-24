import React, { useState } from 'react';
import AccountSetup from './accountsetup'; // Assuming you've already implemented this component
import PersonalInformation from './personalinformation';
import AddressForm from './AddressForm';
import Qualification from './qualification';
import Professional from './Professional';

const SetupWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    accountDetails: {},        // Data for Step 1
    personalInfo: {},          // Data for Step 2
    addressDetails: {},        // Data for Step 3
    qualificationDetails: {},  // Data for Step 4
    professionalDetails: {}    // Data for Step 5
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

 const handlePrevious = (currentData) => {
  // Update formData based on the current step before moving back
  switch (step) {
    case 2:
      setFormData((prevState) => ({
        ...prevState,
        personalInfo: currentData,
      }));
      break;
    case 3:
      setFormData((prevState) => ({
        ...prevState,
        addressDetails: currentData,
      }));
      break;
    case 4:
      setFormData((prevState) => ({
        ...prevState,
        qualificationDetails: currentData,
      }));
      break;
    case 5:
      setFormData((prevState) => ({
        ...prevState,
        professionalDetails: currentData,
      }));
      break;
    default:
      break;
  }

  // Move to the previous step
  setStep((prevStep) => prevStep - 1);
};


  const handleSubmit = () => {
    const finalData = {
      ...formData.accountDetails,
      ...formData.personalInfo,
      ...formData.addressDetails,
      ...formData.qualificationDetails,
      ...formData.professionalDetails
    };
    // alert(JSON.stringify(finalData, null, 2));  // Show JSON in alert for checking
  };

  return (
    <div>
      {step === 1 && (
        <AccountSetup
          onNext={handleNext}
          savedData={formData.accountDetails} // Pass saved data for Step 1
        />
      )}
      {step === 2 && (
        <PersonalInformation
          registeredMobile={formData.accountDetails.mobile || ''}
          countryCode={formData.accountDetails.countryCode || '+91'}
          mobile={formData.accountDetails.mobile || ''}
          onNext={handleNext}
          onPrevious={handlePrevious}
          savedData={formData.personalInfo} // Pass saved data for Step 2
        />
      )}
      {step === 3 && (
        <AddressForm
          onNext={handleNext}
          onPrevious={handlePrevious}
          savedData={formData.addressDetails} // Pass saved data for Step 3
        />
      )}
      {step === 4 && (
        <Qualification
          onNext={handleNext}
          onPrevious={handlePrevious}
          savedData={formData.qualificationDetails} // Pass saved data for Step 4
        />
      )}
      {step === 5 && (
        <Professional
          onNext={handleSubmit}
          onPrevious={handlePrevious}
          formData={formData}
          savedData={formData.professionalDetails} // Pass saved data for Step 5
        />
      )}
    </div>
  );
};

export default SetupWizard;