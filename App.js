import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Personal from './mene2/personal';
import Qualification from './Qualification/qualification';
import Detail from './detail/Detail';
function App() {
  // const navigate = useNavigate();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Qualification/>}/>
          <Route path='/personal' element={<Personal/>}/>
          <Route path='/Detail' element={<Detail/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
