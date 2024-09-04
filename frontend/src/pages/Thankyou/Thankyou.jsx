import React, { useEffect } from "react";
import GVR from "../../images/GVRLogo.png";
import tick from "../../images/accept.png";
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  
  const navigate = useNavigate();

  const token = document.cookie.split('=')[1];
  const decodedToken = jwtDecode(token);

  useEffect(()=>{
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      console.log('Logged out, cookie removed');
      // navigate("/");
      //delay for 10 sec
      setTimeout(() => {navigate('/')}, 5000);

  }, [])

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="p-4">
        <div className="text-xl font-semibold">
          <img src={GVR} alt="GVR Logo" className="h-10" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center mb-20">
          <div className="w-full flex justify-center items-center mb-10">
            <img src={tick} alt="success" className="w-40 h-40"></img>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-10">Thank You!</h1>
          <p className="text-lg text-gray-700">
            Your Leave has been requested and will be updated within EOD
          </p>
        </div>
      </main>
    </div>
  );
};

export default ThankYouPage;
