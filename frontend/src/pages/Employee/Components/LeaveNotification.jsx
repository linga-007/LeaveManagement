import React from 'react';

const LeaveNotification = ({ totalLeaveDays, casualLeaveDays, lopDays, handleCancel, handleConfirm }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Leave Application Summary</h2>
        
        <p className="mb-2">
          You are applying for a total of <strong>{totalLeaveDays}</strong> day(s) of leave.
        </p>
        
        <p className="mb-2">
          You will be granted <strong>{casualLeaveDays}</strong> day(s) of Casual Leave (CL).
        </p>

        {lopDays > 0 ? (
          <p className="mb-4">
            The remaining <strong>{lopDays}</strong> day(s) will be applied as Loss of Pay (LOP).
          </p>
        ) : (
          <p className="mb-4">
            You have enough Casual Leave (CL) to cover the entire period.
          </p>
        )}

        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveNotification;
