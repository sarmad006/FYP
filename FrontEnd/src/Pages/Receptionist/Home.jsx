import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import "./home.css";
import { hospitalAddress } from "../../Contracts/contractAddress";
import metaContext from "../../context/metaContext";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import abi  from "../../Contracts/hospital.json";
import axios from "axios";
import { ethers } from "ethers";

const Receptionist = () => {
  const location=useLocation();
  const con = useContext(metaContext);
  const [address, setAddress] = useState("");
  const [info,setInfo] = useState("")
  const [number,setNumber] = useState("");
  const hexToDecimal = (hex) => parseInt(hex, 16);
  
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      fetchAddress();
      getHospitalInfo();
      window.ethereum.on("accountsChanged", function (accounts) {
        getAccount();
      });
      console.log("hello2345");
    }
  }, [address]);

  async function getAccount() {
    const accounts = await window.ethereum.enable();
    window.location.reload(false);
    // do something with new account here
  }

  const fetchAddress = async () => {
    await con.accountSet();
    console.log("Fetch Address");
    setAddress(con.acn.address);
  };

  async function getHospitalInfo() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Contract = new ethers.Contract(
      hospitalAddress,
      abi,
      signer
    );
    console.log(Contract);
    let tx;
    try {
      console.log(address)
      tx = await Contract.index(address);
      console.log(hexToDecimal(tx._hex));
      setNumber(hexToDecimal(tx._hex));

    } catch (error) {
      console.log(error);
      console.log("failing ....")
    }
    let tx2;
    try {
      tx2 = await Contract.hospitals(tx);
      console.log(tx2);
      setInfo(tx2);

    } catch (error) {
      console.log(error);
      console.log("failing ....")
    }
  }


  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 mb-10">
        <Sidebar />
        <div className="col-span-10">
          <div className="flex justify-center mt-20">
            <h1 className="bg-gradient-to-r from-gradx1 to-gradx2 text-white text-3xl mt-8 font-poppins font-bold mr-2 py-1 px-10 rounded-2xl tracking-widest">
                Hospital : {info.name} <br />
            </h1>
          </div>
          <div>
            <h1 className="text-white font-poppins Box2 flex flex-col items-center">Details</h1>
          </div>
          <div id="hospitalInfo" className="text-white font-poppins Box flex flex-col items-center">
                Email : {info.email} <br />
                Phone : {info.phone} <br />
                City : {info.city}
          </div>
          <img id="homesvg" src="./image/line.svg" style={{ height: "120px", width: "550px" }} alt="MetaMask pic 2"/>
          
        </div>
      </div>
     </div>
  );
};

export default Receptionist;



