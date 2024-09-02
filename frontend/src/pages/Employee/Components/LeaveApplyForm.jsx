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
  import PermissionEmailTemplate from '../../PermissionTemplate';
  import duration from 'dayjs/plugin/duration';

  dayjs.extend(duration);

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
    const [leaveId,setLeaveId] = useState("");
    const [leaveDescription, setLeaveDescription] = useState("");


    const [isOpen, setIsOpen] = useState(false);



    useEffect(() => {
      if (fromDate && toDate) {
        const diff = dayjs(toDate).diff(dayjs(fromDate), 'day') + 1; 
        setNumberOfDays(diff);
        console.log(diff)
      }
    }, [fromDate, toDate]);

    const handleToggle = () => {
      setSelectedOption(selectedOption === 'Leave Application' ? 'Permission' : 'Leave Application');
    };

  
    
    const togglePopup = () => {
      setIsOpen(!isOpen);
    };



    const isTimeExceeding = () => {
      const timeDifference = dayjs.duration(toTime.diff(fromTime)).asHours();
      console.log("time Difference",timeDifference)
      return timeDifference > 4;
  };


    const handleConfirm = async() => {
      console.log("check")
      try {
        const res = await axios.post(
          "http://localhost:5000/leave/applyLOP",
          {
            "empId": decodedToken.empId,
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
      
        sendLeaveEmail(data.leave._id,"True");
        
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

    
    const token = document.cookie.split('=')[1];
    console.log(token)
    const decodedToken = jwtDecode(token);
    console.log("in",decodedToken.empId)

    const dataPrint = ()=>{
      console.log("Check Data:")
      console.log(leaveDetail,leaveReason,leaveType)
    }
    dataPrint()
    const applyLeave = async (e) => {
      e.preventDefault()
      console.log("nothinggggg")
      try {
        const res = await axios.post(
          "http://localhost:5000/leave/apply",
          {
            "empId": decodedToken.empId,
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
        console.log("data",data)
        setLeaveId(data.leave._id)
        sendLeaveEmail(data.leave._id,"false");      
        
        console.log("data", res.data);
      } catch (error) {
        console.error("Error Leave Apply", error);
      }
    };

    

    var img = "https://www.gilbarco.com/us/sites/gilbarco.com.us/files/2022-07/gilbarco_logo.png"


    const sendLeaveEmail = async (objId,LOP) => {

       const fromDay = fromFirstHalf && fromSecondHalf || !fromFirstHalf&&!fromSecondHalf?"FullDay":fromFirstHalf&&!fromSecondHalf?"First Half of the day":"Second Half of the day"
       const toDay = toFirstHalf && toSecondHalf || !toFirstHalf&&!toSecondHalf?"FullDay":toFirstHalf&&!toSecondHalf?"First Half of the day":"Second Half of the day"


      const emailContent = await render(
      <EmailTemplate
      empId={decodedToken.empId}
      leaveType={leaveType}
      fromDate={fromDate}
      toDate={toDate}
      leaveReason={leaveReason}
      fromDay={fromDay}
      toDay={toDay}
      userName="aa"
      imageUrl="https://www.gilbarco.com/us/sites/gilbarco.com.us/files/2022-07/gilbarco_logo.png"
      leaveId={objId}
      LOP={LOP}/>
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

    const sendPermissionEmail = async (objId) => {
      const emailContent = await render(
        <PermissionEmailTemplate
        date = {permissionDate}
        fromTime = {fromTime.format("hh:mm A")}
        toTime={toTime.format("hh:mm A")}
        permissionReason = {permissionReason}
        userName = "aa"
        imageUrl = {img}
        permissionId = {objId}
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
    isTimeExceeding()
    const applyPermission = async (e)=>{
      e.preventDefault()
      console.log("permission")
      try {
          if (isTimeExceeding()) {
              alert("Time difference exceeds 4 hours");
          } else {
              alert("Time difference is within 4 hours");
          
        const res = await axios.post(
          "http://localhost:5000/permission/apply",
          {
            empId:decodedToken.empId,
            hrs:1,
            reason:permissionReason,
            from:fromTime.format(),
            to:toTime.format(),
            date:permissionDate
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      var data = res.data;    
        console.log("data", data.permission._id);
      sendPermissionEmail(data.permission._id)
      } 
    }catch (error) {
        console.error("Error Leave Apply", error);
      }
    }

    return (
      <div className=" h-fit  pt-2 pb-2 flex flex-wrap gap-2 justify-center">
      {/* Leave Application Form */}
      <div className="w-[48%] p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Leave Application</h2>
        <form onSubmit={applyLeave}>  
          {/* Leave Type and Reason */}
          <div className="flex justify-between mb-4">
            <div className="w-[48%]">
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

            <div className="w-[48%]">
              <label className="block text-gray-700 mb-1">Leave Reason</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
                required
              >
                <option value="Personal">Personal Leave</option>
                <option value="Medical">Medical Leave</option>
                <option value="Paternity">Paternity Leave</option>
                <option value="Family Function">Family Function</option>
              </select>
            </div>
          </div>

          {/* From Date and To Date */}
          <div className="flex justify-between mb-4">
            <div className="w-[48%]">
              <label className="block text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  setToDate(e.target.value);
                }}
              />
            </div>

            <div className="w-[48%]">
              <label className="block text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>

          {/* Half-Day Options */}
          <div className="flex justify-between mb-4">
            <div className="w-[48%] flex justify-around">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={fromFirstHalf}
                  onChange={(e) => setFromFirstHalf(e.target.checked)}
                />
                <span className="ml-2">First Half</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={fromSecondHalf}
                  onChange={(e) => setFromSecondHalf(e.target.checked)}
                />
                <span className="ml-2">Second Half</span>
              </label>
            </div>

            <div className="w-[48%] flex justify-around">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={toFirstHalf}
                  onChange={(e) => setToFirstHalf(e.target.checked)}
                />
                <span className="ml-2">First Half</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={toSecondHalf}
                  onChange={(e) => setToSecondHalf(e.target.checked)}
                />
                <span className="ml-2">Second Half</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Leave Reason</label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500 resize-none"
              value={leaveDescription}
              onChange={(e) => setLeaveDescription(e.target.value)}
              placeholder="Reason for permission"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#595d5e] text-white py-2 rounded-md  transition-colors duration-200"
          >
            Submit Leave Application
          </button>
        </form>
      </div>

      {/* Permission Form */}
      <div className="w-[48%] p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Permission Form</h2>
        <form onSubmit={applyPermission}>
          <div className="flex justify-between mb-4">
            <div className="w-[50%]">
              <label className="block text-gray-700 mb-1">
                Permission Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={permissionDate}
                onChange={(e) => setPermissionDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between mb-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="w-[48%]">
                <label className="block text-gray-700 mb-1">From Time</label>
                <MobileTimePicker
                  value={fromTime}
                  
                  onChange={(newValue) => setFromTime(newValue)}
                  renderInput={(params) => (
                    <input
                      {...params}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                  )}
                />
              </div>

              <div className="w-[48%]">
                <label className="block text-gray-700 mb-1">To Time</label>
                <MobileTimePicker
                  value={toTime}
                  minTime={fromTime}
                  onChange={(newValue) => setToTime(newValue)}
                  renderInput={(params) => (
                    <input
                      {...params}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                  )}
                />
              </div>
            </LocalizationProvider>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              Permission Reason
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500 resize-none"
              value={permissionReason}
              onChange={(e) => setPermissionReason(e.target.value)}
              placeholder="Reason for permission"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#595d5e] text-white py-2 rounded-md  transition-colors duration-200"
          >
            Submit Permission
          </button>
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
    </div>

    );
  };

  export default LeaveApplyForm;
