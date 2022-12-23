import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Doctors/Home";
import Recommendation from "./Pages/Doctors/Recommendation";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import RegisterComponent from "./Components/LandingPage/register";
import Thankyou from "./Components/LandingPage/Thankyou";
import About from "./Components/LandingPage/About";
import Demo from "./context/Demo";
import MetaMask from "./context/Metamask";
import Login from "./Components/LandingPage/Login";
import Receptionist from "./Pages/Receptionist/Home";

const getLibrary = (provider) => {
  return new Web3Provider(provider);
};

function App() {
  return (
    // @Sarmad add this in Route <RegisterComponent/>
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMask>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/new" element={<Sidebar />}></Route>
            <Route path="/doctor" element={<Home />}></Route>
            <Route path="/recommendation" element={<Recommendation />}></Route>
            <Route path="/reg" element={<RegisterComponent />}></Route>
            <Route path="/thnx" element={<Thankyou />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/demo" element={<Demo />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/recep" element={<Receptionist />}></Route> Receptionist

          </Routes>
        </BrowserRouter>
      </MetaMask>
    </Web3ReactProvider>
  );
}

export default App;
