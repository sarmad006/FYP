import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import React, { useState } from "react";
import { modelAddress } from "../../Contracts/contractAddress";
import metaContext from "../../context/metaContext";
import { useContext, useEffect } from "react";
import abi  from "../../Contracts/model.json";
import { ethers } from "ethers";
import { useNavigate } from 'react-router-dom';
import UploadModal from "../../Components/receptionist/Modals/UploadModal";
import { useSelector } from "react-redux";


const ActiveModelsHospital = () => {
    const [models,setmodels]=useState([]);
    const[UpdateModal,setUpdateModal]=useState(false)
    const [selectedModel,setSelectedModel]=useState(false)
    const con = useContext(metaContext);
    const [address, setAddress] = useState("");
    const [pending,setpending]= useState(true);
    const userAddress=useSelector((state)=>state.user.value)
    console.log(userAddress)

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
        navigate('/recep/retrieveModel',{state:id})
    }

    function handleClick3(id) {
      navigate("/recep/CustomModel",{state:id})
  }
  function handleClick4(id) {
    navigate("/recep/GetGModel",{state:id})
}
  


  return (
    <div>
      {UpdateModal && <UploadModal setIsActive={setUpdateModal} selectedModel={selectedModel}/>}
    <Navbar />
    <div className="grid grid-cols-12 mb-10 ">
      <Sidebar />
      <div className="col-span-10 ml-6">
        <div className="flex justify-center my-6">
          <h1 className="bg-gradient-to-r from-gradx1 to-gradx2 text-white text-3xl  font-poppins mr-2 py-1 px-8 rounded-2xl tracking-widest">
            My Local Models 
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
              <div className="flex gap-x-4">
              <button className="bg-purple px-8 rounded-full text-black font-medium" onClick={()=>{
                setSelectedModel(item)
                setUpdateModal(true)
                }}>
                  Update Model
                </button>
              <button className="bg-purple px-8 rounded-full text-black font-medium" onClick={()=>handleClick4(item.name)}>
                  Get Global Model
                </button>
              <button className="bg-purple px-8 rounded-full text-black font-medium" onClick={()=>handleClick3(item.name)}>
                  Get Model
                </button>
              </div>
            </div>
          ))}
        </div>)}
      </div>
    </div>
  </div>
  )
}

export default ActiveModelsHospital;