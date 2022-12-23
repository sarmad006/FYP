import "./App.css";
import { BrowserRouter, Routes, Route,Navigate,Outlet } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Doctors/Home";
import Recommendation from "./Pages/Doctors/Recommendation";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import RegisterComponent from "./Components/LandingPage/register";
import Thankyou from "./Components/LandingPage/Thankyou";
import About from "./Components/LandingPage/About";
import MetaMask from "./context/Metamask";
import Login from "./Components/LandingPage/Login";
import { useContext, useEffect } from "react";
import metaContext from "./context/metaContext";
import Prediction from "./Pages/Doctors/Prediction";
import RegisteredHospitals from "./Pages/superUser/RegisteredHospitals";

const getLibrary = (provider) => {
  return new Web3Provider(provider);
};

const ProtectedRoute = ({ redirectPath = '/',children }) => {
 const account=useContext(metaContext);
 console.log(account)
 if(account.acn.address)
 {
return <Navigate to={redirectPath} replace/>
 }
  return children?children:<Outlet/>;
};

function App() {
  

    

  return (
    // @Sarmad add this in Route <RegisterComponent/>
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMask>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/reg" element={<RegisterComponent />}></Route>
            <Route path="/thanks" element={<Thankyou />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login />}></Route>
            {/* Only Authenticated Routes goes here */}
            <Route element={<ProtectedRoute/>}>
            <Route path="/doctor" element={<Home/>}></Route>
            <Route path="/doctor/recommendation" element={<Recommendation/>}></Route>
            <Route path="/doctor/prediction" element={<Prediction/>}></Route>
            <Route path="/superuser/hospitals" element={<RegisteredHospitals/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MetaMask>
    </Web3ReactProvider>
  );
}

export default App;
