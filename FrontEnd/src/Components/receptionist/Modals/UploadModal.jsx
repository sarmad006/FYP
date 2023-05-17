import React, { useState, useEffect } from "react";
import Stepper from "../Stepper";
import { AiOutlineFileText } from "react-icons/ai";
import { BsFiletypeJson } from "react-icons/bs";
import abi from "../../../Contracts/hospital.json";
import { hospitalAddress } from "../../../Contracts/contractAddress";
import getContractInstance from "../../../Contracts/ContractInstance";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import axios from "axios";
import Loader from "../../utils/Loader";

const UploadModal = ({ setIsActive, selectedModel }) => {
  const navigate = useNavigate();
  const [stepper, setStepper] = useState(1);
  const [file, setFile] = useState("");
  const [file1, setFile1] = useState("");
  const [metadata, setMetaData] = useState();
  const [modelExists, setModelExists] = useState(false);
  const [modelHash, setModelHash] = useState("");
  const [jsonHash, setJsonHash] = useState("");
  const [isActive, setActive] = useState(false);

  const hexToDecimal = (hex) => parseInt(hex, 16);

  async function updateLModel() {
    setActive(true);
    console.log(modelHash)
    console.log(jsonHash)
    if(selectedModel.name.toLowerCase()===metadata.name.toLowerCase()){
    const Contract = getContractInstance(abi, hospitalAddress);
    console.log(Contract);
    let tx,tx2;
    try {
      tx2 = await Contract.MinimumAccuracy(selectedModel.name)
      if(parseInt(metadata.accuracy)<hexToDecimal(tx2._hex))
      {
        toast.error("Accuracy is below par policies",{
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        })
      }
      else{
      tx = await Contract.updateModel(
       selectedModel.name,
        modelHash,
        jsonHash,
        metadata.accuracy
      );
      toast.success("Successfully uploaded Local Model",{
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        });
    }
   } catch (error) {
      console.log(error);
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
    setFile1("")
  }
  else
  {
  setActive(false)
  toast.error("selected Disease and metadata should be same",{
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    });
  }
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


  const sendModelFileToPinata = async (e) => {
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
  useEffect(() => {
    const contract = getContractInstance(abi, hospitalAddress);
    contract
      .checkLocalModelExists(selectedModel.name)
      .then((res) => setModelExists(res));
  }, []);

  return (
    <>
    {isActive && <Loader isActive={isActive} />}
    <div className="fixed top-32 left-[15%]  z-80 block w-full p-4 overflow-x-hidden overflow-y-auto  h-[calc(100%-1rem)] md:h-full">
      <div className="relative w-[70%] h-full md:h-auto">
        <div className="relative bg-gray-50 border-2 border-purple rounded-lg shadow pb-6">
          <div className="flex items-end justify-between mr-2 mt-2">
            <button
              type="button"
              onClick={() => setIsActive(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center "
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <h2 className="text-center text-2xl text-gray-600 font-medium tracking-wider uppercase">
            {selectedModel.name} Disease
          </h2>
          {modelExists ? (
            <>
              {stepper === 1 && (
                <div className="col-span-10">
                  <div className="flex justify-center space-y-4 mt-6 flex-col items-center px-28">
                    <Stepper />

                    {file ? (
                      <div className="flex justify-center pt-20 flex-col space-y-4 items-center text-purple">
                        <AiOutlineFileText fontSize={80} />
                        <span>{file.name}</span>
                      </div>
                    ) : (
                      <div className="flex items-center  justify-center w-11/12">
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
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
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
                </div>
              )}
              {stepper === 2 && (
                <div className="col-span-10">
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
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
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
                       onClick={async() =>{
                        await handleUpload()
                         setStepper(3)}}
                      type="button"
                      className="rounded-full bg-limgreen text-sm font-poppins drop-shadow-2xl tracking-widest px-6 py-2.5"
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              )}
              {stepper === 3 && (
                <div className="col-span-10">
                  <div className="flex justify-center  flex-col items-center space-y-4 px-28">
                    <Stepper value={3} />

                    <form className="pt-12">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          className="block py-2.5 px-0 w-full text-md text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                          className="block py-2.5 px-0 w-full text-md text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          value={metadata.accuracy}
                          readOnly
                        />
                        <label
                          for="floating_password"
                          className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Accuracy
                        </label>
                      </div>
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            value={metadata.models}
                            className="block py-2.5 px-0 w-full text-sm text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            readOnly
                          />
                          <label
                            for="floating_first_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Models Combined
                          </label>
                        </div>
                      </div>

                      <button
                       onClick={()=>updateLModel()}
                        type="button"
                        className="rounded-full bg-limgreen text-sm font-poppins drop-shadow-2xl tracking-widest px-6 py-2.5"
                      >
                        Confirm
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-center items-center flex-col space-y-4 my-4">
              <p className="text-md font-medium">
                You have not Uploaded a Model for this Disease
              </p>
              <button
               onClick={()=>navigate('/recep/UploadModel')}
               className="bg-transparent px-8 py-2.5 rounded-lg text-purple border-2 border-purple shadow-xl font-medium">
                Upload Model
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default UploadModal;
