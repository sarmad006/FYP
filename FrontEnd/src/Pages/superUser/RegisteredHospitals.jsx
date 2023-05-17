import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar";
import Registered from "../../Components/SuperUsers/RegisteredHospitals/Registered";
import metaContext from "../../context/metaContext";
import { useContext, useEffect } from "react";
import abi from "../../Contracts/hospital.json";
import { hospitalAddress } from "../../Contracts/contractAddress";
import getContractInstance from "../../Contracts/ContractInstance";

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
    const Contract = getContractInstance(abi, hospitalAddress);
    console.log(Contract);
    let tx;
    try {
      console.log(add);
      tx = await Contract.getHospitals();
      console.log(tx);
      setRegHospital(tx);
    } catch (error) {
      console.log(error);
      console.log("failing ....");
    }
  }

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 ">
        <Sidebar />

        <div className="col-span-10 px-4 mb-8 ml-8">
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
          <div>{/* {regHospitals} */}</div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredHospitals;
