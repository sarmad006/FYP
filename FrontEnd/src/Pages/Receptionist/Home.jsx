import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import "./home.css";
import { hospitalAddress } from "../../Contracts/contractAddress";
import metaContext from "../../context/metaContext";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import abi  from "../../Contracts/hospital.json";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import getContractInstance from "../../Contracts/ContractInstance";

const Receptionist = () => {
  const location=useLocation();
  const con = useContext(metaContext);
  const [address, setAddress] = useState("");
  const [info,setInfo] = useState("")
  const [number,setNumber] = useState("");
  const hexToDecimal = (hex) => parseInt(hex, 16);
  const userAddress=useSelector((state)=>state.user.value)
  
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      fetchAddress();
      getHospitalInfo();
      window.ethereum.on("accountsChanged", function (accounts) {
        getAccount();
      });
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
    const Contract=getContractInstance(abi,hospitalAddress)
    let tx;
    try {
      tx = await Contract.index(address);
      setNumber(hexToDecimal(tx._hex));

    } catch (error) {
      console.log(error);
    }
    let tx2;
    try {
      tx2 = await Contract.hospitals(tx);
      console.log(tx2)
      setInfo(tx2);

    } catch (error) {
      console.log(error);
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
                Hospital Detail <br />
            </h1>
          </div>
          <div className="flex justify-center my-12">
         <div className="w-5/12 justify  p-4 bg-transparent border-2 border-purple rounded-lg shadow-xl sm:p-6 md:p-8 ">
         <div className="flex gap-x-6 items-center justify-between">
            <label className="block  text-md font-medium text-gray-300 font-poppins">Hospital Name</label>
            <input type="text" class="bg-transparent border-b-2 border-borderPurple shadow-2xl text-white p-1.5 text-md font-poppins" readOnly defaultValue={info.name}/>
        </div>
        <div className="flex gap-x-6 items-center justify-between my-4">
            <label className="block  text-md font-medium text-gray-300 font-poppins">Email Address</label>
            <input type="text" class="bg-transparent border-b-2 border-borderPurple shadow-2xl text-white p-1.5 text-md font-poppins" readOnly defaultValue={info.email}/>
        </div>
        <div className="flex gap-x-6 items-center justify-between ">
            <label className="block  text-md font-medium text-gray-300 font-poppins">Phone Number</label>
            <input type="text" class="bg-transparent border-b-2 border-borderPurple shadow-2xl text-white p-1.5 text-md font-poppins" readOnly defaultValue={info.phone}/>
        </div>
        <div className="flex gap-x-6 items-center justify-between my-4">
            <label className="block  text-md font-medium text-gray-300 font-poppins">City Name</label>
            <input type="text" class="bg-transparent border-b-2 border-borderPurple shadow-2xl text-white p-1.5 text-md font-poppins" readOnly defaultValue={info.city}/>
        </div>
      </div>
         </div>

          
          
        </div>
      </div>
     </div>
  );
};

export default Receptionist;



