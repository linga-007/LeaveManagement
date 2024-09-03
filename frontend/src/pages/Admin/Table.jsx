import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from './Pagination';
import { MdMessage, MdClose } from 'react-icons/md';
import {jwtDecode} from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// Set root element for accessibility

const Table = () => {
  const headers = [
    "S.No",
    "Name",
    "Employee-Type",
    "Leave-Type",
    "From",
    "To",
    "Days",
    "Reason",
    "Action",
  ];

  const [isPopupOpen, setPopupOpen] = useState(false);

  const token = document.cookie.split('=')[1];
  const decodedToken = jwtDecode(token);
  const empId = decodedToken.empId;

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
      const response = await axios.post(`http://localhost:5000/leave/accept`, 
        { leaveId: id },
        { headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        toast.success('Leave request approved successfully!');
      } else {
        toast.error('Failed to approve leave request.');
      }

      getData();
    } catch (error) {
      console.error('Error accepting leave:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5000/leave/deny`,
        { leaveId: id },
        { headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        toast.success('Leave request declined successfully!');
      } else {
        toast.error('Failed to decline leave request.');
      }

      getData();
    } catch (error) {
      console.error('Error rejecting leave:', error);
    }
  };

  const handleReasonClick = (reason) => {
    setSelectedReason(reason);
    setPopupOpen(true);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/leave/getLeave', 
        { empId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const filteredData = response.data.filter(record => record.status === 'Pending').reverse();
      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const dataToDisplay = data.slice(startIndex, endIndex);

  return (
    <div className="w-full bg-slate-100 p-3 border-slate-950 rounded-lg">
      <ToastContainer />
      <div className="w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left font-bold text-sm text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataToDisplay.map((row, rowIndex) => (
              <tr key={rowIndex + 1}>
                <td className="px-4 py-2 whitespace-nowrap text-md font-medium text-gray-900 justify-center items-center">
                  {rowIndex + 1}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-md font-medium text-gray-900 justify-center items-center">
                  {row.empName}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-md font-medium text-gray-900 justify-center items-center">
                  {row.role}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-md font-medium text-gray-900 justify-center items-center">
                  {row.leaveType}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-md font-medium text-gray-900 justify-center items-center">
                  {row.from.date}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-md font-medium text-gray-900 justify-center items-center">
                  {row.to.date}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-md font-medium text-gray-900 justify-center items-center">
                  {row.numberOfDays}
                </td>
                <td
                  className="px-4 py-2 whitespace-nowrap text-2xl font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleReasonClick(row.reason)}
                >
                  <MdMessage />
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 flex flex-row gap-4">
                  <button
                    className="text-green-500 hover:text-green-700 text-2xl"
                    onClick={() => handleAccept(row._id)}
                  >
                    ☑
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 text-2xl"
                    onClick={() => handleReject(row._id)}
                  >
                    ☒
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        content={selectedReason}
      />

      {/* Modal for displaying reason */}
      
    </div>
  );
};

const Popup = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Popup Content */}
      <div className="bg-white text-black p-6 rounded-lg shadow-lg z-10 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-black">Details</h2>
          <button
            onClick={onClose}
            className="text-black  hover:text-gray-500 dark:hover:text-gray-400"
          >
            <MdClose size={24} />
          </button>
        </div>
        <div className="text-black ">
          {content}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
