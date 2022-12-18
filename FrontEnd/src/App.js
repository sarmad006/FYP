import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Sidebar from './Components/Sidebar';
import Home from './Pages/Doctors/Home';
import Recommendation from './Pages/Doctors/Recommendation';
import Prediction from './Pages/Doctors/Prediction';
import SuperUser from './Pages/superUser/Home';
import RegisteredHospitals from './Pages/superUser/RegisteredHospitals';



function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<LandingPage/>}></Route>
    <Route path="/new" element={<Sidebar/>}></Route>
    <Route path="/doctor" element={<Home/>}></Route>
    <Route path="/recommendation" element={<Recommendation/>}></Route>
    <Route path="/prediction" element={<Prediction/>}></Route>
    <Route path='/superuser' element={<SuperUser/>}></Route>
    <Route path='/registeredhospital' element={<RegisteredHospitals/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
