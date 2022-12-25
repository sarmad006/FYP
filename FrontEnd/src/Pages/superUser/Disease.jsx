import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";

const Disease = () => {
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
              CardioVascular Disease Model
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center mt-8 ">
            <div className="border-4 border-purple rounded-xl px-16 py-8 flex flex-col gap-y-4">
              <div className="border-2 border-purple rounded-2xl py-1 px-4">
                <span className="text-white font-medium font-poppins">
                  Minimum Accuracy Required : 80%
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
