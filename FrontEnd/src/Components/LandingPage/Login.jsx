import "./Login.css";
import metaContext from "../../context/metaContext";
import { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useNavigate } from "react-router-dom";
import getContractInstance from "../../Contracts/ContractInstance";
import abi from "../../Contracts/authentication.json";
import hospitalAbi from "../../Contracts/hospital.json";
import {
  authenticationAdrress,
  hospitalAddress,
} from "../../Contracts/contractAddress";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/userSlice";

const Login = () => {
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [hospitalarray, setHospitalArray] = useState([]);
  const [hospitalName, setHospitalName] = useState("");
  const con = useContext(metaContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAddress = useSelector((state) => state.user.value);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      fetchAddress();
      authenticateUser();
      window.ethereum.on("accountsChanged", function (accounts) {
        getAccount();
      });
      console.log("hello");
    }
  }, [address, type,hospitalName]);

  const fetchAddress = async () => {
    await con.accountSet();
    setAddress(con.acn.address);
  };

  async function getAccount() {
    const accounts = await window.ethereum.enable();
    window.location.reload(false);
    // do something with new account here
  }

  let tx, tx2, tx3;
  async function authenticateUser() {
    let contract = getContractInstance(abi, authenticationAdrress);
    tx = await contract.authenticate(address);
    setType(tx);
    contract = getContractInstance(hospitalAbi, hospitalAddress);
    tx2 = await contract.getHospitals();
    const hos = tx2.filter((item) => item.metamask === address);
    setHospitalName(hos[0].name);
    console.log(hospitalName);

    if (tx === "Hospital") {
      dispatch(addUser({
        address:address,
        name:hos[0].name
      }));
    }
  }

  function checkAddressPassword() {

    // address => BlockChain

    if (type === "SuperUser")
      navigate("/superuser");
    else if (type === "Hospital") {
       navigate("/recep");
    } else if (type === "Account Doesn't Exists") {
      console.log("Account not found");
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
                <input
                  id="inp"
                  type="text"
                  defaultValue={address}
                  readOnly
                ></input>
              </div>
              {type.length > 0 ? (
                <button
                  id="btn1"
                  onClick={checkAddressPassword}
                  class="font-poppins bg-slate-200 rounded-full mt-6 ml-2 w-120 text-sm drop-shadow-2xl tracking-widest"
                >
                  Login
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
