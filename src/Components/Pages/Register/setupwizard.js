// src/SetupWizard.js
import React, { useState } from 'react';
import AccountSetup from './accountsetup';
import PersonalInformation from './personalinformation';
import AddressForm from './AddressForm';
import Personal from './Professional';
import Qualification from './qualification';

const SetupWizard = () => {
  const [currentStep, setCurrentStep] = useState(1); // Step 1 is Account Setup

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      {currentStep === 1 && <AccountSetup onNext={handleNextStep} />}
      {currentStep === 2 && <PersonalInformation onNext={handleNextStep} onPrevious={handlePreviousStep} />}
      {currentStep === 3 && <AddressForm onPrevious={handlePreviousStep} onNext={handleNextStep} />}
      {currentStep === 4 && <Qualification onPrevious={handlePreviousStep} onNext={handleNextStep} />}
      {currentStep === 5 && <Personal onPrevious={handlePreviousStep} onNext={handleNextStep} />}
    </div>
  );
};

export default SetupWizard;
