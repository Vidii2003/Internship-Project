import React, { useState } from 'react';
import AccountSetup from './Register/accountsetup';
import PersonalInformation from './Register/personalinformation';

const App = () => {
  const [step, setStep] = useState(1); // Step 1 for AccountSetup, Step 2 for PersonalInformation

  const handleNext = () => {
    setStep(2); // Move to PersonalInformation page
  };

  const handlePrevious = () => {
    setStep(1); // Move back to AccountSetup page
  };

  return (
    
    <div>
      
      {step === 1 && <AccountSetup onNext={handleNext} />} {/* AccountSetup is shown when step is 1 */}
      {step === 2 && <PersonalInformation onNext={handleNext} onPrevious={handlePrevious} />} {/* PersonalInformation is shown when step is 2 */}
    </div>
  );
};

export default App;