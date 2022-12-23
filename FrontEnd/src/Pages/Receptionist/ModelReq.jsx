import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import "./ModelReq.css";
import React, { useState } from "react";

const ModelReq = () => {
  const [labels, setLabels] = useState([
    {
      title: "Cardiovascular",
    },
    {
      title: "Diabetic",
    },
    {
      title: "Respiratory",
    },
    {
      title: "Ortho",
    },
    {
      title: "Dengue",
    },
  ]);
  //Color purple  for sarmad
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 mb-10 ">
        <Sidebar />
        <div className="col-span-10">
          <div id="Div1" className="flex justify-center mt-20">
            <h1 className="bg-gradient-to-r from-gradx1 to-gradx2 text-white text-3xl  font-poppins mr-2 py-1 px-8 rounded-2xl tracking-widest">
              Model Requested
            </h1>
          </div>
          <div className="flex flex-col gap-y-4">
            {labels.map((item) => (
              <div className="flex flex-row text-white justify-between  mt-4 py-4 px-16 rounded-xl Div2 font-poppins">
                <div>
                  <h1 className="text-2xl">
                    <span className="tracking-widest ">
                      <strong>Name</strong>{" "}
                </span>
                    :{" "}
                    <span className="tracking-widest">
                      {item.title} Disease
                    </span>
                  </h1>
                </div>
                <div className="flex gap-x-12">
                  <button className="bg-limgreen px-8 rounded-full text-black font-medium">
                    Accept
                  </button>
                  <button className="bg-slate-100 px-8 rounded-full text-black font-medium">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelReq;
