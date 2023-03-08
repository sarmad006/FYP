import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar";
import Registered from "../../Components/SuperUsers/RegisteredHospitals/Registered";
import metaContext from "../../context/metaContext";
import { useContext, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import abi from '../../Contracts/abi.json'

const RegisteredHospitals = () => {
  const [add, setAdd] = useState("");
  const [regHospitals, setRegHospital] = useState([]);
  const con = useContext(metaContext);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      fetchAddress();
      getHospital();
      window.ethereum.on("accountsChanged", function (accounts) {
        getAccount();
      });
      console.log("hello");
    }
  }, [add]);

  const fetchAddress = async () => {
    await con.accountSet();
    setAdd(con.acn.address);
  };

  async function getAccount() {
    const accounts = await window.ethereum.enable();
    window.location.reload(false);
    // do something with new account here
  }
  async function getHospital() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Contract = new ethers.Contract(
      "0x850b6847086159d5d9031cD9ee41e4872557ef47",
      abi,
      signer
    );
    console.log(Contract);
    let tx;
    try {
      tx = await Contract.getHospitals();
      console.log(tx);
      setRegHospital(tx);
    } catch (error) {
      console.log(error);
    }
  }

  const [RegisteredH, setRegisteredH] = useState([
    {
      name: "AKU Hospital",
      location: "Karachi",
    },
    {
      name: "Liaquat Hospital",
      location: "Karachi",
    },
    {
      name: "Bloomsbury Hospital",
      location: "London",
    },
    {
      name: "SKMH",
      location: "Lahore",
    },
    {
      name: "Lincoln Hospital",
      location: "NewYork",
    },
  ]);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 ">
        <Sidebar />

        <div className="col-span-10 px-4 mb-8">
          <div className="flex justify-center mt-6 mb-10">
            <h1 className="bg-indigo-300  text-white text-3xl font-thin font-poppins py-1.5 px-5 rounded-3xl tracking-widest">
              Registered Hospitals
            </h1>
          </div>
          <div className="flex flex-col gap-y-10 ">
            {regHospitals.map((hospital) => (
              <Registered name={hospital.name} location={hospital.city} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredHospitals;
