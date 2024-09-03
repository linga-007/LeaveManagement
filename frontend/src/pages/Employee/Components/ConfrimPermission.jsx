import React from 'react';

const ConfirmPermission = ({
  hours,
  reason,
  fromTime,
  toTime,
  permissionDate,
  employeeName,
  onClose,
  applyPermission
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Permission Application Details</h2>
        <div className="mb-2">
          <span className="font-semibold">Employee Name:</span> {employeeName}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Permission Date:</span> {permissionDate}
        </div>
        <div className="mb-2">
          <span className="font-semibold">From Time:</span> {fromTime}
        </div>
        <div className="mb-2">
          <span className="font-semibold">To Time:</span> {toTime}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Hours:</span> {hours}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Reason:</span> {reason}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => onClose(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={()=>applyPermission()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPermission;
