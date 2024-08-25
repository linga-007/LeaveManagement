import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import profile from '../../images/profile.png';
import Pagination from "./Pagination";
import axios from "axios";
import { MdMessage } from "react-icons/md";
import { toast } from "react-toastify";
import Card from "./Card";
import Box from "./Box";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

const AdminHome = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhIiwicm9sZSI6InR5cGUtSSIsImlhdCI6MTcyMzI5NDA0MywiZXhwIjoxNzIzODk4ODQzfQ.Hj7RcI6VAkWylWET3omcIZUgwlDf8Ffpx9pBKvdAGZs"; // Replace with your token
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAccept = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/leave/approve",
        { id },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        toast.success("Leave request approved successfully!");
      } else {
        toast.error("Failed to approve leave request.");
      }

      getData();
    } catch (error) {
      console.error("Error accepting leave:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/leave/deny",
        { id },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        toast.success("Leave request declined successfully!");
      } else {
        toast.error("Failed to decline leave request.");
      }

      getData();
    } catch (error) {
      console.error("Error rejecting leave:", error);
    }
  };

  const handleReasonClick = (reason) => {
    setSelectedReason(reason);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/leave/getLeaves",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const filteredData = response.data.data.filter(
        (record) => record.status === "Pending"
      );
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const dataToDisplay = data.slice(startIndex, endIndex);

  return (
    <div className="flex w-screen h-screen">
      <Nav username="Admin" />
      <main className="flex flex-col pl-5 pr-5 pt-2 w-screen h-screen">
        {/* <div className="w-full flex justify-between h-12 mb-5 items-center pl-5 pr-5 bg-slate-100 border-slate-950 rounded-lg">
          <h2 className="font-semibold text-xl">Dashboard</h2>
          <div>
            <img src={profile} alt="profile" width={40} height={40} />
          </div>
        </div> */}

        <div className="w-full h-full flex justify-between">
          <div className="w-[80%] h-full p-5  ">
            <div className="h-20px w-full flex justify-between gap-10 pb-5">
              <div>
                <div className="relative w-64">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setShowDropdown(true)} // Show dropdown on focus
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search department..."
                  />
                  {showDropdown && (
                    <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md max-h-48 overflow-y-auto z-10">
                      {filteredOptions.length ? (
                        filteredOptions.map((option, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleOptionClick(option)}
                          >
                            {option}
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-gray-500">
                          No results found
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
              <div className="flex gap-5  border-2 solid p-1 radius-2px rounded-lg">
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
            <div className="w-full h-fit p-5 rounded-lg">
              <div className="flex justify-between">
                <Card label="Total Leaves Requested" value="20" image="gmail" />
                <Card label="Total Leaves Granted" value="15" image="accept" />
                <Card label="Total Leaves Denied" value="5" image="cancel" />
              </div>
            </div>
            <div className="w-full h-fit p-5 rounded-lg">
              <div className="flex justify-between">
                <BarChart />
                {/* <DoughnutChart/> */}
                <DoughnutChart/>
              </div>
            </div>
            <div className="w-full h-fit rounded-lg">
            <LineChart/>
            </div>
          </div>
          <div className="w-[20%] h-full border-x-2 solid">
            
          </div>
        </div>

        {/* Modal for displaying reason */}
      </main>
    </div>
  );
};

export default AdminHome;
