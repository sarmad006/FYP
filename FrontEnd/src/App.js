import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Sidebar from './Components/Sidebar';
import Home from './Pages/Doctors/Home';
import Recommendation from './Pages/Doctors/Recommendation';



function App() {
  return (
      // @Sarmad add this in Route <RegisterComponent/>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<LandingPage/>}></Route>
    <Route path="/new" element={<Sidebar/>}></Route>
    <Route path="/doctor" element={<Home/>}></Route>
    <Route path="/recommendation" element={<Recommendation/>}></Route>
    <Route path="/" element={<RegisterComponent/>}></Route>
    <Route path="/prediction" element={<Prediction/>}></Route>
    <Route path='/superuser' element={<SuperUser/>}></Route>
    <Route path='/registeredhospital' element={<RegisteredHospitals/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
