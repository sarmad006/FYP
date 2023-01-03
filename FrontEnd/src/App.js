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
import Receptionist from "./Pages/Receptionist/Home";
import { useContext, useEffect } from "react";
import metaContext from "./context/metaContext";
import Prediction from "./Pages/Doctors/Prediction";
import RegisteredHospitals from "./Pages/superUser/RegisteredHospitals";
import ModelReq from "./Pages/Receptionist/ModelReq";
import SuperUser from "./Pages/superUser/Home";
import ActiveModels from "./Pages/superUser/ActiveModels";
import PatientEntry from "./Pages/Receptionist/PatientEntry";
import Ratings from "./Pages/Receptionist/Ratings";
import Disease from "./Pages/superUser/Disease"
import AggregateModel from "./Pages/superUser/AggregateModel"

const getLibrary = (provider) => {
  return new Web3Provider(provider);
};

const ProtectedRoute = ({ redirectPath = '/',children }) => {
 const account=useContext(metaContext);
 console.log(account)
//  if(account.acn.address)
//  {
// return <Navigate to={redirectPath} replace/>
//  }
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
            <Route path="/superuser" element={<SuperUser/>}></Route>
            <Route path="/superuser/hospitals" element={<RegisteredHospitals/>}></Route>
            <Route path="/superuser/models" element={<ActiveModels/>}></Route>
            <Route path="/superuser/disease" element={<Disease/>}></Route>
            <Route path="/superuser/aggregate" element={<AggregateModel/>}></Route>
            <Route exact path="/recep" element={<Receptionist />}></Route>
            <Route path="recep/modelr" element={<ModelReq />}></Route>
            <Route path="recep/entry" element={<PatientEntry />}></Route>
            <Route path="recep/rating" element={<Ratings />}></Route>

            </Route>
          </Routes>
        </BrowserRouter>
      </MetaMask>
    </Web3ReactProvider>
  );
}

export default App;
