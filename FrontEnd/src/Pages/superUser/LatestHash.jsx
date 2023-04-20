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
import abi from "../../Contracts/superuser.json";
import metaContext from "../../context/metaContext";
import FileSaver from "file-saver";
import { useLocation } from "react-router-dom";
import getContractInstance from "../../Contracts/ContractInstance";

const LatestHash = () => {
  const con = useContext(metaContext);
  const [address, setAddress] = useState("");
  const [hospital, setHospital] = useState("");
  const [index, setIndex] = useState(0);
  const [pending, setPending] = useState(true);
  const [fetch, setfetch] = useState(false);
  const [recieved, setrecieved] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [ipfsHash, setipfsHash] = useState("");
  const [jsonHash, setjsonHash] = useState("");
  const location = useLocation();
  const [version, setversion] = useState(0);
  const [arr, setArr] = useState([]);
  let x = [];
  let y = [];

  const fetchAddress = async () => {
    await con.accountSet();
    setAddress(con.acn.address);
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      fetchAddress();
      getModelVersion();
      // populateDropDown();

      // getVersion();
    }
  },[version]);

  


  const hexToDecimal = (hex) => parseInt(hex, 16);

  async function getModelVersion() {
    let contract = getContractInstance(abi, superuserAddress);
    console.log(contract);

    let tx;
    try {
      tx = await contract.getVersion(location.state);
      console.log("version Recieved");
      console.log(tx);
      console.log(hexToDecimal(tx._hex));
      setversion(hexToDecimal(tx._hex));
      setfetch(true);
      if (fetch) {
        for (let i = 0; i < version; i++) {
          x.push(i);
        }
        console.log("Array has been populated");
        setArr(x);
        setPending(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSelect = (event) => {
    if (setPending) {
      setIndex(event.target.value);
    }
  };

  let tx2
  const getHash=async ()=>{
    let contract = getContractInstance(abi, superuserAddress);
    tx2 = await contract.retrieveGlobalModelHashes(location.state,index)
    console.log(location.state)
    console.log(index)
    console.log("Hashes Recieved")
    console.log(tx2)
    setipfsHash(tx2[0])
    setjsonHash(tx2[1])
  }

  const downloadFileIpfs = () => {
    let ipfsi = "https://ipfs.io/ipfs/";
    let ipfs1 = ipfsi + ipfsHash;
    console.log(ipfs1);
    console.log("Hello world bay");
    axios
      .get(ipfs1, {
        crossdomain: true, 
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
    var substring = jsonHash.slice(1);
    let ipfs = ipfsi + jsonHash;

    console.log(ipfs);
    console.log("Hello world json ");
    axios
      .get(ipfs, {
        crossdomain: true,
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
  console.log(arr.length)
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 mb-10">
        <Sidebar />
        <div className="col-span-10">
          <div className="flex justify-center flex-col items-center space-y-20">
            <div className="bg-gradient-to-r from-gradx1 to-gradx2 text-cdwhite text-2xl mt-8 font-light mr-2 px-12 py-1 rounded-lg tracking-wider font-poppins">
              Global {location.state} Model
            </div>

            <div>
              <h1 className="text-white font-poppins text-2xl">
                Total Versions Available : {version}
              </h1>
              <h1 className="text-white font-poppins text-2xl">
                Version Selected : {index}
              </h1>
            </div>
            {pending ? (
              <select onChange={handleSelect}>
                {arr.map((num) => (
                  <option key={num} value={num}>
                  <label>Version : </label>
                    {num}
                  </option>
                ))}
              </select>
            ) : (
              <h1 className="text-white">Fetching Data</h1>
            )}
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