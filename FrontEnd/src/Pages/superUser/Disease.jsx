import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import {useEffect} from 'react';
import { useLocation } from 'react-router-dom';

const Disease = (props) => {

  const location= useLocation();
  useEffect(()=>{

    console.log(location);
},[location])
  const [metrics, setMetrics] = useState([
    {
      metric: "Blood Pressure",
    },
    {
      metric: "Heart rate",
    },
    {
      metric: "CBC Count",
    },
    {
      metric: "Weight",
    },
    {
      metric: "Blood Platellets",
    },
  ]);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 mb-10">
        <Sidebar />
        <div className="col-span-10">
          <div className="flex justify-center mt-4">
            <h1 className=" text-white  border-4 border-purple text-2xl mt-8 font-poppins font-bold mr-2 py-4 px-6 rounded-lg tracking-widest">
              {location.state.name} Disease Model
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center mt-8 ">
            <div className="border-4 border-purple rounded-xl px-16 py-8 flex flex-col gap-y-4">
              <div className="flex flex-col border-2 border-purple rounded-2xl py-1 px-4">
                <span className="text-white font-medium font-poppins">
                  Current Accuracy : {parseInt(location.state.accuracy._hex)}
                </span>
                <span className="text-white font-medium font-poppins">
                  Version : {parseInt(location.state.version._hex)}
                </span>
                <span className="text-white font-medium font-poppins">
                  Models Combined : {parseInt(location.state.modelsCombined._hex)}
                </span>
              </div>
              <div className="border-2 border-purple rounded-2xl py-1 px-4">
                <div className="flex flex-col gap-y-6">
                  <span className="text-white font-medium font-poppins text-center">
                    Data Metrics Required
                  </span>
                  <div className="flex flex-col">
                    {metrics.map((item) => (
                      <span className="text-white font-poppins">
                        - {item.metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disease;
