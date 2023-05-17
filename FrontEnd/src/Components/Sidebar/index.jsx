import React from "react";
import "./index.css";
import { AiOutlineHome, AiOutlineForm,AiOutlineStar } from "react-icons/ai";
import { BsHospital,BsBuildingAdd } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import {GiArtificialHive,GiArtificialIntelligence} from "react-icons/gi"

//918dec bg color
const Sidebar = () => {
  const location = useLocation();
  const hospital = [
    {
      name: "Home",
      icon: <AiOutlineHome fontSize={20}/>,
      path: "/recep/ModelController",
    },
    {
      name: "Retrieve Model",
      icon: <GiArtificialHive fontSize={20} />,
      path: "/recep/models",
    },
    {
      name: "Upload Model",
      icon: <AiOutlineForm fontSize={20}/>,
      path: "/recep/UploadModel",
    },
    {
      name:"Rating",
      icon:<AiOutlineStar fontSize={20}/>,
      path:"/recep/rating"
    }
  ];
  const superUser = [
    {
      name: "Home",
      icon: <AiOutlineHome fontSize={20} />,
      path: "/superuser",
    },
    {
      name: "Hospitals",
      icon: <BsHospital fontSize={20}/>,
      path: "/superuser/hospitals",
    },
    {
      name: "Register Hospital",
      icon: <BsBuildingAdd fontSize={20}/>,
      path: "/superuser/reg",
    },
    {
      name:"Models",
      icon:<GiArtificialIntelligence fontSize={20}/>,
      path:"/superuser/models"
    },
    {
      name: "Upload",
      icon: <AiOutlineForm fontSize={20}/>,
      path: "/superuser/UploadModel",
    }
  ];
  return (
    <div className="flex w-full justify-center items-center bg-[#918dec] rounded-xl ml-4 shadow-2xl h-[75vh]">
      <ul className="flex flex-col space-y-20 py-20  items-center px-8">
        {location.pathname.includes("superuser") &&
          superUser.map((item) => (
            <li className="flex flex-col items-center space-y-1 font-semibold text-gray-900 font-poppins">
              {item.icon}

              <a  href={item.path}>{item.name}</a>
            </li>
          ))}

        {location.pathname.includes("recep") &&
          hospital.map((item) => (
            <li className="flex flex-col items-center space-y-1  font-semibold text-gray-900 font-poppins">
              {item.icon}

              <a href={item.path}>{item.name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
