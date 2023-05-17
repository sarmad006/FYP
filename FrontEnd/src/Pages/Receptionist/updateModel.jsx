import React from 'react'
import './UploadModel.css'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'
import "./home.css"
import {useState } from "react";
import axios from "axios";
import { hospitalAddress } from "../../Contracts/contractAddress";
import metaContext from "../../context/metaContext";
import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import abi  from "../../Contracts/hospital.json";
import { ethers } from "ethers";

const UpdateModel = () => {

    const API_KEY = "c303a8d05f40b047e81f";
    const API_Secret ="869916f5afead162492bf1d096a41082e189f911afc0e007b9f2feee7a56abc5";
    const [file,setFile] = useState("");
    const [file1,setFile1] = useState("");
    const [pending,setPending] = useState(true);
    const [modelHash,setModelHash] = useState("");
    const [jsonHash,setJsonHash] = useState("");
    const [formData, setFormData] = useState({
      name: "",
      accuracy: ""
    });
    const con = useContext(metaContext);
    const [address, setAddress] = useState("");

    useEffect(() => {
      if (typeof window.ethereum !== "undefined") {
        fetchAddress();
        window.ethereum.on("accountsChanged", function (accounts) {
          getAccount();
        });
        console.log("hello2345");
      }
    }, [address]);

    async function getAccount() {
      const accounts = await window.ethereum.enable();
      window.location.reload(false);
      // do something with new account here
    }
  
    const fetchAddress = async () => {
      await con.accountSet();
      console.log("Fetch Address");
      setAddress(con.acn.address);
    };

    async function uploadLModel(){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Contract = new ethers.Contract(
      hospitalAddress,
      abi,
      signer
    );
    console.log(Contract);
    let tx;
    try{
      tx = await Contract.updateModel(
        formData.name,
        modelHash,
        jsonHash,
        formData.accuracy
      )
      console.log(tx);

    }catch(error) {
      console.log(error);
      console.log("failing ....")
    }
    }

    const handleFileChange1 = (event) => {
      setFile(event.target.files[0]);
      console.log(event.target.files[0])
    };
    const handleFileChange2 = (event) => {
        setFile1(event.target.files[0]);
        console.log(event.target.files[0])
      };
  
    const handleUpload = async () => {
      sendModelFileToPinata(file);
      sendJsonFileToPinata(file1);        
    };

    function handleChange(e) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    console.log(formData);
  
    const sendModelFileToPinata = async (e) => {
        const formData = new FormData();
        formData.append('file', e);
      
        const url = 'https://ipfs.io/ipfs/';
        const options = {
          headers: {
            pinata_api_key: API_KEY,
            pinata_secret_api_key: API_Secret,
          },
        };
      
        try {
          const response = await axios.post(url, formData, options);
          setModelHash(response.data.IpfsHash)
          }
         catch (error) {
            console.log("error");
            console.log(error)
          console.log(e);
        }
      };
      const sendJsonFileToPinata = async (e) => {
        const formData = new FormData();
        formData.append('file', e);
      
        const url = 'https://ipfs.io/ipfs/';
        const options = {
          headers: {
            pinata_api_key: API_KEY,
            pinata_secret_api_key: API_Secret,
          },
        };
      
        try {
          const response = await axios.post(url, formData, options);
          setJsonHash(response.data.IpfsHash)
          }
         catch (error) {
            console.log("error");
            console.log(error)
          console.log(e);
        }
        setPending(false )
      };
      
      
    return (
    <div className="uploadModel">
        <Navbar/>
        <div className='grid grid-cols-12 mb-10 mt-20 mx-4'>
            <Sidebar/>
                    {pending?(<div className='col-span-10'>
                        <div className='uploadModelDiv'>
                        <h1 className="uploadModelh1_1">Update Your Model</h1>
                        <h1>{address}</h1>
                        <input type="file" accept=".pkl" name="fileToUpload" required className="uploadModelFileToUpload" onChange={handleFileChange1}></input>
                        <label htmlFor="">Please Upload Pickle File</label>
                        <input type="file" accept=".json" name="fileToUpload" required className="uploadModelFileToUpload" onChange={handleFileChange2}></input>
                        <label htmlFor="">Please Upload JSON File</label>
                        <input type="submit" value="Update Files" name="submit" id="uploadModelSubmit" onClick={handleUpload}></input>
                        </div>
                    </div>):(
                    <div className='col-span-10'>
                        <div className='uploadModelDiv'>
                        <h1 className="uploadModelh1_1">Enter Your Model Details:</h1><br /> 
                        <label htmlFor="">Model Name</label>
                        <input type="text" name="name" required className="uploadModelFileToUpload2" onChange={handleChange}></input>
                        <label htmlFor="">Accuracy</label>
                        <input type="number" name="accuracy" required className="uploadModelFileToUpload2" onChange={handleChange}></input>
                        <label htmlFor="">Model Hash</label>
                        <input type="text" required className="uploadModelFileToUpload2" defaultValue={modelHash} readOnly></input>
                        <label htmlFor="">JSON Hash</label>
                        <input type="text" required className="uploadModelFileToUpload2" defaultValue={jsonHash} readOnly></input>
                        <input type="submit" value="Send" name="submit" id="uploadModelSubmit" onClick={uploadLModel}></input>
                        </div>
                        
                    </div>)}
            </div>
        </div>
  )
}

export default UpdateModel;