import React, { useEffect } from "react";
import caos from "../../images/caos.png";
import gilbarco from "../../images/GVRLogo.png";
import scanner from "../../images/tap-pay-15575682-unscreen.gif";
import LoginTextFeild from "./LoginTextFeild";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate= useNavigate();
  useEffect(()=>{
    if(document.cookie){
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      console.log('Logged out, cookie removed');
      navigate("/");
    }
  },[])
  return (
    <>
      <div className="w-screen h-screen flex overflow-hidden absolute bg-white pointer-events-none" >
      <div className="w-full h-full">
        <div className="bg-[#00aeff9d] rounded-r-3xl h-full rounded-br-full">
          <img src={gilbarco} className=" w-[300px] p-5" alt="Gilbarco" />
          <h1 className="font-bold text-5xl ml-20 mt-20 text-white">
            Welcome to Gilbarco <br />
            Leave Management System
          </h1>
          <p className="w-[70%] pt-20 pl-20 text-xl font-bold text-[15px]">
          Effortlessly manage your leave with our kiosk-based system designed for quick and convenient access. Improve workflow efficiency by handling leave requests and approvals directly from your workplace, all powered by Gilbarco’s reliable technology.
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