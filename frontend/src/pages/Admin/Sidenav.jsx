import React, { useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { IoTimer } from "react-icons/io5";
import { VscRequestChanges } from "react-icons/vsc";

const Sidenav = ({ setIsRequest, setIsPermission }) => {
  const [selected, setSelected] = useState("dashboard");

  const handleClick = (section) => {
    setSelected(section);
    if (section === "dashboard") {
      setIsRequest(false);
      setIsPermission(false);
    } else if (section === "leaves") {
      setIsRequest(true);
      setIsPermission(false);
    } else if (section === "permission") {
      setIsPermission(true);
      setIsRequest(false);
    }
  };

    const getDivClass = (section) => {
      return section === selected
        ? "bg-gray-300  p-2"
        : "bg-slate-100  p-2";
    };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-slate-100 h-full  rounded-xl flex flex-col items-center gap-y-[3rem] py-[2rem]">
        <div className={getDivClass("dashboard")}>
          <button
            onClick={() => handleClick("dashboard")}
            className="icon-a icon-hover flex items-center justify-center flex-col gap-y-2"
          >
            <MdDashboard className="text-3xl text-black" />
            <p className="text-md font-semibold text-black">Dashboard</p>
          </button>
        </div>
        <div className={getDivClass("leaves")} style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
          <button
            onClick={() => handleClick("leaves")}
            className="icon-a icon-hover flex items-center justify-center flex-col gap-y-2"
          >
            <VscRequestChanges className="text-3xl" />
            <p className="text-md font-semibold">Leaves</p>
          </button>
        </div>
        <div className={getDivClass("permission")}>
          <button
            onClick={() => handleClick("permission")}
            className="icon-a icon-hover flex items-center justify-center flex-col gap-y-2"
          >
            <IoTimer className="text-3xl" />
            <p className="text-md font-semibold">Permission</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
