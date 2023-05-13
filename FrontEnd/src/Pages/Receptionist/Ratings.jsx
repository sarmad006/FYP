import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import "./Ratings.css";
import { useState, useEffect} from "react";
import {

  hospitalAddress
} from "../../Contracts/contractAddress";
import abi from "../../Contracts/hospital.json";
import getContractInstance from "../../Contracts/ContractInstance";
import Loader from "../../Components/utils/Loader";
import { useSelector } from "react-redux";

const Ratings = () => {
  const userAddress=useSelector((state)=>state.user.value.address)
  const [docTokens, setDocTokens] = useState(0);
  const [penaltyCount, setPenaltyCount] = useState(0);
  const [datex,setdatex]=useState("")
  const [isActive,setActive]=useState(false)

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      getDocToken();
    }
  }, []);

  const hexToDecimal = (hex) => parseInt(hex, 16);

  async function getDocToken() {
    setActive(true)
    let contract = getContractInstance(abi, hospitalAddress);
    let tx, tx2, tx3;

    try {
      tx = await contract.DocTokenBalance(userAddress);
      setDocTokens(hexToDecimal(tx._hex));
      tx2 = await contract.penaltyCount(userAddress)
      setPenaltyCount(hexToDecimal(tx2._hex));
      tx3 = await contract.dueTime(userAddress);
      const a = new Date(hexToDecimal(tx3._hex) * 1000);
      const x = a.toLocaleDateString("en-GB")
      setdatex(x)
      
      
    } catch (error) {
      console.log(error);
    }
    finally{
      setTimeout(()=>{
       setActive(false)
      },3000)
    }
  }

  return (
    <div>
       {isActive && <Loader isActive={isActive} />}
      <Navbar />
      <div className="grid grid-cols-12 mb-10 ">
        <Sidebar />
        <div className="col-span-10">
          <div className="flex justify-center ">
            <h1 className="mt-10 bg-yellow-300 text-black text-2xl font-bold  font-poppins mr-2 py-1 px-12 rounded-2xl tracking-widest">
              Ratings 
            </h1>
          </div>
          <div className="Section text-white">
          {penaltyCount>1 ? (
            <div className="Section1 font-poppins rounded-full tracking-wide">
              <strong>Warning : </strong>
              <span class="font-thin">Your Penalty Count is on level 3 !</span>
            </div>
            ):""}
          <div className="Section2 flex flex-row rounded-full border-2 border-yellow-300">
              <h1 class="text-3xl font-poppins font-thin">
              <img src={require("../../Components/Images/token.png")} alt="MetaMask" />
                <strong>Doc Tokens Earned</strong> : {docTokens}
              </h1>
            </div>
            <div className="Section2 flex flex-row border-2 border-yellow-300">
              <h1 class="text-3xl font-poppins font-thin">
                <strong>Penalty Count</strong>: {penaltyCount}
              </h1>
              <button class="bg-yellow-300 text-black btn_rating_2 font-poppins text-sm text-center">
                View Report
              </button>
            </div>
            <div className="Section3 border-2 border-yellow-300 font-poppins text-3xl text-center">
              Next Training Due On :{" "}
              <span class="text-limgreen font-thin">{datex.toString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ratings;

/*{<strong>Penalty Count</strong>*/
