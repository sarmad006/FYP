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
    const fetchAddress = async () => {
        await con.accountSet();
        setAddress(con.acn.address);
      };

      useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
          fetchAddress();
        }},[])

    

    const getModel=async()=>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const Contract = new ethers.Contract(
         contractAddress,
          abi,
          signer
        );
        let tx;
       
        try {
            tx = await Contract.getIndex(address);
            console.log(tx._hex);
            let allHospitals= await Contract.getHospitals()
            console.log(allHospitals[parseInt(tx._hex)])
          } catch (error) {
            console.log(error);
          }

    }
    

    
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
            <div className="bg-gradient-to-r from-gradx1 to-gradx2 text-white text-2xl mt-8 font-light mr-2 px-12 py-1 rounded-lg tracking-wider font-poppins">
              Available Models
            </div>
            <button onClick={downloadFile}>
      Download File
    </button>
          </div>
      </div>
      </div>
      </div>
  )
}

export default RetrieveModel;