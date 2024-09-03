import React from "react";
import caos from "../../images/caos.png";
import gilbarco from "../../images/GVRLogo.png";
import scanner from "../../images/tap-pay-15575682-unscreen.gif";
import LoginTextFeild from "./LoginTextFeild";

const Login = () => {
  return (
    <>
      <div className="w-screen h-screen flex overflow-hidden absolute bg-white" >
      <div className="w-full h-full">
        <div className="bg-[#00aeff9d] rounded-r-3xl h-full rounded-br-full">
          <img src={gilbarco} className=" w-[300px] p-5" alt="Gilbarco" />
          <h1 className="font-bold text-[40px] ml-20 mt-20 text-white">
            Welcome to Gilbarco <br />
            Leave Management System
          </h1>
          <p className="w-[50%] pt-20 pl-20 font-bold text-[15px]">
            Improve your gas station's customer experience with cutting edge
            fuel dispensing & convenience store equipment technology by Gilbarco
            Veeder-Root in India!
          </p>
          <img src={scanner} className="w-40 h-40 ml-20" alt="Scanner" />
        </div>
      </div>
      <img src={caos} className="object-cover w-96 h-96 mt-40 mr-20" alt="Caos" />
    </div>
    <LoginTextFeild className="relative"/>
    </>
  
  );
};

export default Login;