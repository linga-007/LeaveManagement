import React, { useState } from 'react';
import Pagination from './Pagination';

const LeaveHistoryTable = (props) => {
  const tableHead = ["S.No", "Employee Name", "Leave Type", "From Date", "To Date", "No of Days", "Reason Type", "Reason of Leave", "Status", "LOP"];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(props.LeaveLogs.length / rowsPerPage);

  const currentData = props.LeaveLogs.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <div className='w-[100%] p-1 bg-slate-100 rounded-lg'>
        <h1 className='text-xl font-semibold mb-2'>
          Leave Log
        </h1>
        <div className='flex flex-wrap flex-col w-[100%]'>
          <table className='table-fixed'>
            <thead className="divide-y divide-gray-200 bg-white">
              <tr className="bg-gray-50">
                {tableHead.map((val, index) => (
                  <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-widest">
                    {val}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((val, index) => {
                // Determine background color based on status
                const statusBgColor = val.status === "Approved" ? "bg-green-100" : val.status === "Denied" ? "bg-red-100" : "bg-yellow-100";

                return (
                  <tr key={index}>
                    <td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-center text-gray-900'>{index + 1}</td>
                    <td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-center text-gray-900'>{val.empName}</td>
                    <td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-center text-gray-900'>{val.leaveType}</td>
                    <td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-center text-gray-900'>{val.from.date}</td>
                    <td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-center text-gray-900'>{val.to.date}</td>
                    <td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-center text-gray-900'>{val.numberOfDays}</td>
                    <td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-center text-gray-900'>{val.reasonType}</td>
                    <td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-center text-gray-900'>{val.reason}</td>
                    <td className={`px-3 py-2 whitespace-nowrap text-sm font-medium text-center text-gray-900 ${statusBgColor}`}>
                      {val.status}
                    </td>
                    <td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-center text-gray-900'>{val.isLOP ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}

export default LeaveHistoryTable;
