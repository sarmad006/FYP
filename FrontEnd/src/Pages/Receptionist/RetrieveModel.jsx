import React,{useContext,useEffect, useState} from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'
import {BsFileEarmarkTextFill} from 'react-icons/bs'
import {FiDownload} from 'react-icons/fi'
import axios from 'axios'
import { ethers } from "ethers";
import { contractAddress } from '../../Contracts/contractAddress'
import abi from '../../Contracts/abi.json'
import metaContext from '../../context/metaContext'
import FileSaver from 'file-saver';

const RetrieveModel = () => {
    const con = useContext(metaContext);
    const [address,setAddress]=useState("")
    const [hospital,setHospital]=useState([])
    const [index,setIndex]=useState("")
    const [pending,setPending]=useState(true)
    const fetchAddress = async () => {
        await con.accountSet();
        setAddress(con.acn.address);
      };

      useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
          fetchAddress();
        }},[])

        const hexToDecimal = (hex) => parseInt(hex, 16);

    const getModel=async()=>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const Contract = new ethers.Contract(
         contractAddress,
          abi,
          signer
        );
        let tx;
        console.log("Connected")
       
        try {
            
            tx = await Contract.getIndex(address);
            console.log(hexToDecimal(tx._hex));
            setIndex(hexToDecimal(tx._hex));
            let allHospitals= await Contract.getHospitals()
            setHospital(allHospitals);
            setPending(false);
            console.log(allHospitals[parseInt(tx._hex)])
          } catch (error) {
            console.log(error);
          }

    }
    
      const ipfs ="QmbQMKw9VojdxRW4Dnd2s6gAqRaBsrbcNQDHvMbaGhsnUf"

      const downloadFile = () => {
        axios.get(`https://gateway.pinata.cloud/ipfs/QmbQMKw9VojdxRW4Dnd2s6gAqRaBsrbcNQDHvMbaGhsnUf`, {
          responseType: 'blob',
        })
          .then(response => {
            FileSaver.saveAs(response.data, 'filename.json');
          })
          .catch(error => {
            console.log(error);
          });
      }
    

  return (
    <div>
    <Navbar />
    <div className="grid grid-cols-12 mb-10">
      <Sidebar />
      <div className="col-span-10">
          <div className="flex justify-center flex-col items-center space-y-40">
            <div className="bg-gradient-to-r from-gradx1 to-gradx2 text-cdwhite text-2xl mt-8 font-light mr-2 px-12 py-1 rounded-lg tracking-wider font-poppins">
              Available Models
            </div>
            <div className="text-white">
              <h1>IPFS Hash : {ipfs}</h1>
              <button onClick={getModel}>Get INDEX {address}</button>
              {pending?(<h1>Fetching Data</h1>):(<h1>{hospital[index].name}</h1>)}
            </div>
            <button className="text-white bg-borderPurple p-3 rounded-full " onClick={downloadFile}>
      Download File
    </button>
          </div>
      </div>
      </div>
      </div>
  )
}

export default RetrieveModel;