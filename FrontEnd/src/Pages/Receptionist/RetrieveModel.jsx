import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import axios from "axios";
import { ethers } from "ethers";
import {
  contractAddress,
  hospitalAddress,
  modelAddress,
  superuserAddress,
} from "../../Contracts/contractAddress";
import abi from "../../Contracts/hospital.json";
import modelabi from "../../Contracts/model.json";
import metaContext from "../../context/metaContext";
import FileSaver from "file-saver";
import { useLocation } from "react-router-dom";
import getContractInstance from "../../Contracts/ContractInstance";

const LatestHash = () => {
  const con = useContext(metaContext);
  // const [address, setAddress] = useState("");
  const [hospital, setHospital] = useState([]);
  const [index, setIndex] = useState(null);
  const [pending, setPending] = useState(true);
  const [selectedOption, setSelectedOption] = useState(0);
  const [ipfsHash, setipfsHash] = useState("");
  const [jsonHash, setjsonHash] = useState("");
  const location = useLocation();
  const [arr, setArr] = useState([]);
  const [switcher, setswitcher] = useState(false);

  let x = [];
  let version = 0;
  let fetch = false; // KHIZER : Kindly make this a useState Varaiable const[fetch,setfetch]=useState("false")
  let counter = 0;
  // const fetchAddress = async () => {
  //   await con.accountSet();
  //   setAddress(con.acn.address);
  // };

  // useEffect(() => {
  //   if (typeof window.ethereum !== "undefined") {
  //     fetchAddress();
  //   }
  // },[arr,switcher]);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      if(counter === 0)  
        getHospital();
      counter++;
    }
  }, []);

  const hexToDecimal = (hex) => parseInt(hex, 16);

  async function getModelVersion(z) {
    let contract = getContractInstance(modelabi, modelAddress);
    let tx;
    let tx2;

    try {
      console.log("I am Location", location.state, "\nI am Z", z);
      tx = await contract.registerLModel(location.state, z);
      console.log("Bool Value Recieved");
      if (tx) {
        tx2 = await contract.LVersion(location.state, z);
        version = hexToDecimal(tx2._hex);
        fetch = true; // KHIZER : setfetch(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  function populateArray(num) {
    for (let i = 0; i < num; i++) {
      x.push(i);
    }
    console.log("Array has been populated");
    setArr(x);
  }

  async function getHospital() {
    let contract = getContractInstance(abi, hospitalAddress);
    let tx;
    try {
      tx = await contract.getHospitals();
      // console.log("Hospital Address", tx[0].metamask);

      await getModelVersion(tx[0].metamask);
      console.log("I am first")
      // KHIZER : if(fetch) then run the populalte array function , this means we are checking if getModelVersion has retrieved total no of versions available
      if(fetch)
        populateArray(version);
      setswitcher(true);
      setIndex(tx[0].metamask);
      setHospital(tx);

      setPending(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSelect = async (event) => {
    console.log("i am pending", pending);
    if (pending) {
      // This checks if all hospitals are loaded into the hospital array
      setIndex(event.target.value);
      setswitcher(true);
      await getModelVersion(event.target.value);
      setTimeout(() => {
        if (fetch) {
          // This checks if we have retrieved number of versions avaolable of model of a particular hospital
          populateArray(version);
        }
      }, 0);
    }
  };

  const handleSelect2 = (event) => {
    setSelectedOption(event.target.value);
  };

  const getHash = async () => {
    let tx4, tx5, contract;
    contract = getContractInstance(modelabi, modelAddress);
    tx4 = await contract.getLocalIpfs(location.state, selectedOption, index);
    tx5 = await contract.getLocalJson(location.state, selectedOption, index);
    // console.log("Hashes Recieved")
    // console.log(tx4)
    setipfsHash(tx4);
    setjsonHash(tx5);
  };

  const downloadFileIpfs = () => {
    let ipfsi = "https://ipfs.io/ipfs/";
    let ipfs1 = ipfsi + ipfsHash;
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
    let ipfsi = "https://ipfs.io/ipfs/";
    jsonHash.trimStart();
    let ipfs = ipfsi + jsonHash;
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

  console.log(arr.length);
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 mb-10">
        <Sidebar />
        <div className="col-span-10">
          <div className="flex justify-center flex-col items-center space-y-20">
            <div className="bg-gradient-to-r from-gradx1 to-gradx2 text-cdwhite text-2xl mt-8 font-light mr-2 px-12 py-1 rounded-lg tracking-wider font-poppins">
              Download {location.state} Model
            </div>

            <div>
              <h1 className="text-white font-poppins text-2xl">
                Total Versions Available : {arr.length}
              </h1>

              <h1 className="text-white font-poppins text-2xl">
                Hospital Selected : {index}
              </h1>
            </div>
            {pending ? (
              <select onChange={handleSelect}>
                {hospital.map((num) => (
                  <option key={num} value={num.metamask}>
                    <label>Name : </label>
                    {num.name}
                  </option>
                ))}
              </select>
            ) : (
              <h1 className="text-white">Fetching Data</h1>
            )}
            {arr.length > 0 && switcher ? (
              <select onChange={handleSelect2}>
                {arr.map((num) => (
                  <option key={num} value={num}>
                    <label>Version : </label>
                    {num}
                  </option>
                ))}
              </select>
            ) : (
              ""
            )}
            <h1 className="text-white text-2xl font-poppins">
              Selected Version : {selectedOption}{" "}
            </h1>
            <div className="text-white" id="datadetails">
              <h1>IPFS Hash : {ipfsHash}</h1>
              <h1>JSON Hash : {jsonHash}</h1>
              {/*  */}
              <div className="datadetailssec2">
                <button
                  className="text-white bg-purple p-3 rounded-full"
                  id="btnsp1"
                  onClick={getHash}
                >
                  Get Hashes
                </button>
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
export default LatestHash;
