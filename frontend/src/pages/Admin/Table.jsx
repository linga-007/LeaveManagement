import React from "react";
import axios from "axios";
import Pagination from './Pagination'
import { useState , useEffect } from "react";
import {MdMessage} from 'react-icons/md'
import {jwtDecode} from 'jwt-decode';


const Table = () => {

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

const token = document.cookie.split('=')[1];
console.log("ij table component" , token)
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
          const response = await axios.post('http://localhost:5000/leave/approve',
            { empId },

            { headers: {
            // Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },}
          );
    
        //   if (response.status === 200) {
        //     toast.success('Leave request approved successfully!');
        //   } else {
        //     toast.error('Failed to approve leave request.');
        //   }
    
          getData();
        } catch (error) {
          console.error('Error accepting leave:', error);
        }
      };
    
      const handleReject = async (id) => {
        try {
          const response = await axios.post('http://localhost:5000/leave/deny',
            { id },
            { headers: { 'Content-Type': 'application/json' } }
          );
        //   if (response.status === 200) {
        //     toast.success('Leave request declined successfully!');
        //   } else {
        //     toast.error('Failed to decline leave request.');
        //   }
    
          getData();
        } catch (error) {
          console.error('Error rejecting leave:', error);
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
          const response = await axios.post('http://localhost:5000/leave/getLeave', 
            {empId},
            {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          console.log(response)
          const filteredData = response.data.data.filter(record => record.status === 'Pending');
          setData(filteredData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const dataToDisplay = data.slice(startIndex, endIndex);
    
    
  return (
    <div className="w-full h-auto bg-slate-100 p-3 border-slate-950 rounded-lg">
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
              <tr key={rowIndex}>
                <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                  {row.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                  {row.empType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                  {row.leaveType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                  {row.from}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                  {row.to}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                  {row.numberOfDays}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-2xl font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleReasonClick(row.reason)}
                >
                  <MdMessage />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex flex-row gap-4">
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
    </div>
  );
};

export default Table;
