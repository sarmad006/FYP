import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import axios from "axios";
import { modelAddress,hospitalAddress } from "../../Contracts/contractAddress";
import abi from "../../Contracts/model.json";
import hospitalabi from "../../Contracts/hospital.json";
import metaContext from "../../context/metaContext";
import FileSaver from "file-saver";
import { useLocation, useNavigate } from "react-router-dom";
import getContractInstance from "../../Contracts/ContractInstance";
import Loader from "../../Components/utils/Loader";
import {HiOutlineDownload} from "react-icons/hi"
import { toast } from "react-toastify";
import {AiOutlineEye} from "react-icons/ai"


const CustomModel = () => {
  const con = useContext(metaContext);
  const [address, setAddress] = useState(false);
  const [index, setIndex] = useState(0);
  const [isActive,setIsActive]=useState(false)
  const location = useLocation();
  const [version, setversion] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [modelExists,setmodelExist]=useState(false)
 
  const fetchAddress = async () => {
    await con.accountSet();
    setAddress(con.acn.address);
  };

  const createArray = (num) => {
    return new Array(num).fill(0);
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      fetchAddress()
      if (address) getModelVersion();
    }
  }, [address]);

  const hexToDecimal = (hex) => parseInt(hex, 16);

  async function getModelVersion() {
    let contract = getContractInstance(abi, modelAddress);

    let tx,tx2;
    try {
      tx2 = await contract.registerLModel(location.state, address);
      setmodelExist(tx2)
      tx = await contract.LVersion(location.state, address);
      console.log(hexToDecimal(tx._hex))
      setversion(hexToDecimal(tx._hex));
    } catch (error) {
      console.log(error);
    }
  }

  const handleSelect = (event) => {
      setIndex(event.target.value);
    
  };

  const getHash = async () => {
    setIsActive(true)
    let contract = getContractInstance(abi, modelAddress);
    
     const modelHash= await contract.getLocalIpfs(location.state, index, address);
    const JsonHash = await contract.getLocalJson(location.state, index, address);
    console.log(JsonHash)
    await downloadFile(modelHash,`${location.state}.pkl`)
    await downloadFile(JsonHash,`${location.state}.json`)
    setTimeout(()=>{
    setIsActive(false)
    },1000)
  };

  const getAccuracy = async () => {
    setIsActive(true)
    let contract2 = getContractInstance(hospitalabi,hospitalAddress)
    console.log(location.state,index)
    const inf = await contract2.getModelInfo(location.state,index)
    setAccuracy(hexToDecimal(inf[1]._hex))
    console.log("Accuracy",hexToDecimal(inf[1]._hex))
    console.log("Version ",hexToDecimal(inf[2]._hex))
    setTimeout(()=>{
      setIsActive(false)
      },1000)
  }

  const downloadFile = async(hash,name) => {
   await axios
      .get(`https://ipfs.io/ipfs/${hash}`, {
        responseType: "blob",
      })
      .then((response) => {
        FileSaver.saveAs(response.data, name);
      })
      .catch((error) => {
        toast.error("Error downloading files",{
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

  // const downloadFileJson = () => {
  //   let ipfsi = "https://ipfs.io/ipfs/";
  //   jsonHash.trimStart();
  //   var substring = jsonHash.slice(1);
  //   let ipfs = ipfsi + jsonHash;

  //   console.log(ipfs);
  //   console.log("Hello world json ");
  //   axios
  //     .get(ipfs, {
  //       responseType: "blob",
  //     })
  //     .then((response) => {
  //       FileSaver.saveAs(response.data, "jsonfile.json");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  

  // async function loader() {
  //   console.log("Loader Loaded");
  //   await fetchAddress();
  //   await getModelVersion();
  // }

  // window.onload = function () {
  //   var button = document.getElementById("myJogadroButton");
  //   console.log("I am clicked jogadro button");
  //   setTimeout(() => {
  //     button.click();
  //   }, 0);
  //   setTimeout(() => {
  //     button.click();
  //   }, 1000);
  //   setTimeout(() => {
  //     button.click();
  //   }, 2000);
  //   setTimeout(() => {
  //     button.click();
  //   }, 3000);
  // };

  // console.log(arr.length);

  return (
    <div>
        {isActive && <Loader isActive={isActive} />}
      <Navbar />
      <div className="grid grid-cols-12 mb-10">
        <Sidebar />
        <div className="col-span-10">
          <div className="flex justify-center flex-col items-center space-y-20">
            <div className="bg-gradient-to-r from-gradx1 to-gradx2 text-cdwhite text-2xl mt-8 font-medium mr-2 px-12 py-1 rounded-lg tracking-wider font-poppins">
              Local {location.state} Model
            </div>
            <div>
              <h1 className="text-white font-poppins text-2xl">
                Total Versions Available : {version}
              </h1>
              <h1 className="text-white font-poppins text-2xl">
                Version Selected : {version > 0 ? parseInt(index)+1 : "None"}
              </h1>
              <h1 className="text-white font-poppins text-2xl">
                Accuracy : {accuracy===0 ? "None" : accuracy}
              </h1>
            </div>
            {modelExists===false ? <p className="font-poppins text-red-500 text-xl">None</p> :(       
              <select onChange={handleSelect} className="block py-2.5 mb-6 px-0 w-40 text-center shadow-2xl focus:shadow-2xl text-md text-white bg-transparent border-2 rounded-lg border-purple appearance-none focus:outline-none">
                {createArray(version).map((num, index) => (
                  <option className="text-black" key={index} value={index}>
                   Version {index + 1}
                  </option>
               ))}
              </select>
            )}
              <div className="flex space-x-8">
              <button
                className="text-limgreen bg-transparent border-2 border-limgreen p-3 rounded-md shadow-xl w-60 font-poppins tracking-widest inline-flex items-center justify-center"
                onClick={getAccuracy}
              >
              <span className="mr-2">  View Accuracy </span>
                <AiOutlineEye fontSize={20}/>
              </button>
              <button
                className="text-purple bg-transparent border-2 border-purple p-3 rounded-md shadow-xl w-60 font-poppins tracking-widest inline-flex items-center justify-center"
                onClick={getHash}
              >
              <span className="mr-2">  Download File </span>
                <HiOutlineDownload/>
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CustomModel;
