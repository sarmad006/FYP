import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import axios from "axios";
import { modelAddress, hospitalAddress } from "../../Contracts/contractAddress";
import abi from "../../Contracts/hospital.json";
import modelabi from "../../Contracts/model.json";
import metaContext from "../../context/metaContext";
import FileSaver from "file-saver";
import { useLocation } from "react-router-dom";
import getContractInstance from "../../Contracts/ContractInstance";
import Loader from "../../Components/utils/Loader";
import { HiOutlineDownload } from "react-icons/hi";
import { toast } from "react-toastify";

const AggregateModel = () => {
  const con = useContext(metaContext);
  const [isActive, setActive] = useState(false);
  const [hospital, setHospital] = useState([]);
  const [selectedHospital, setselectedHospital] = useState({});
  const [selectedOption, setSelectedOption] = useState(0);
  const location = useLocation();
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      getHospital();
    }
  }, []);

  const hexToDecimal = (hex) => parseInt(hex, 16);

  async function getModelVersion(z) {
    let contract = getContractInstance(modelabi, modelAddress);
    let tx;
    let tx2;

    try {
      tx = await contract.registerLModel(location.state, z);
      tx2 = await contract.LVersion(location.state, z);
      setVersion(hexToDecimal(tx2._hex));
    } catch (error) {
      console.log(error);
    }
  }
  const createArray = (num) => {
    return new Array(num).fill(0);
  };

  async function getHospital() {
    setActive(true);
    let contract = getContractInstance(abi, hospitalAddress);
    let tx;
    try {
      tx = await contract.getHospitals();
      await getModelVersion(tx[0].metamask);
      setselectedHospital(tx[0].metamask);
      setHospital(tx);
    } catch (error) {
      console.log(error);
    } finally {
      setActive(false);
    }
  }

  const handleSelect = async (event) => {
    setActive(true);
    setselectedHospital(event.target.value);
    await getModelVersion(event.target.value);
    setTimeout(() => {
      setActive(false);
    }, 3000);
  };

  const handleVersions = (e) => {
    setSelectedOption(e.target.value);
  };

  const getHash = async (e) => {
    setActive(true);
    let tx4, tx5, contract;
    contract = getContractInstance(modelabi, modelAddress);
    tx4 = await contract.getLocalIpfs(
      location.state,
      selectedOption,
      selectedHospital
    );
    tx5 = await contract.getLocalJson(
      location.state,
      selectedOption,
      selectedHospital
    );
    downloadFile(tx4, `${location.state}.pkl`);
    downloadFile(tx5, `${location.state}.json`);
    setActive(false);
  };

  const downloadFile = (hash, name) => {
    axios
      .get(`https://ipfs.io/ipfs/${hash}`, {
        responseType: "blob",
      })
      .then((response) => {
        FileSaver.saveAs(response.data, name);
      })
      .catch((error) => {
        toast.error("Error downloading files", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      });
  };

  return (
    <div>
      {isActive && <Loader isActive={isActive} />}
      <Navbar />
      <div className="grid grid-cols-12 mb-10">
        <Sidebar />
        <div className="col-span-10">
          <div className="flex justify-center flex-col items-center space-y-8">
            <div className="bg-gradient-to-r from-gradx1 to-gradx2 text-cdwhite text-2xl mt-8 mb-4 font-medium mr-2 px-12 py-1 rounded-lg tracking-wider font-poppins">
              Global {location.state} Model
            </div>

            <div>
              <h1 className="text-white font-poppins text-2xl">
                Hospitals Participated : {hospital.length}
              </h1>
            </div>
            <div className="flex space-y-4 items-center flex-col">
              <label className="text-white font-poppins text-xl border-b-2 border-limgreen">
                Hospital
              </label>
              <select
                onChange={handleSelect}
                className="block py-2.5 mb-6 px-0 w-40 text-center shadow-2xl focus:shadow-2xl text-md text-white bg-transparent border-2 rounded-lg border-purple appearance-none focus:outline-none"
              >
                {hospital.map((num) => (
                  <option className="text-black" key={num} value={num.metamask}>
                    {num.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-y-4 items-center flex-col py-3">
              <label className="text-white font-poppins text-xl border-b-2 border-limgreen">
                Versions
              </label>
              <select
                onChange={handleVersions}
                className="block py-2.5 mb-6 px-0 w-40 text-center shadow-2xl focus:shadow-2xl text-md text-white bg-transparent border-2 rounded-lg border-purple appearance-none focus:outline-none"
              >
                {createArray(version).map((num, index) => (
                  <option className="text-black" key={index} value={index}>
                    Version {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="text-purple bg-transparent border-2 border-purple p-3 rounded-md shadow-xl w-60 font-poppins tracking-widest inline-flex items-center justify-center"
              onClick={getHash}
            >
              <span className="mr-2"> Download File </span>
              <HiOutlineDownload />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AggregateModel;
