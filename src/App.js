<<<<<<< HEAD
import Login from './Components/Pages/Login';
import AccountSetup from './Components/Register/accountsetup';
import PersonalInformation from './Components/Register/personalinformation';

const App = () => {
  const [step, setStep] = useState(1); // Step 1 for AccountSetup, Step 2 for PersonalInformation

  const handleNext = () => {
    setStep(2); // Move to PersonalInformation page
  };

  const handlePrevious = () => {
    setStep(1); // Move back to AccountSetup page
  };

function App() {
  return (
    <div>
      <Login/>

      <div>
      
      {step === 1 && <AccountSetup onNext={handleNext} />} {/* AccountSetup is shown when step is 1 */}
      {step === 2 && <PersonalInformation onNext={handleNext} onPrevious={handlePrevious} />} {/* PersonalInformation is shown when step is 2 */}
    </div>
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
>>>>>>> a927edd6745f7bc41ebd028361a1ac9c350b7007
    </div>
  );
}

export default App;
