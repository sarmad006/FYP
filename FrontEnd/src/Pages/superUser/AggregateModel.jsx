import React,{useState} from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";

const AggregateModel = () => {

    const[hospitals,setHospitals]=useState([
        {
            title:"Agha Khan Hospital",
            Accuracy:"70%",
            Epoch:30,
            Training:"70%",
            Testing:"30%",
            button:"Added"
        },
        {
            title:"Lincoln Hospital",
            Accuracy:"80%",
            Epoch:20,
            Training:"70%",
            Testing:"30%",
            button:"Add"
        },
        {
            title:"SKMH",
            Accuracy:"88%",
            Epoch:30,
            Training:"60%",
            Testing:"40%",
            button:"Rejected"
        }
    ])

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 ">
        <Sidebar />

        <div className="col-span-7 ml-20">
          <div className="flex  justify-between  mt-8 ml-4">
            <div className="mt-2">
              <div className="bg-transparent  text-gray-200 text-sm rounded-md flex justify-around px-2.5 py-0.5 border-2 border-gray-200 ">
                <span
                  className={`bg-[#f5b750] mt-1.5 mr-2 w-2.5 h-2.5 rounded-full `}
                ></span>
                <span className="font-semibold">Cardiovascular Model</span>
              </div>
            </div>
            <div className="bg-[#f5b750]  font-poppins text-3xl -ml-80 font-bold mr-2 px-6 py-1 rounded-full tracking-wider">
              Ready to Aggregate
            </div>
          </div>
          <div className="flex flex-col gap-y-6 mt-8 ">
            {hospitals.map((item)=>(
               <div className="border-4 border-slate-50 rounded-xl px-6 py-2 flex justify-between">
               <div className="rounded-xl  py-2 px-2 flex flex-col gap-y-4">
                 <span className="font-poppins text-3xl text-slate-100 border-b-2 border-gray-50 tracking-widest">
                   {item.title}
                 </span>
                 <div className="flex flex-col gap-y-1">
                 <span className="font-poppins text-white">
                     Accuracy : {item.Accuracy}
                 </span>
                 <span className="font-poppins text-white">
                     Epoch : {item.Epoch}
                 </span>
                 <span className="font-poppins text-white">
                     Training : {item.Training}
                 </span>
                 <span className="font-poppins text-white">
                     Testing : {item.Testing}
                 </span>
                 </div>
               </div>
               <div className="flex flex-col items-center mt-16 gap-y-6">
                 <button className="bg-limgreen px-8 py-1 rounded-xl font-poppins font-semibold">{item.button}</button>
                 <button className="bg-slate-50 px-8 py-1 rounded-xl font-poppins font-semibold">Dismiss</button>
               </div>
               </div>
            ))}
           
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default AggregateModel;
