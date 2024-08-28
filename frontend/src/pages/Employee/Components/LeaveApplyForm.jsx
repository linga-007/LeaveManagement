
import React, { useState } from 'react';
import { render } from '@react-email/render';
import EmailTemplate from '../../EmailTemplate';


import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

const LeaveApplyForm = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [leaveDetail, setLeaveDetail] = useState('');
  const [fromFirstHalf, setFromFirstHalf] = useState(false);
  const [fromSecondHalf, setFromSecondHalf] = useState(false);
  const [toFirstHalf, setToFirstHalf] = useState(false);
  const [toSecondHalf, setToSecondHalf] = useState(false);

  const [leaveType, setLeaveType] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [selectedOption, setSelectedOption] = useState('Leave Application');
  const [permissionDate,setPermissionDate] = useState("");
  const [fromTime, setFromTime] = useState(dayjs()); 
  const [toTime, setToTime] = useState(dayjs()); 
  const [permissionReason,setPermissionReason] = useState("") 


  const handleToggle = () => {
    setSelectedOption(selectedOption === 'Leave Application' ? 'Permission' : 'Leave Application');
  };

  var img = "https://www.gilbarco.com/us/sites/gilbarco.com.us/files/2022-07/gilbarco_logo.png";
  const sendEmail = async (e) => {
    e.preventDefault();

    const emailContent = await render(
      <EmailTemplate
        leaveType={leaveType}
        fromDate={fromDate}
        toDate={toDate}
        leaveReason={leaveDetail}
        userName="Kishore"
        imageUrl={img}
        fromFirstHalf={fromFirstHalf ? "Yes" : "No"}
        fromSecondHalf={fromSecondHalf ? "Yes" : "No"}
        toFirstHalf={toFirstHalf ? "Yes" : "No"}
        toSecondHalf={toSecondHalf ? "Yes" : "No"}
      />
    );

    console.log(emailContent);
    const response = await fetch("http://localhost:5001/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailContent }),
    });

    

    if (response.ok) {
      alert("Email sent successfully!");
    } else {
      alert("Failed to send email.");
    }

  };

  return (
    <div className='w-[80%] shadow-lg mx-2 p-4'>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4">{selectedOption}</h2>
        <div className="w-[25%] bg-gray-300 rounded-lg cursor-pointer" onClick={handleToggle}>
          <div
            className={`p-2.5 top-0 w-[50%] text-[2vh]  text-sm rounded-lg bg-blue-500 text-white flex items-center justify-center transition-transform duration-300 ${
              selectedOption === 'Leave Application' ? 'transform translate-x-0' : 'transform translate-x-full'
            }`}
          >
            {selectedOption}
          </div>
        </div>
      </div>

      <form onSubmit={sendEmail} className='w-[90%] flex justify-center'>
        {selectedOption === 'Leave Application'? <div className='w-[95%]'>
          <div className='flex w-full justify-between'>
            <div className='w-[40%]'>
              <label className="block text-gray-700 mb-1">Leave Type</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                required
              >
                <option value="sick">Sick Leave</option>
                <option value="vacation">Vacation Leave</option>
                <option value="casual">Casual Leave</option>
              </select>
            </div>

            <div className="w-[40%]">
              <label className="block text-gray-700 mb-1">Leave Reason</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
                required
              >
                <option value="sick">Personal Leave</option>
                <option value="vacation">Medical Leave</option>
                <option value="casual">Paternity Leave</option>
                <option value="casual">Family Function</option>
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

                onChange={(e) => {
                  setFromDate(e.target.value);
                  setToDate(e.target.value); // Set toDate to fromDate initially
                }}

              />
            </div>


            <div className='flex w-[40%] justify-around'>

              <div className="flex items-center mt-7">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={fromFirstHalf}
                  onChange={() => setFromFirstHalf(!fromFirstHalf)}
                />
                <label className="ml-2 text-gray-700">First Half</label>
              </div>

              <div className="flex items-center mt-7">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={fromSecondHalf}
                  onChange={() => setFromSecondHalf(!fromSecondHalf)}
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
                min={fromDate} // Ensure toDate cannot be earlier than fromDate
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
                  onChange={() => setToFirstHalf(!toFirstHalf)}
                />

                <label className="ml-2 text-gray-700">First Half</label>

              </div>

              <div className="flex items-center mt-7">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={toSecondHalf}
                  onChange={() => setToSecondHalf(!toSecondHalf)}
                />
                <label className="ml-2 text-gray-700">Second Half</label>
              </div>
            </div>
          </div>

          <div className='flex justify-between'>
            <div className='w-[80%]'>
              <label className="block text-gray-700 mb-1">Reason for Leave</label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                rows="2"
                value={leaveDetail}
                onChange={(e) => setLeaveDetail(e.target.value)}
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
        :
      <div className='w-[100%] p-4'>

            <div className='mr-4 w-[60%]'>
              <label className="block text-gray-700 mb-1">Permission on</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={toDate}
                min={fromDate} // Ensure toDate cannot be earlier than fromDate
                onChange={(e) => setPermissionDate(e.target.value)}
                required
              />
            </div>


        <div className='flex w-[50%] justify-between'>
        <div className="mt-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileTimePicker
            label="Select Time"
            value={fromTime}
            onChange={(newValue) => setFromTime(newValue)}
          />
        </LocalizationProvider>
      </div>

      <div className="mt-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileTimePicker
            label="Select Time"
            value={toTime}
            minTime={fromTime}
            onChange={(newValue) => setToTime(newValue)}
          />
        </LocalizationProvider>
      </div>
        </div>
         
         

      <div className='w-[80%]'>
              <label className="block text-gray-700 mb-1">Reason for Leave</label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                rows="2"
                value={leaveDetail}
                onChange={(e) => setPermissionReason(e.target.value)}
                required
              />
            </div>
            <div className='flex items-center justify-center '>
              <button className='h-fit bg-blue-500 py-2 px-7 mx-2 rounded-lg shadow-lg'>
                Apply
              </button>
            </div>
      </div>
        }
      </form>

    </div>
  );
};

export default LeaveApplyForm;
