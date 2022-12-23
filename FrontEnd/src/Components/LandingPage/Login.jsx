import "./Login.css";
import metaContext from "../../context/metaContext";
import { useContext, useEffect, useState } from "react";
import Nav from "./Nav";

const Login = () => {
  const [add, setAdd] = useState("");
  const con = useContext(metaContext);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      fetchAddress();
      window.ethereum.on("accountsChanged", function (accounts) {
        getAccount();
      });
      console.log("hello");
    }
  }, [add]);

  const fetchAddress = async () => {
    await con.accountSet();
    setAdd(con.acn.address);
  };

  async function getAccount() {
    const accounts = await window.ethereum.enable();
    window.location.reload(false);
    // do something with new account here
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
                <input id="inp" type="text" defaultValue={add} readOnly></input>
                <label class="mt-4 text-slate-100">Password</label>
                <input id="inp" type="password"></input>
              </div>
              <button id="btn1" class="font-poppins bg-slate-200 rounded-full mt-6 ml-2 w-120 text-sm drop-shadow-2xl tracking-widest">
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
