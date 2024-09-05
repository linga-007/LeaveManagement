import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Sidenav from "./Sidenav";
import Leaves from "./Leaves";
import Charts from "./Charts";
import axios from "axios";
import { MdMessage } from "react-icons/md";
import { toast } from "react-toastify";
import Card from "./Card";
import PermissionTable from "./PermissionTable";
import {jwtDecode} from 'jwt-decode';
import Circular from "./Circular";

import Table from "./Table";

const AdminHome = () => {

  const token = document.cookie.split('=')[1];
  const decodedToken = jwtDecode(token);
  const empId = decodedToken.empId;

  const headers = [
    "Name",
    "Employee-Type",
    "Leave-Type",
    "From",
    "To",
    "Days",
    "Reason",
    "Action",
  ];

  const [selected, setSelected] = useState("Today");

  const departments = [
    "Computer Science",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Biomedical Engineering",
    // Add more departments as needed
  ];
  const [inputValue, setInputValue] = useState(""); // Default value
  const [filteredOptions, setFilteredOptions] = useState(departments);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = departments.filter((dept) =>
      dept.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredOptions(filtered);
    setShowDropdown(true); // Show dropdown on typing
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setShowDropdown(false); // Hide dropdown after selection
  };

  const getButtonClass = (option) =>
    `pl-2 pr-2 pt-1 pb-1 rounded-lg w-20px cursor-pointer transition-colors duration-300 ${
      selected === option ? "bg-[#6d67e4] text-white" : "bg-transparent"
    }`;

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReason, setSelectedReason] = useState(null);
  const rowsPerPage = 6; // Adjust as needed
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const [isRequest , setIsRequest] = useState(false);
  const [isPermission , setIsPermission] = useState(false);

 

  

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const dataToDisplay = data.slice(startIndex, endIndex);

  return (
    <div className="flex w-screen h-screen">
      <Sidenav setIsRequest = {setIsRequest } setIsPermission = {setIsPermission}/>
      <main className="flex flex-col pt-2 w-screen h-screen">
        {/* <div className="w-full flex justify-between h-12 mb-5 items-center pl-5 pr-5 bg-slate-100 border-slate-950 rounded-lg">
          <h2 className="font-semibold text-xl">Dashboard</h2>
          <div>
            <img src={profile} alt="profile" width={40} height={40} />
          </div>
        </div> */}
        <Nav />
        <div className="w-full h-full ">
          <div className="w-full h-[98%] flex justify-between items-center">
          <div className="w-[75%] h-full p-5 ">
            <div className="h-20px w-full flex justify-between gap-10 pb-5">
            <div className="w-[48%]">
            {/* <label className="block text-gray-700 mb-1">Leave Type</label> */}
            <select
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring `}
              // value={leaveType}
              // onChange={(e) => setLeaveType(e.target.value)}
            >
              <option value="">Select Department</option>
              <option value="Casual Leave">Casual Leave</option>
              {decodedToken.role !== "3P" && <option value="privilege Leave">CSE</option>}
              {decodedToken.role !== "3P" && <option value="Paternity Leave">ECE</option>}
              {decodedToken.role !== "3P" && <option value="Paternity Leave">EEE</option>}
              {decodedToken.role !== "3P" && <option value="Paternity Leave">MECH</option>}
            </select>
            {/* {errors.leaveType && <p className="text-red-500 text-sm">{errors.leaveType}</p>} */}
          </div>
              <div className="h-[10%]  flex gap-5  border-2 solid p-1 radius-2px rounded-lg">
                <div
                  className={getButtonClass("Today")}
                  onClick={() => setSelected("Today")}
                >
                  Today
                </div>
                <div
                  className={getButtonClass("Weekly")}
                  onClick={() => setSelected("Weekly")}
                >
                  Weekly
                </div>
                <div
                  className={getButtonClass("Month")}
                  onClick={() => setSelected("Month")}
                >
                  Month
                </div>
                <div
                  className={getButtonClass("Year")}
                  onClick={() => setSelected("Year")}
                >
                  Year
                </div>
              </div>
            </div>
            <div className="w-full h-fit p-1 rounded-lg">
              <div className="flex justify-between">
                <Card label="Total Leaves Requested" value="20" image="gmail" />
                <Card label="Total Leaves Granted" value="15" image="accept" />
                <Card label="Total Leaves Denied" value="5" image="cancel" />
              </div>
            </div>
          {isRequest ? <div><Table/></div> : isPermission ?  <div><PermissionTable/></div> : <div> <Charts/></div>} 

          </div>
          <div className="w-[25%] h-[100%] flex justify-center border-x-2 solid">
            <Circular/>
          </div>
        </div>
          </div>

        {/* Modal for displaying reason */}
        
      </main>
      <div className="fixed bottom-0 left-0 w-full text-black  text-center text-sm p-2">
            <a href="https://sece.ac.in/" target="_blank" rel="noopener noreferrer">
              Copyright©2024 Sri Eshwar Technologies PVT LTD
            </a>
          </div>
   
    </div>
  );
};

export default AdminHome;
