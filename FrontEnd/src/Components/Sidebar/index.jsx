import React from "react";
import "./index.css";
import { AiOutlineHome, AiOutlineForm } from "react-icons/ai";
import { RiFileCloudLine } from "react-icons/ri";
import { MdOutlineFileUpload } from "react-icons/md";
import { BsHospital } from "react-icons/bs";
import { useLocation } from "react-router-dom";

//918dec bg color
const Sidebar = () => {
  const location = useLocation();
  const hospital = [
    {
      name: "Home",
      icon: <AiOutlineHome />,
      path: "/recep/ModelController",
    },
    {
      name: "Retrieve Model",
      icon: <BsHospital />,
      path: "/recep/models",
    },
    {
      name: "Upload Model",
      icon: <AiOutlineForm />,
      path: "/recep/UploadModel",
    },
  ];
  const superUser = [
    {
      name: "Home",
      icon: <AiOutlineHome />,
      path: "/superuser",
    },
    {
      name: "Registered Hospitals",
      icon: <BsHospital />,
      path: "/superuser/hospitals",
    },
    {
      name: "Register Hospitals",
      icon: <AiOutlineForm />,
      path: "/superuser/reg",
    },
    {
      name: "Model",
      icon: <AiOutlineForm />,
      path: "/superuser/UploadModel"
    }
  ];
  return (
    <div className="flex justify-center items-center bg-[#918dec] rounded-xl ml-4 shadow-2xl h-[75vh]">
      <ul className="flex flex-col space-y-20 py-20 w-full items-center px-8">
        {location.pathname.includes("superuser") &&
          superUser.map((item) => (
            <li className="flex flex-col items-center space-y-1 font-medium ">
              {item.icon}

              <a  href={item.path}>{item.name}</a>
            </li>
          ))}

        {location.pathname.includes("recep") &&
          hospital.map((item) => (
            <li className="flex flex-col items-center space-y-1 font-medium">
              {item.icon}

              <a href={item.path}>{item.name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
