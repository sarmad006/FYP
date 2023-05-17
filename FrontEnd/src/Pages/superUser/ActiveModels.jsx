import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import React, { useState } from "react";
import axios from "axios";
import { modelAddress } from "../../Contracts/contractAddress";
import metaContext from "../../context/metaContext";
import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import abi  from "../../Contracts/model.json";
import { ethers } from "ethers";
import { useNavigate } from 'react-router-dom';


const ActiveModels = () => {


    const [models,setmodels]=useState([]);

    const con = useContext(metaContext);
    const [address, setAddress] = useState("");
    const [pending,setpending]= useState(true);

    useEffect(() => {
      if (typeof window.ethereum !== "undefined") {
        fetchAddress();
        getGlobalModels();
        setpending(false);
        console.log(models)
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

    async function getGlobalModels(){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Contract = new ethers.Contract(
      modelAddress,
      abi,
      signer
    );
    console.log(Contract);
    let tx;
    try{
      tx = await Contract.getModels()
      // console.log(tx);
      setmodels(tx);
      console.log(models)

    }catch(error) {
      console.log(error);
      console.log("failing ....")
    }
    }

    const navigate = useNavigate ();
    function handleClick(id) {
      navigate('/superuser/disease',{state:models[parseInt(id._hex)]})
    }

    function handleClick2(id) {
        navigate('/superuser/aggregate',{state:id})
    }

    function handleClick3(id) {
      navigate('/superuser/latest',{state:id})
  }

  


  return (
    <div>
    <Navbar />
    <div className="grid grid-cols-12 mb-10 ">
      <Sidebar />
      <div className="col-span-10 ml-8">
        <div id="Div1" className="flex justify-center mt-20">
          <h1 className="bg-gradient-to-r from-gradx1 to-gradx2 text-white text-3xl  font-poppins mr-2 py-1 px-8 rounded-2xl tracking-widest">
            Global Models 
          </h1>
        </div>
        {pending?(<h1>Fetching</h1>):(
        <div className="flex flex-col gap-y-4">

          {models.map((item) => (
            <div className="flex flex-row text-white justify-between  mt-4 py-4 px-16 rounded-xl Div2 font-poppins">
              <div key={models._id}>
                <h1 className="text-2xl">
                  <span className="tracking-widest ">
                    <strong>Name : </strong>
              </span>
                  <span className="tracking-widest">
                    {item.name} Disease 
                  </span> 
                </h1>
              </div>
              <div className="flex gap-x-12">
              <button className="bg-purple px-8 rounded-full text-black font-medium" onClick={()=>handleClick3(item.name)}>
                  Get Model
                </button>
                <button className="bg-limgreen px-8 rounded-full text-black font-medium" onClick={()=>handleClick2(item.name)}>
                  Aggregate
                </button>
                <button className="bg-purple px-8 rounded-full text-black font-medium" onClick={()=>{
                 navigate("/superuser/UpdateModel")                
                }}>
                  Update Model
                </button>
                {/* <button className="bg-slate-100 px-8 rounded-full text-black font-medium" onClick={()=>handleClick(item.id)}>
                  Details
                </button> */}
              </div>
            </div>
          ))}
        </div>)}
      </div>
    </div>
  </div>
  )
}

export default ActiveModels