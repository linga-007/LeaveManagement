
import React, { useEffect, useState } from 'react';
import { render } from '@react-email/render';
import EmailTemplate from '../../EmailTemplate';
import {jwtDecode} from "jwt-decode"


import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import axios from 'axios';
import { json } from 'react-router-dom';

const LeaveApplyForm = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveDetail, setLeaveDetail] = useState("");
  const [fromFirstHalf, setFromFirstHalf] = useState(false);
  const [fromSecondHalf, setFromSecondHalf] = useState(false);
  const [toFirstHalf, setToFirstHalf] = useState(false);
  const [toSecondHalf, setToSecondHalf] = useState(false);

  const [leaveType, setLeaveType] = useState("Casual Leave");
  const [leaveReason, setLeaveReason] = useState("Personal");
  const [selectedOption, setSelectedOption] = useState('Leave Application');
  const [permissionDate,setPermissionDate] = useState("");
  const [fromTime, setFromTime] = useState(dayjs()); 
  const [toTime, setToTime] = useState(dayjs()); 
  const [permissionReason,setPermissionReason] = useState("") 
  const [numberOfDays, setNumberOfDays] = useState(0);
  // const [leaveId,setLeaveId] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleConfirm = async() => {
     console.log("check")
    try {
      const res = await axios.post(
        "http://localhost:5000/leave/applyLOP",
        {
          "empId": "3P1",
          "leaveType": leaveType,
           "from": {
              "date": fromDate,
              "first-half": fromFirstHalf,
              "second-half" : fromSecondHalf
           },
           "to": {
              "date": toDate,
              "first-half": toFirstHalf,
              "second-half": toSecondHalf
           },
           "numberOfDays": numberOfDays,
           "reason": "Personal"
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      
     var data = res.data;
      console.log(data.leave._id)
     
      sendEmail(data.leave._id,"True");
      
      console.log("data", res.data);
    } catch (error) {
      console.error("Error Leave Apply", error);
    }finally{
      setIsOpen(!isOpen);
    }
    
  };

  const handleCancel = () => {
    console.log("Cancelled!");
    togglePopup();
  };

  useEffect(() => {
    if (fromDate && toDate) {
      const diff = dayjs(toDate).diff(dayjs(fromDate), 'day') + 1; // Adding 1 to include both fromDate and toDate
      setNumberOfDays(diff);
      console.log(diff)
    }
  }, [fromDate, toDate]);

  
  


  const handleToggle = () => {
    setSelectedOption(selectedOption === 'Leave Application' ? 'Permission' : 'Leave Application');
  };

  const token = document.cookie.split('=')[1];
  console.log(token)
  const decodedToken = jwtDecode(token);
  console.log("in",decodedToken.empId)

  const dataPrint = ()=>{
    console.log("Check Data:")
    console.log(leaveDetail,leaveReason,leaveType)
  }

  dataPrint()
  const sendData = async (e) => {

    

    e.preventDefault()
    try {
      const res = await axios.post(
        "http://localhost:5000/leave/apply",
        {
          "empId": "3P1",
          "leaveType": leaveType,
           "from": {
              "date": fromDate,
              "first-half": fromFirstHalf,
              "second-half" : fromSecondHalf
           },
           "to": {
              "date": toDate,
              "first-half": toFirstHalf,
              "second-half": toSecondHalf
           },
           "numberOfDays": numberOfDays,
           "reason": "Personal"
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if(res.status === 202){
        setIsOpen(!isOpen);
        console.log(isOpen)
      }
     var data = res.data;
      console.log(data.leave._id)
      // setLeaveId(data.leave._id)
    //  console.log("mailId",leaveId)
      sendEmail(data.leave._id,"false");
      
      // Update the value array based on the retrieved data
      
      
      console.log("data", res.data);
    } catch (error) {
      console.error("Error Leave Apply", error);
    }
  };

  

  var img = "https://www.gilbarco.com/us/sites/gilbarco.com.us/files/2022-07/gilbarco_logo.png"
  const sendEmail = async (objId,LOP) => {

    console.log("rksweufghou",leaveType,leaveReason)
    const emailContent = await render(
      <EmailTemplate
        leaveType={leaveType}
        fromDate={fromDate}
        toDate={toDate}
        leaveReason={leaveReason}
        userName={decodedToken.empId}
        imageUrl={img}
        leaveId = {objId}
        LOP ={LOP}
      />
    );
  
    try {
      const response = await axios.post(
        'http://localhost:5000/mail/send  ',
        {
          email: "kkishorekumar536@gmail.com",
          html: emailContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        alert('Email sent successfully');
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error("Error sending email:", error.response ? error.response.data : error.message);
      alert('Error sending email');
    }
  };

  const applyPermission = async (e)=>{
    e.preventDefault()
    try {
      const res = await axios.post(
        "http://localhost:5000/permission/apply",
        {
          empId:decodedToken.empId,
          hrs:1,
          reason:permissionReason
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
     var data = res.data;      
      
      console.log("data", res.data);
    } catch (error) {
      console.error("Error Leave Apply", error);
    }
  }

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
      <form onSubmit={sendData} className='w-[90%] flex justify-center'>
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
                <option value="Casual Leave">Casual Leave</option>
                <option value="Privelage Leave">Privelage Leave</option>
                <option value="Paternity Leave">Paternity Leave</option>
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
                <option value="Personal">Personal Leave</option>
                <option value="Medical">Medical Leave</option>
                <option value="Peternity">Paternity Leave</option>
                <option value="Family Function">Family Function</option>
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
                value={permissionDate}
            // Ensure toDate cannot be earlier than fromDate
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
                value={permissionReason}
                onChange={(e) => setPermissionReason(e.target.value)}
                required
              />
            </div>
            <div className='flex items-center justify-center '>
              <button  className='h-fit bg-blue-500 py-2 px-7 mx-2 rounded-lg shadow-lg'>
                Apply
              </button>
            </div>
      </div>
        }
      </form>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Popup Title</h2>
            <p className="mb-4">This is a simple popup message.</p>
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
      )}
    </div>
  );
};

export default LeaveApplyForm;
