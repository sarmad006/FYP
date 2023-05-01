import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import "./Ratings.css";
import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import {
  contractAddress,
  hospitalAddress,
  modelAddress,
  superuserAddress,
} from "../../Contracts/contractAddress";
import abi from "../../Contracts/hospital.json";
import metaContext from "../../context/metaContext";
import getContractInstance from "../../Contracts/ContractInstance";

const Ratings = () => {
  const con = useContext(metaContext);
  const [address, setAddress] = useState(false);
  const [docTokens, setDocTokens] = useState(0);
  const [penaltyCount, setPenaltyCount] = useState(0);
  const [dueTime, setDuetime] = useState(0);
  const [datex,setdatex]=useState(new Date())
  const [fetch,setfetch]=useState(false)

  const fetchAddress = async () => {
    await con.accountSet();
    setAddress(con.acn.address);
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      fetchAddress();
      getDocToken();
    }
  }, [address,datex]);

  const hexToDecimal = (hex) => parseInt(hex, 16);

  async function getDocToken() {
    let contract = getContractInstance(abi, hospitalAddress);
    let tx, tx2, tx3;

    try {
      tx = await contract.DocTokenBalance(address);
      console.log("You have Doc Tokens : ", hexToDecimal(tx._hex));
      setDocTokens(hexToDecimal(tx._hex));
      tx2 = await contract.penaltyCount(address);
      console.log("Your Penalty Count is : ", hexToDecimal(tx2._hex));
      setPenaltyCount(hexToDecimal(tx2._hex));
      tx3 = await contract.dueTime(address);
      console.log("Your Due Time is : ", hexToDecimal(tx3._hex));
      setDuetime(hexToDecimal(tx3._hex));
      
      var a = new Date(dueTime * 1000);
      console.log("Your next Training is due On : ",a.toLocaleDateString("en-GB"));
      let x = a.toLocaleDateString("en-GB")
      setdatex(x)
      console.log(datex)
      console.log(x)
      setfetch(true)
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 mb-10 ">
        <Sidebar />
        <div className="col-span-10">
          <div className="flex justify-center ">
            <h1 className="mt-10 bg-yellow-300 text-black text-2xl font-bold rounded-full font-poppins mr-2 py-1 px-12 rounded-2xl tracking-widest">
              Ratings 
            </h1>
          </div>
          <div className="Section text-white">
            <div className="Section1 font-poppins rounded-full tracking-wide">
              <strong>Warning : </strong>
              <span class="font-thin">Your Penalty Count is on level 3 !</span>
            </div>
            {fetch?<div className="Section2 flex flex-row rounded-full border-2 border-yellow-300">
              <h1 class="text-3xl font-poppins font-thin">
              <img src={require("../../Components/Images/token.png")} alt="MetaMask" />
                <strong>Doc Tokens Earned</strong> : {docTokens}
              </h1>
             
            </div>:""}
            {fetch?<div className="Section2 flex flex-row border-2 border-yellow-300">
              <h1 class="text-3xl font-poppins font-thin">
                <strong>Penalty Count</strong>: {penaltyCount}
              </h1>
              <button class="bg-yellow-300 text-black btn_rating_2 font-poppins text-sm text-center">
                View Report
              </button>
            </div>:""}
            {fetch?<div className="Section3 border-2 border-yellow-300 font-poppins text-3xl text-center">
              Next Training Due On :{" "}
              <span class="text-limgreen font-thin">{datex}</span>
            </div>:""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ratings;

/*{<strong>Penalty Count</strong>*/
