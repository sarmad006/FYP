import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Sidebar from './Components/Sidebar';
import Home from './Pages/Doctors/Home';
import Recommendation from './Pages/Doctors/Recommendation';



function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<LandingPage/>}></Route>
    <Route path="/new" element={<Sidebar/>}></Route>
    <Route path="/doctor" element={<Home/>}></Route>
    <Route path="/recommendation" element={<Recommendation/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
