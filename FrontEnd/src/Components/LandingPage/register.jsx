import React from "react";
import Nav from "./Nav";
import "./register.css";
import metaContext from "../../context/metaContext";
import { useContext, useEffect, useState } from "react";
import Loader from "../utils/Loader";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const location = useNavigate();
  const [formData,setFormData]=useState({
    email:"",
    HospitalName:"",
    CountryName:"",
    City:"",
    phone:""

  })
  const [isActive, setLoader] = useState(false);
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

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  async function getAccount() {
    const accounts = await window.ethereum.enable();
    window.location.reload(false);
    // do something with new account here
  }
  async function registerHospital(e) {
    setLoader(true);
    e.preventDefault();
   
   await axios.post("http://localhost:5000/api/sendmail",{
    ...formData,
    address:add
   }).then((res)=>{
    console.log(res)
    setTimeout(() => {
      setLoader(false)
      toast.success('Email sent to our directive', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        });
    }, 1000);
    location('/thanks')
   }).catch((error)=>{
    setTimeout(() => {
      setLoader(false)
      toast.error("Error occured ", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        });
    }, 1000);
   
   })
    
  }

  return (
    <>
      {isActive && <Loader isActive={isActive} />}
      <div>
        <Nav />

        <div id="reg_desc">
          <span class="reg_desc_span">
            Thankyou for choosing us , You're just one step away from becoming
            part of a
          </span>
          <span class="reg_desc_span">
            Global Network , Where all the magic happens ,
          </span>
          <span class="reg_desc_span">LETS GO !</span>
        </div>

        <form action="" id="reg_input" >
          <span
            id="reg_input_first_span"
            class="bg-gradient-to-r from-gradx1 to-gradx2 font-bold text-white py-1 text-2xl drop-shadow-2xl"
          >
            Kindly Enter your Hospital Details
          </span>
          <span id="reg_input_box">
            <span className="reg_input_upper_box">
              <label id="reg_label" htmlFor="">
                {" "}
                Hospital Name{" "}
              </label>
              <input name="HospitalName" id="input_special" type="text" onChange={handleChange} />
            </span>
            <span className="reg_input_lower_box">
              <label id="reg_label" htmlFor="">
                Hospital wallet Address
              </label>
              <input
                id="input_special"
                type="text"
                name="address"
                defaultValue={add}
                readOnly
              ></input>
            </span>
          </span>
          <span id="reg_input_box">
            <span className="reg_input_upper_box">
              <label id="reg_label" htmlFor="">
                Country
              </label>
              <input id="input_special" type="text" name="CountryName" onChange={handleChange} />
            </span>
            <span className="reg_input_lower_box">
              <label id="reg_label" htmlFor="">
                Phone Number
              </label>
              <input id="input_special" type="phone" name="phone" onChange={handleChange} />
            </span>
          </span>
          <span id="reg_input_box">
            <span id="reg_input_upper_box">
              <label id="reg_label" htmlFor="">
                City
              </label>
              <input id="input_special" type="text" name="City" onChange={handleChange}/>
            </span>
            <span className="reg_input_lower_box">
              <label id="reg_label" htmlFor="">
                {" "}
                Email
              </label>
              <input id="input_special" type="email" name="email" onChange={handleChange} />
            </span>
          </span>
          <button
            id="btn_special"
            className="rounded-full bg-limgreen text-sm font-poppins drop-shadow-2xl tracking-widest w-1/7 btn_special"
            onClick={(e) => registerHospital(e)}
          >
            NEXT
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterComponent;
