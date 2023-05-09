import "./Login.css";
import metaContext from "../../context/metaContext";
import { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useNavigate } from "react-router-dom";
import getContractInstance from "../../Contracts/ContractInstance";
import abi from "../../Contracts/authentication.json"
import { authenticationAdrress } from "../../Contracts/contractAddress";
import { useDispatch,useSelector } from 'react-redux'
import { addUser } from "../../redux/userSlice";


const Login = () => {
  const [address, setAddress] = useState("");
  const [type,setType]=useState("")
  const con = useContext(metaContext);
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const userAddress=useSelector((state)=>state.user.value)

   
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      fetchAddress();
      authenticateUser();
      window.ethereum.on("accountsChanged", function (accounts) {
        getAccount();
      });
      console.log("hello");
    }
  }, [address,type]);

  const fetchAddress = async () => {
    await con.accountSet();
    setAddress(con.acn.address);
  };

  async function getAccount() {
    const accounts = await window.ethereum.enable();
    window.location.reload(false);
    // do something with new account here
  }

  let tx
  async function authenticateUser(){
    const contract = getContractInstance(abi,authenticationAdrress)
    tx = await contract.authenticate(address);
    setType(tx)
    if(tx === "Hospital")
    {
    window.sessionStorage.setItem("key",tx)
    dispatch(addUser(address))
    }
  }

  function checkAddressPassword(){
    // send address + password to smart contract and receive SuperUser/Hospital Against it    
    console.log("I am in the block now")
    // address => BlockChain
    
    if(type === "SuperUser")
       navigate("/superuser");
    else if(type === "Hospital"){
      navigate("/recep");
    }
    else if(type === "Account Doesn't Exists"){
      console.log("Account not found")
    }
  
  }

  return (
    <div id="nav">
      <Nav />
      <div id="mainer" class="flex flex-row justify-center">
        <div className="container">
          <div className="card">
            <div className="content">
              <div id="head">
                <h1 class="text-white">LOGIN</h1>
              </div>
              <div id="field">
                <label class="text-slate-100">Metamask Address</label>
                <input id="inp" type="text" defaultValue={address} readOnly></input>
              </div>
              {type.length>0? (
              <button id="btn1" onClick={checkAddressPassword} class="font-poppins bg-slate-200 rounded-full mt-6 ml-2 w-120 text-sm drop-shadow-2xl tracking-widest">
                  Login
              </button>):("")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
