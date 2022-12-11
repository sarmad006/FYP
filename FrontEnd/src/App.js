import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Sidebar from './Components/Sidebar';



function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<LandingPage/>}></Route>
    <Route path="/new" element={<Sidebar/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
