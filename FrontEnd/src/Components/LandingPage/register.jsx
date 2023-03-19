import React, { Component } from "react";
import Nav from "./Nav";
import "./register.css";
import metaContext from "../../context/metaContext";
import { useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Link, useLocation } from "react-router-dom";
import { ethers } from "ethers";
import abi  from "../../Contracts/hospital.json";
import axios from "axios";
import { hospitalAddress } from "../../Contracts/contractAddress";


const RegisterComponent = () => {
  const location=useLocation()
  const API_KEY = "c303a8d05f40b047e81f";
  const API_Secret ="869916f5afead162492bf1d096a41082e189f911afc0e007b9f2feee7a56abc5";
  const [add, setAdd] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    city: "",
    phone:""
  });
  const [fileHash,setHash]=useState("");
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
  async function registerHospital(e) {
    e.preventDefault()
    var f = new File([formData.name], `${formData.name}.pkl`, { type: "text/plain" });
    let formdata = new FormData();
    formdata.append("file", f);
    let res;
    try {
      res = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formdata,
        headers: {
          pinata_api_key: API_KEY,
          pinata_secret_api_key: API_Secret,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.IpfsHash)
      setHash(res.data.IpfsHash)
      console.log(formData)
    } catch (error) {
      console.log(error);
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Contract = new ethers.Contract(
      hospitalAddress,
      abi,
      signer
    );
    let tx;
   
    try {
      tx = await Contract.registerHospital(
        formData.name,
        formData.city,
        formData.email,
        formData.phone,
        res.data.IpfsHash,
        add

      );
      console.log(tx);
      location('/thanks')
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  console.log(formData);

  return (
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
      <form action="" id="reg_input">
        <span
          id="reg_input_first_span"
          class="bg-gradient-to-r from-gradx1 to-gradx2 font-bold text-white py-1 text-2xl drop-shadow-2xl"
        >
          Kindly Enter your Hospital Details
        </span>
        <span id="reg_input_box">
          <span className="reg_input_upper_box">
            <label id="reg_label" htmlFor=""> Hospital Name </label>
            <input name="name" id="input_special" type="text" onChange={handleChange}/>
          </span>
          <span className="reg_input_lower_box">
            <label id="reg_label" htmlFor="">Hospital wallet Address</label>
            <input id="input_special" type="text" defaultValue={add} readOnly></input>
          </span>
        </span>
        <span id="reg_input_box">
          <span className="reg_input_upper_box">
            <label id="reg_label" htmlFor="">Country</label>
            <input id="input_special" type="text" name="country" onChange={handleChange}/>
          </span>
          <span className="reg_input_lower_box">
            <label id="reg_label" htmlFor="">Phone Number</label>
            <input id="input_special" type="phone" name="phone" onChange={handleChange}/>
          </span>
        </span>
        <span id="reg_input_box">
          <span id="reg_input_upper_box">
            <label id="reg_label" htmlFor="">City</label>
            <input id="input_special" type="text" name="city" onChange={handleChange} />
          </span>
          <span className="reg_input_lower_box">
            <label id="reg_label" htmlFor=""> Email</label>
            <input id="input_special" type="email" name="email" onChange={handleChange}/>
          </span>
        </span>
          <button
            id="btn_special"
            className="rounded-full bg-limgreen text-sm font-poppins drop-shadow-2xl tracking-widest w-1/7 btn_special"
            onClick={(e)=>registerHospital(e)}
          >
            NEXT
          </button>
      </form>
    </div>
  );
};

export default RegisterComponent;
