import React from "react";
import Disclaimer from "./Disclaimer";
import GVRLogo from '../../images/GVRLogo.png';

const Thankyou = () => {
  return (
    <>
    <div>
    <div className=" flex h-fit  items-center p-5 border-slate-950 rounded-lg">
          <img src={GVRLogo} alt="company-logo" width={200} height={100}></img>
        </div>
    </div>
      <div className="flex flex-col gap-10 items-center justify-start pt-10 h-full w-full ">
      
        <div className="bg-gray-100 w-[700px] p-8 h-[500px] rounded-lg shadow-xl">
          <div className="flex flex-col gap-8">
            <p className="font-semibold text-3xl mb-5">Leave Details</p>
            <div className="flex gap-5">
              <p className="font-semibold text-xl ">Leave Requested On :</p>
              <p className="text-xl"> 25/4/2024 </p>
            </div>
            <div className="flex gap-5">
              <p className="font-semibold text-xl ">Total Number of Days :</p>
              <p className="text-xl"> 2 </p>
            </div>
            <div className="flex gap-5 w-full justify-between">
              <div className="w-[50%] flex gap-4">
                <p className="font-semibold text-xl ">From Date:</p>
                <p className="text-xl"> 26/4/2024 </p>
              </div>
              <div className="w-[50%] flex gap-4">
                <p className="font-semibold text-xl ">To Date :</p>
                <p className="text-xl"> 27/4/2024 </p>
              </div>
            </div>
            <div className="flex gap-5">
              <p className="font-semibold text-xl ">Requesting Manager :</p>
              <p className="text-xl"> Lingeshwaran K V </p>
            </div>
            <Disclaimer/>
            
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold text-5xl">Thank You !</h1>
        </div>
      </div>
    </>
  );
};

export default Thankyou;
