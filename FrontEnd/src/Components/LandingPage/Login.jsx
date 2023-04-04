import "./Login.css";
import metaContext from "../../context/metaContext";
import { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const Login = () => {
  const [address, setAddress] = useState("");
  const con = useContext(metaContext);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      fetchAddress();
      window.ethereum.on("accountsChanged", function (accounts) {
        getAccount();
      });
      console.log("hello");
    }
  }, [address]);

  const fetchAddress = async () => {
    await con.accountSet();
    setAddress(con.acn.address);
  };

  async function getAccount() {
    const accounts = await window.ethereum.enable();
    window.location.reload(false);
    // do something with new account here
  }

  function checkAddressPassword(){
    // send address + password to smart contract and receive SuperUser/Hospital Against it    
    window.location.replace("/about");
    // address => BlockChain
    let str = "";
    if(str === "SuperUser")
       window.location.replace("/SuperUser");
    else if(str === "Hospital"){
      window.location.replace("/Hospital");
    }
    else{
      return <p>Either Address or Password is Incorrect</p>
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
              <button id="btn1" onClick={checkAddressPassword} class="font-poppins bg-slate-200 rounded-full mt-6 ml-2 w-120 text-sm drop-shadow-2xl tracking-widest">
                  Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
