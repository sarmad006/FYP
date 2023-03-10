import React from 'react'
import './UploadModel.css'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'
import "./home.css"
import {useState } from "react";
import axios from "axios";


const UploadModel = () => {

    const API_KEY = "c303a8d05f40b047e81f";
    const API_Secret ="869916f5afead162492bf1d096a41082e189f911afc0e007b9f2feee7a56abc5";
    const [file,setFile] = useState("");
    const [file1,setFile1] = useState("");

    const handleFileChange1 = (event) => {
      setFile(event.target.files[0]);
      console.log(event.target.files[0])
    };
    const handleFileChange2 = (event) => {
        setFile1(event.target.files[0]);
        console.log(event.target.files[0])
      };
  
    const handleUpload = async () => {
      sendFileToPinata(file);
      setTimeout(() => {
        sendFileToPinata(file1);  
      }, 2000);
      
    };
  

    const sendFileToPinata = async (e) => {
        const formData = new FormData();
        formData.append('file', e);
      
        const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
        const options = {
          headers: {
            pinata_api_key: API_KEY,
            pinata_secret_api_key: API_Secret,
          },
        };
      
        try {
          const response = await axios.post(url, formData, options);
          console.log(e);
          console.log(response.data);
          console.log(response.data.IpfsHash)
        } catch (error) {
            console.log("error");
            console.log(error)
          console.log(e);
        }
      };
      
      
    return (
    <div className="uploadModel">
        <Navbar/>
        <div className='grid grid-cols-12 mb-10 mt-20 mx-4'>
            <Sidebar/>
                    <div className='col-span-10'>
                        <div className='uploadModelDiv'>
                        <h1 className="uploadModelh1_1">Upload Your File</h1>
                        <input type="file" accept=".pkl" name="fileToUpload" required className="uploadModelFileToUpload" onChange={handleFileChange1}></input>
                        <label htmlFor="">Please Upload Pickle File</label>
                        <input type="file" accept=".json" name="fileToUpload" required className="uploadModelFileToUpload" onChange={handleFileChange2}></input>
                        <label htmlFor="">Please Upload JSON File</label>
                        <input type="submit" value="Upload File" name="submit" id="uploadModelSubmit" onClick={handleUpload}></input>
                        </div>
                    </div>
            </div>
        </div>
  )
}

export default UploadModel;









