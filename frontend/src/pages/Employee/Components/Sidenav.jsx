import { useState } from "react";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Sidenav = () => {
  const [activeLink, setActiveLink] = useState(null);
  const location = useLocation();

  const token = document.cookie.split("=")[1];
  const decodedToken = jwtDecode(token);
  const id = decodedToken.empId;

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#f5f6f7] h-full w-[7rem] flex flex-col items-center gap-y-[3rem] py-[2rem] p-3">
        <Link
          to={`/Employee`}
          className={`flex items-center justify-center flex-col gap-y-2 w-full p-4 ${
            location.pathname === `/Employee` ? "bg-gray-300" : ""
          }`}
          onClick={() => handleLinkClick("leave")}
        >
          <IoCalendarNumberSharp className="text-4xl font-semibold " />
          <p className="text-md font-semibold ">Leave</p>
        </Link>
        <Link
          to={`/history/${id}`}
          className={`flex items-center justify-center flex-col gap-y-2 w-full p-4 ${
            location.pathname === `/history/${id}` ? "bg-gray-300" : ""
          }`}
          onClick={() => handleLinkClick("application")}
        >
          <MdHistory className="text-4xl font-semibold " />
          <p className="text-md font-semibold ">Application</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidenav;
