import React, { useState } from 'react';

const LeaveApplyForm = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [fromFirstHalf, setfromFirstHalf] = useState(false);
  const [fromSecondHalf, setfromSecondHalf] = useState(false);
  const [toFirstHalf, settoFirstHalf] = useState(false);
  const [toSecondHalf, settoSecondHalf] = useState(false);
  const [leaveType, setLeaveType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ fromDate, toDate, leaveReason, leaveType });
  };

  return (
    <div className='w-[80%] shadow-lg mx-2 p-2 border-2 border-black'>
      <h2 className="text-2xl font-bold mb-4">Leave Apply Form</h2>
      <form onSubmit={handleSubmit} className='w-[90%] flex justify-center'>
        <div className='w-[95%]'>
          
          <div className='flex w-full justify-between'>
            <div className='w-[40%]'>
              <label className="block text-gray-700 mb-1">Leave Type</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                required
              >
                <option value="">Select Leave Type</option>
                <option value="sick">Sick Leave</option>
                <option value="vacation">Vacation Leave</option>
                <option value="casual">Casual Leave</option>
              </select> 
            </div>

            <div className='w-[40%]'>
              <label className="block text-gray-700 mb-1">Leave Type</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                required
              >
                <option value="">Select Leave Type</option>
                <option value="sick">Sick Leave</option>
                <option value="vacation">Vacation Leave</option>
                <option value="casual">Casual Leave</option>
              </select>
            </div>
          </div>

            <div className='w-[100%] flex justify-between'>
              <div className='mr-4 w-[60%]'>
                <label className="block text-gray-700 mb-1">From Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  required
                />
              </div>

              <div className='flex w-[40%] justify-around'>
                <div className="flex items-center mt-7">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={fromFirstHalf}
                    onChange={() => setfromFirstHalf(!fromFirstHalf)}
                  />
                  <label className="ml-2 text-gray-700">First Half</label>
                </div>

                <div className="flex items-center mt-7">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={fromSecondHalf}
                    onChange={() => setfromSecondHalf(!fromSecondHalf)}
                  />
                  <label className="ml-2 text-gray-700">Second Half</label>
                </div>
              </div>
            </div>

            
            <div className='w-[100%] flex justify-between'>
              <div className='mr-4 w-[60%]'>
                <label className="block text-gray-700 mb-1">To Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  required
                />
              </div>

              <div className='flex w-[40%] justify-around'>
                <div className="flex items-center mt-7">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={toFirstHalf}
                    onChange={() => settoFirstHalf(!toFirstHalf)}
                  />
                  <label className="ml-2 textay-700">First Half</label>
                </div>

                <div className="flex items-center mt-7">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={toSecondHalf}
                    onChange={() => settoSecondHalf(!toSecondHalf)}
                  />
                  <label className="ml-2 text-gray-700">Second Half</label>
                </div>
              </div>
            </div>

           <div className='flex justify-between'>
           <div className='w-[80%]' >
          <label className="block text-gray-700 mb-1">Leave Reason</label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            rows="2"
            value={leaveReason}
            onChange={(e) => setLeaveReason(e.target.value)}
            required
          />
        </div>
            <div className='flex items-center justify-center '>
              <button className='h-fit bg-blue-500 py-2 px-7 mx-2 rounded-lg shadow-lg'>
                  Apply
            </button>
        </div>
        
            </div> 
           
          </div>
        </form>
    </div>
  );
};

export default LeaveApplyForm;
