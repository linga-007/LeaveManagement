import React from "react";
import GVRLogo from "../../images/GVRLogo.png";

const LandingPage = () => {
  return (
    <div className="flex w-screen h-screen">
      <main className="flex flex-col pl-5 pr-5 pt-2 w-screen h-screen">
        <div className=" flex h-fit  items-center p-5 border-slate-950 rounded-lg">
          <img src={GVRLogo} alt="company-logo" width={200} height={100}></img>
        </div>
        <div className="w-full h-full p-5  flex justify-between items-center ">
            <div className = "p-5 mx-5 my-5 flex flex-col justify-center items-start w-full h-[80%] gap-5 ">
                <div className="font-semibold text-5xl ">
                    <p>
                        Our Analysis is your <br></br> Financial results
                    </p>
                </div>
                <div className="font-semibold text-2xl ">
                    <p>
                        Some other content to be displayed
                    </p>
                </div>
                <div className="font-semibold text-2xl ">
                    <p className="w-full">
                        Some other content to be diplayed
                    </p>
                </div>

            </div>

            <div className = "p-5 mx-5 my-5 flex flex-col justify-center items-end w-full h-[80%] ">
                <p>data</p>
                <p>data</p>
                <p>data</p>

            </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
