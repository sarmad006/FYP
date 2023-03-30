import React,{useContext,useEffect, useState} from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'
import {BsFileEarmarkTextFill} from 'react-icons/bs'
import {FiDownload} from 'react-icons/fi'
import axios from 'axios'
import { ethers } from "ethers";
import { contractAddress,hospitalAddress,modelAddress } from '../../Contracts/contractAddress'
import abi from '../../Contracts/hospital.json'
import mabi from '../../Contracts/model.json'
import metaContext from '../../context/metaContext'
import FileSaver from 'file-saver';
import { useLocation } from 'react-router-dom';



const LatestHash = () => {
    const con = useContext(metaContext);
    const [address,setAddress]=useState("");
    const [hospital,setHospital]=useState("");
    const [index,setIndex]=useState("");
    const [pending,setPending]=useState(true);
    const [fetch, setfetch]=useState(false);
    const [recieved, setrecieved]=useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [ipfsHash, setipfsHash] = useState("");
    const [jsonHash, setjsonHash] = useState("");
    const location= useLocation();
    const [version, setversion]=useState(0);
    let x = [];
    let y =[]

    const fetchAddress = async () => {
        await con.accountSet();
        setAddress(con.acn.address);
      };

      useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
          fetchAddress();
          getModel();
          console.log(location.state);
          
            // getVersion();
        
  
        }},[])

        const hexToDecimal = (hex) => parseInt(hex, 16);

    async function getModel(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const Contract = new ethers.Contract(
          hospitalAddress,
          abi,
          signer
        );
        console.log(Contract);
        let allHospitals;
        try {
            
            allHospitals= await Contract.getLatestHashes(location.state)
            setHospital(allHospitals);
            console.log(hospital[0])
            console.log(hospital[1])
            setipfsHash(hospital[0])
            setjsonHash(hospital[1])
           
          } catch (error) {
            console.log(error);
          }
    }
    
    


    

    
      

      const downloadFileIpfs = () => {
        let ipfsi = "https://gateway.pinata.cloud/ipfs/"
        let ipfs1 = ipfsi+ipfsHash;
        console.log(ipfs1);
        console.log("Hello world bay")
        axios.get(ipfs1, {
          responseType: 'blob',
        })
          .then(response => {
            FileSaver.saveAs(response.data, 'picklefile.pkl');
          })
          .catch(error => {
            console.log(error);
          });
      }

      const downloadFileJson = () => {
        let ipfsi = "https://gateway.pinata.cloud/ipfs/"
        jsonHash.trimStart();
        var substring = jsonHash.slice(1);
        let ipfs = ipfsi+jsonHash;
        

        console.log(ipfs);
        console.log("Hello world json ")
        axios.get(ipfs, {
          responseType: 'blob',
        })
          .then(response => {
            FileSaver.saveAs(response.data, 'jsonfile.json');
          })
          .catch(error => {
            console.log(error);
          });
      }

      function downloadFile(){
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
              Latest {location.state} Model
            </div>
           
            
            <div className="text-white" id ="datadetails">
              
              <h1>IPFS Hash : {ipfsHash}</h1>
              <h1>JSON Hash : {jsonHash}</h1>
              {/*  */}
              <div className='datadetailssec2'>
              <button className="text-white bg-purple p-3 rounded-full" id="btnsp1" onClick={getModel}>Get Hashes</button>
              
              </div>
              <button className="text-white bg-borderPurple p-3 rounded-full " onClick={downloadFile}>
                Download File
              </button>

            </div>
            
          </div>
      </div>
      </div>
      </div>
  )
}

export default LatestHash;