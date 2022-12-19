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

const getLibrary = (provider) => {
  return new Web3Provider(provider);
};

function App() {
  return (
    // @Sarmad add this in Route <RegisterComponent/>
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/new" element={<Sidebar />}></Route>
          <Route path="/doctor" element={<Home />}></Route>
          <Route path="/recommendation" element={<Recommendation />}></Route>
          <Route path="/reg" element={<RegisterComponent />}></Route>
          <Route path="/thnx" element={<Thankyou />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </Web3ReactProvider>
  );
}

export default App;
