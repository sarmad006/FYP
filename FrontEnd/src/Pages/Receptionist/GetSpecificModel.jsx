import React,{useContext,useEffect, useState} from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'
import axios from 'axios'
import { superuserAddress } from "../../Contracts/contractAddress";
import abi from "../../Contracts/superuser.json";
import metaContext from '../../context/metaContext'
import FileSaver from 'file-saver';
import getContractInstance from "../../Contracts/ContractInstance";
import { useLocation } from 'react-router-dom';
import "./GetSpecificModel.css";
import Loader from "../../Components/utils/Loader";
import {HiOutlineDownload} from "react-icons/hi"
import { toast } from "react-toastify";

const GetSpecificModel = () => {
  const con = useContext(metaContext);
  const [address, setAddress] = useState(false);
  const [index, setIndex] = useState(0);
  const [isActive,setIsActive]=useState(false)
  const location = useLocation();
  const [version, setversion] = useState(0);
 
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
    let contract = getContractInstance(abi, superuserAddress);

    let tx;
    try {
      tx = await contract.getVersion(location.state);
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
    let contract = getContractInstance(abi, superuserAddress);
     const Hash= await contract.retrieveGlobalModelHashes(location.state,index);
     await downloadFile(Hash[0],`${location.state}.pkl`)
     await downloadFile(Hash[1],`${location.state}.json`)
    setTimeout(()=>{
    setIsActive(false)
    },1000)
  };

  const downloadFile = async(hash,name) => {
    console.log("Recieved hash : ",hash)
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
  return (
    <div>
    {isActive && <Loader isActive={isActive} />}
<Navbar />
<div className="grid grid-cols-12 mb-10">
  <Sidebar />
  <div className="col-span-10">
    <div className="flex justify-center flex-col items-center space-y-20">
      <div className="bg-gradient-to-r from-gradx1 to-gradx2 text-cdwhite text-2xl mt-8 font-medium mr-2 px-12 py-1 rounded-lg tracking-wider font-poppins">
        Global {location.state} Model
      </div>
      <div>
        <h1 className="text-white font-poppins text-2xl">
          Total Versions Available : {version}
        </h1>
        <h1 className="text-white font-poppins text-2xl">
          Version Selected : {parseInt(index)+1}
        </h1>
      </div>
        <select onChange={handleSelect} className="block py-2.5 mb-6 px-0 w-40 text-center shadow-2xl focus:shadow-2xl text-md text-white bg-transparent border-2 rounded-lg border-purple appearance-none focus:outline-none">
          {createArray(version).map((num, index) => (
            <option className="text-black" key={index} value={index}>
             Version {index + 1}
            </option>
         ))}
        </select>
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
  )
}

export default GetSpecificModel;