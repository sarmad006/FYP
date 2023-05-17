import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { useState } from "react";
import axios from "axios";
import { superuserAddress } from "../../Contracts/contractAddress";
import metaContext from "../../context/metaContext";
import { useContext, useEffect } from "react";
import superUserAbi from "../../Contracts/superuser.json";
import Stepper from "../../Components/receptionist/Stepper";
import { AiOutlineFileText } from "react-icons/ai";
import { BsFiletypeJson } from "react-icons/bs";
import getContractInstance from "../../Contracts/ContractInstance";
import Loader from "../../Components/utils/Loader";
import {toast} from "react-toastify"
import modelAbi from "../../Contracts/model.json";
import { modelAddress } from "../../Contracts/contractAddress";

const UploadModel = () => {
  const [file, setFile] = useState("");
  const [file1, setFile1] = useState("");
  const [stepper, setStepper] = useState(1);
  const [modelHash, setModelHash] = useState("");
  const [jsonHash, setJsonHash] = useState("");
  const [isActive, setActive] = useState(false);
  const [metadata, setMetaData] = useState();
  const con = useContext(metaContext);
  const [address, setAddress] = useState("");

  const [selectedDisease,setSelectedDisease]=useState("none")

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      fetchAddress();
      window.ethereum.on("accountsChanged", function (accounts) {
        getAccount();
      });
      const modelContract = getContractInstance(modelAbi, modelAddress);
      modelContract
        .registerLModel("liver disease", address)
        .then((res) => console.log(res));
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

  async function uploadGModel() {
    setActive(true);
    const Contract = getContractInstance(superUserAbi,superuserAddress);
    console.log(modelHash,jsonHash)
    let tx;
    try {
      tx = await Contract.registerModel(
        metadata.name.toLowerCase(),
        modelHash,
        jsonHash,
        parseInt(metadata.accuracy)
      );
      toast.success("Successfully uploaded Global model",{
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        });
    } catch (error) {
      console.log(error.error);
      toast.error(error.error.data.message,{
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        });
    }
    setActive(false);
    setStepper(1);
    setFile("");
  }

  const handleFileChange1 = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };
  const handleFileChange2 = (event) => {
    setFile1(event.target.files[0]);
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  };
  function onReaderLoad(event) {
    var obj = JSON.parse(event.target.result);
    console.log(obj);
    setMetaData(obj);
  }

  const handleUpload = async () => {
    await sendModelFileToPinata(file); 
    await sendJsonFileToPinata(file1);
    
  };

  // function handleChange(e) {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // }

  const sendModelFileToPinata = async (e) => {
    console.log(process.env.REACT_APP_API_KEY);
    const formData = new FormData();
    formData.append("file", e);

    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    const options = {
      headers: {
        pinata_api_key: `${process.env.REACT_APP_API_KEY}`,
        pinata_secret_api_key: `${process.env.REACT_APP_API_Secret}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(url, formData, options);
      console.log(response);
      setModelHash(response.data.IpfsHash);
    } catch (error) {
      console.log(error);
      toast.error("Error uploading model",{
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        });
    }
  };
  const sendJsonFileToPinata = async (e) => {
    const formData = new FormData();
    formData.append("file", e);

    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    const options = {
      headers: {
        pinata_api_key: `${process.env.REACT_APP_API_KEY}`,
        pinata_secret_api_key: `${process.env.REACT_APP_API_Secret}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(url, formData, options);
      console.log(response)
      setJsonHash(response.data.IpfsHash);
    } catch (error) {
      console.log(error);
      toast.error("error uploading metadata",{
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        });
    }
  };

  return (
    <div >
      {isActive && <Loader isActive={isActive} />}
      <Navbar />
      <div className="grid grid-cols-12 mb-10 ">
        <Sidebar />

        {stepper === 1 && (
          <div className="col-span-10 mt-8">
            <div className="flex justify-center space-y-4  flex-col items-center px-28">
              
              
              <Stepper />

              {file ? (
                <div className="flex justify-center pt-20 flex-col space-y-4 items-center text-purple">
                  <AiOutlineFileText fontSize={80} />
                  <span>{file.name}</span>
                </div>
              ) : (
                <div className="flex items-center pt-8 justify-center w-11/12">
                  <label
                    for="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-purple border-dashed rounded-lg cursor-pointer "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        Pickle (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      onChange={handleFileChange1}
                      type="file"
                      accept=".pkl"
                      className="hidden"
                    />
                  </label>
                </div>
              )}
              <button
                onClick={() => setStepper(2)}
                type="button"
                className="rounded-full bg-limgreen text-sm font-poppins drop-shadow-2xl tracking-widest px-6 py-2.5"
              >
                Proceed
              </button>
            </div>

            {/* <div className="uploadModelDiv">
              <h1 className="uploadModelh1_1">Upload Your File</h1>
              <input
                type="file"
                accept=".pkl"
                name="fileToUpload"
                required
                className="uploadModelFileToUpload"
                onChange={handleFileChange1}
              ></input>
              <label htmlFor="">Please Upload Pickle File</label>
              <input
                type="file"
                accept=".json"
                name="fileToUpload"
                required
                className="uploadModelFileToUpload"
                onChange={handleFileChange2}
              ></input>
              <label htmlFor="">Please Upload JSON File</label>
              <input
                type="submit"
                value="Upload File"
                name="submit"
                id="uploadModelSubmit"
                onClick={handleUpload}
              ></input>
            </div> */}
          </div>
        )}
        {stepper === 2 && (
          <div className="col-span-10 mt-8">
            <div className="flex justify-center  flex-col items-center space-y-4 px-28">
          
              <Stepper value={stepper} />
              {file1 ? (
                <div className="flex justify-center pt-20 flex-col space-y-4 items-center text-purple">
                  <BsFiletypeJson fontSize={80} />
                  <span>{file1.name}</span>
                </div>
              ) : (
                <div className="flex items-center pt-8 justify-center w-11/12">
                  <label
                    for="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-purple border-dashed rounded-lg cursor-pointer "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        json (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      onChange={handleFileChange2}
                      type="file"
                      accept=".json"
                      className="hidden"
                    />
                  </label>
                </div>
              )}
              <button
                onClick={(async()=>{
                await handleUpload();
                setStepper(3)
                })}
                type="button"
                className="rounded-full bg-limgreen text-sm font-poppins drop-shadow-2xl tracking-widest px-6 py-2.5"
              >
                Proceed
              </button>
            </div>

            {/* <div className="uploadModelDiv">
              <h1 className="uploadModelh1_1">Upload Your File</h1>
              <input
                type="file"
                accept=".pkl"
                name="fileToUpload"
                required
                className="uploadModelFileToUpload"
                onChange={handleFileChange1}
              ></input>
              <label htmlFor="">Please Upload Pickle File</label>
              <input
                type="file"
                accept=".json"
                name="fileToUpload"
                required
                className="uploadModelFileToUpload"
                onChange={handleFileChange2}
              ></input>
              <label htmlFor="">Please Upload JSON File</label>
              <input
                type="submit"
                value="Upload File"
                name="submit"
                id="uploadModelSubmit"
                onClick={handleUpload}
              ></input>
            </div> */}
          </div>
        )}
        {stepper === 3 && (
          <div className="col-span-10 mt-8">
            <div className="flex justify-center  flex-col items-center space-y-4 px-28">
          
              <Stepper value={3} />

              <form className="pt-12">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-md text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={metadata.name.toLowerCase()}
                    readOnly
                  />
                  <label
                    for="floating_email"
                    className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Disease Name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-md text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={metadata.accuracy}
                    readOnly
                  />
                  <label
                    for="floating_password"
                    className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                  Minimum Accuracy
                  </label>
                </div>
                <button
                  onClick={() => uploadGModel()}
                  type="button"
                  className="rounded-full bg-limgreen text-sm font-poppins drop-shadow-2xl tracking-widest px-6 py-2.5"
                >
                  Confirm
                </button>
              </form>

              {/* <div className="uploadModelDiv">
              <h1 className="uploadModelh1_1">Enter Your Model Details:</h1>
              <br />
              <label htmlFor="">Model Name</label>
              <input
                type="text"
                name="name"
                required
                className="uploadModelFileToUpload2"
                onChange={handleChange}
              ></input>
              <label htmlFor="">Accuracy</label>
              <input
                type="number"
                name="accuracy"
                required
                className="uploadModelFileToUpload2"
                onChange={handleChange}
              ></input>
              <label htmlFor="">Model Hash</label>
              <input
                type="text"
                required
                className="uploadModelFileToUpload2"
                defaultValue={modelHash}
                readOnly
              ></input>
              <label htmlFor="">JSON Hash</label>
              <input
                type="text"
                required
                className="uploadModelFileToUpload2"
                defaultValue={jsonHash}
                readOnly
              ></input>
              <h1>
                {formData.accuracy}
                Modle{modelHash}
                <br />
                Josn{jsonHash}
                {formData.name}
              </h1>
              <input
                type="submit"
                value="Send"
                name="submit"
                id="uploadModelSubmit"
                onClick={uploadLModel}
              ></input>
            </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadModel;
