import React from "react";
import Navbar from "../../Components/Navbar/index";
import "./registerHospital.css";
import metaContext from "../../context/metaContext";
import { useContext, useEffect, useState } from "react";
import abi from "../../Contracts/hospital.json";
import axios from "axios";
import { hospitalAddress } from "../../Contracts/contractAddress";
import Loader from "../../Components/utils/Loader";
import Sidebar from "../../Components/Sidebar/index";
import { useSnackbar } from "react-simple-snackbar";
import { useNavigate } from "react-router-dom";
import getContractInstance from "../../Contracts/ContractInstance";

const RegisterHospital = () => {
  const location = useNavigate();
  const [openSnackbar, closeSnackbar] = useSnackbar();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    city: "",
    phone: "",
    address: "",
  });
  const [fileHash, setHash] = useState("");
  const [isActive, setLoader] = useState(false);
  const [add, setAdd] = useState("");
  const con = useContext(metaContext);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      fetchAddress();
      window.ethereum.on("accountsChanged", function (accounts) {
        getAccount();
      });
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
    e.preventDefault();
    setLoader(true);
    var f = new File([formData.name], `${formData.name}.pkl`, {
      type: "text/plain",
    });
    let formdata = new FormData();
    formdata.append("file", f);
    let res;
    console.log(process.env.REACT_APP_API_KEY);
    try {
      res = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formdata,
        headers: {
          pinata_api_key: `${process.env.REACT_APP_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_API_Secret}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setHash(res.data.IpfsHash);
    } catch (error) {
      console.log(error);
      openSnackbar("Error Uploading Data please try again later");
    }

    if (fileHash) {
      const Contract = getContractInstance(abi, hospitalAddress);
      let tx;
      console.log(formData)
      try {
        tx = await Contract.registerHospital(
          formData.name,
          formData.city,
          formData.email,
          formData.phone,
          formData.address
        );
        openSnackbar("Hospital has been registered");
        location("/superuser/hospitals");
      } catch (error) {
        console.log(error);
        openSnackbar("Error Uploading Data please try again later");
      }
    }
    setLoader(false);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <>
      {isActive && <Loader isActive={isActive} />}
      <div>
        <Navbar />
        <div className="grid grid-cols-12 mb-10">
          <Sidebar />

          <div className="col-span-11">
            <div className="">
              <form action="" id="reg_input_reg_hospital">
                <span
                  id="reg_input_first_span"
                  class="bg-gradient-to-r from-gradx1 to-gradx2 font-bold text-white py-1 text-2xl drop-shadow-2xl"
                >
                  Enter Hospital Details to Register
                </span>
                <span id="reg_input_box">
                  <span className="reg_input_upper_box">
                    <label id="reg_label" htmlFor="">
                      {" "}
                      Hospital Name{" "}
                    </label>
                    <input
                      name="name"
                      id="input_special"
                      type="text"
                      onChange={handleChange}
                    />
                  </span>
                  <span className="reg_input_lower_box">
                    <label id="reg_label" htmlFor="">
                      Hospital wallet Address
                    </label>
                    <input
                      id="input_special"
                      type="text"
                      name="address"
                      onChange={handleChange}
                    ></input>
                  </span>
                </span>
                <span id="reg_input_box">
                  <span className="reg_input_upper_box">
                    <label id="reg_label" htmlFor="">
                      Country
                    </label>
                    <input
                      id="input_special"
                      type="text"
                      name="country"
                      onChange={handleChange}
                    />
                  </span>
                  <span className="reg_input_lower_box">
                    <label id="reg_label" htmlFor="">
                      Phone Number
                    </label>
                    <input
                      id="input_special"
                      type="phone"
                      name="phone"
                      onChange={handleChange}
                    />
                  </span>
                </span>
                <span id="reg_input_box">
                  <span id="reg_input_upper_box">
                    <label id="reg_label" htmlFor="">
                      City
                    </label>
                    <input
                      id="input_special"
                      type="text"
                      name="city"
                      onChange={handleChange}
                    />
                  </span>
                  <span className="reg_input_lower_box">
                    <label id="reg_label" htmlFor="">
                      {" "}
                      Email
                    </label>
                    <input
                      id="input_special"
                      type="email"
                      name="email"
                      onChange={handleChange}
                    />
                  </span>
                </span>
                <button
                  id="btn_special"
                  className="rounded-full bg-limgreen text-sm font-poppins drop-shadow-2xl tracking-widest w-full btn_special"
                  onClick={(e) => registerHospital(e)}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterHospital;
