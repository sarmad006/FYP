import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import axios from "axios";
import { ethers } from "ethers";
import { hospitalAddress, modelAddress } from "../../Contracts/contractAddress";
import abi from "../../Contracts/hospital.json";
import mabi from "../../Contracts/model.json";
import metaContext from "../../context/metaContext";
import FileSaver from "file-saver";
import { useLocation } from "react-router-dom";
import "./RetrieveModel.css";
import getContractInstance from "../../Contracts/ContractInstance";

const RetrieveModel = () => {
  const con = useContext(metaContext);
  const [address, setAddress] = useState("");
  const [hospital, setHospital] = useState("");
  const [index, setIndex] = useState("");
  const [pending, setPending] = useState(true);
  const [fetch, setfetch] = useState(false);
  const [recieved, setrecieved] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [ipfsHash, setipfsHash] = useState("");
  const [jsonHash, setjsonHash] = useState("");
  const location = useLocation();
  const [version, setversion] = useState(0);
  let x = [];
  let y = [];

  const fetchAddress = async () => {
    await con.accountSet();
    setAddress(con.acn.address);
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      fetchAddress();
      getModel();
      // getVersion();
    }
  }, []);

  const hexToDecimal = (hex) => parseInt(hex, 16);

  async function getModel() {
    const Contract = getContractInstance(abi, hospitalAddress);
    console.log(Contract);
    let allHospitals;
    try {
      allHospitals = await Contract.getHospitals();
      console.log(allHospitals);
      allHospitals = allHospitals.filter((item) => item.metamask === address);
      console.log(allHospitals);
      // setHospital(allHospitals);
      // if (hospital.length > 0) {
      //   for (let index = 0; index < hospital.length; index++) {
      //     x.push(hospital[index].name);
      //   }
      //   for (let index = 0; index < hospital.length; index++) {
      //     console.log(x[index]);
      //   }
      //   setfetch(true);
      // }
    } catch (error) {
      console.log(error);
    }
  }
  async function getVersion() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Contract2 = new ethers.Contract(modelAddress, mabi, signer);
    console.log("Connected to 2 contract");
    console.log(Contract2);
    let tx2;
    try {
      if (setfetch) {
        tx2 = await Contract2.LVersion(location.state, selectedOption);
        console.log("got the Version");
        console.log(tx2);
        setversion(parseInt(tx2._hex) - 1);
        console.log(version);
      }
    } catch (error) {}
  }

  async function getHash() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Contract3 = new ethers.Contract(modelAddress, mabi, signer);

    console.log(Contract3);
    console.log("Connected to 3 contract");
    let tx3;
    let tx4;
    try {
      console.log("Connected to 4 contract");
      if (setfetch && recieved) {
        console.log("Connected to 5 contract");
        tx3 = await Contract3.LModel(selectedOption, location.state, version);
        console.log("got the hash");
        console.log(tx3);
        // tx4 = await Contract3.getLJson(location.state)
        // console.log(selectedOption)
        // console.log(version)
        console.log(tx3);
        console.log("got the Jsonhash");
        // console.log(tx4)
        setipfsHash(tx3.ipfsHash);
        setjsonHash(tx3.jsonHash);
        console.log(ipfsHash);
        console.log(jsonHash);
        // setjsonHash(tx4);
      }
    } catch (error) {}
  }

  const handleChange = (event) => {
    // console.log(event.target.value);
    setSelectedOption(event.target.value);
    console.log(selectedOption);
    getVersion();
    console.log(version);
    setrecieved(true);
  };

  const ipfs = "";

  const downloadFileIpfs = () => {
    let ipfsi = "https://gateway.pinata.cloud/ipfs/";
    let ipfs1 = ipfsi + ipfsHash;
    console.log(ipfs1);
    console.log("Hello world bay");
    axios
      .get(ipfs1, {
        responseType: "blob",
      })
      .then((response) => {
        FileSaver.saveAs(response.data, "picklefile.pkl");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadFileJson = () => {
    let ipfsi = "https://gateway.pinata.cloud/ipfs/";
    jsonHash.trimStart();
    let substring = jsonHash.slice(1);
    let ipfs = ipfsi + substring;
    console.log(ipfs);
    console.log("Hello world json ");
    axios
      .get(ipfs, {
        responseType: "blob",
      })
      .then((response) => {
        FileSaver.saveAs(response.data, "jsonfile.json");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function downloadFile() {
    downloadFileIpfs();
    downloadFileJson();
  }

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 mb-10">
        <Sidebar />
        <div className="col-span-10">
          <div className="flex justify-center flex-col items-center space-y-20">
            <div className="bg-gradient-to-r from-gradx1 to-gradx2 text-cdwhite text-2xl mt-8 font-light mr-2 px-12 py-1 rounded-lg tracking-wider font-poppins">
              {location.state} Model Aggregation
            </div>
            <div className="text-white" id="datadetails">
              <h1>Version : {version}</h1>
              <h1>IPFS Hash : {ipfsHash}</h1>
              <h1>JSON Hash : {jsonHash}</h1>
              {/*  */}
              <div className="datadetailssec2">
                <button
                  className="text-white bg-purple p-3 rounded-full"
                  id="btnsp1"
                  onClick={getModel}
                >
                  Get INDEX
                </button>
                <button
                  className="text-white bg-borderPurple p-3 rounded-full"
                  id="btnsp2"
                  onClick={() => getHash()}
                >
                  Check Hash
                </button>
              </div>
              <div className="selectoptionspd">
                {fetch ? (
                  <select onChange={handleChange} value={selectedOption}>
                    <option value="">Select an option</option>
                    {hospital.map((option) => (
                      <option key={option} value={option.metamask}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <h1>Not</h1>
                )}
                <h1 className="text-white mt-2">{selectedOption}</h1>
              </div>
              <button
                className="text-white bg-borderPurple p-3 rounded-full "
                onClick={downloadFile}
              >
                Download File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetrieveModel;
