import React from 'react';

const ConfirmLeave = ({ fromDate, toDate, leaveReason, leaveType, leaveDescription, onClose , numberOfDays , applyLeave }) => {

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Leave Application Details</h2>
        <div className="mb-2">
          <span className="font-semibold">From Date:</span> {fromDate}
        </div>
        <div className="mb-2">
          <span className="font-semibold">To Date:</span> {toDate}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Number of Days:</span> {numberOfDays}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Leave Type:</span> {leaveType}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Reason for Leave:</span> {leaveReason}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Description:</span> {leaveDescription}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={()=>onClose(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={() => applyLeave()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLeave;
