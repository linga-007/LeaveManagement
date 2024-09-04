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
  import ConfirmLeave from './ConfirmLeave';
import ConfirmPermission from './ConfrimPermission';

import { useNavigate } from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  dayjs.extend(duration);

  const LeaveApplyForm = () => {
    const navigate = useNavigate();
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
    const [toTime, setToTime] = useState(dayjs().add(10,"minute"));
    const [permissionReason,setPermissionReason] = useState("") 
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [leaveId,setLeaveId] = useState("");
    const [leaveDescription, setLeaveDescription] = useState("");
    const [isAppliedLeave , setIsAppliedLeave] = useState(false)
    const [isPermission , setIsPermission] = useState(false)


    const [isLOP, setIsLOP] = useState(false);
    const [errors, setErrors] = useState({
      leaveType: '',
      leaveReason: '',
      fromDate: '',
      toDate: '',
      leaveDescription: '',
    });

    const [permissionErrors, setPermissionsErrors] = useState({
      date: '',
      fromTime: '',
      toTime: '',
      reason: '',
    });


    const handleSubmit = () => {
      let newErrors = {
        leaveType: '',
        leaveReason: '',
        fromDate: '',
        toDate: '',
        leaveDescription: '',
      };
  
     
      if (!leaveType) newErrors.leaveType = 'Enter a value';
      if (!leaveReason) newErrors.leaveReason = 'Enter a value';
      if (!fromDate) newErrors.fromDate = 'Enter a value';
      if (!toDate) newErrors.toDate = 'Enter a value';
      if (!leaveDescription) newErrors.leaveDescription = 'Enter a value';
  
 
      setErrors(newErrors);
  
      const hasErrors = Object.values(newErrors).some((error) => error);

      if (!hasErrors) {
        handleAppliedLeave(!isAppliedLeave); 
      }
    };


  
  
    const permissionFieldValidation = () => {
      let newErrors = { date: '', fromTime: '', toTime: '', reason: '' };
  
      if (!permissionDate) {
        newErrors.date = 'Enter a value';
      }
      if (!fromTime) {
        newErrors.fromTime = 'Enter a value';
      }
      if (!toTime) {
        newErrors.toTime = 'Enter a value';
      }
      if (!permissionReason) {
        newErrors.reason = 'Enter a value';
      }
      const hasErrors = Object.values(newErrors).some((error) => error);
      if (Object.values(newErrors).some((error) => error)) {
        setPermissionsErrors(newErrors);
        return;
      }
  
      // Handle permission submission here
      console.log('Permission submitted:', { permissionDate, fromTime, toTime, permissionReason });

      if (!hasErrors) {
        handlePermission()
      }
    
    };

    const token = document.cookie.split('=')[1];
    console.log(token)
    const decodedToken = jwtDecode(token);
    console.log("in",decodedToken.empId)

    useEffect(() => {
      if (fromDate && toDate) {
        const diff = dayjs(toDate).diff(dayjs(fromDate), 'day') + 1; 
        setNumberOfDays(diff);
        console.log(diff)
      }
    }, [fromDate, toDate]);
  
    
    const togglePopup = () => {
      setIsLOP(!isLOP);
    };


    
    const handleAppliedLeave = (e) =>{
      setIsAppliedLeave(true)
  }

  
  const handlePermission = (e) =>{
    setIsPermission(true)
}



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

        if(res.status === 200){
          toast.success("Leave applied successfully")
        }
        
      var data = res.data;
        console.log(data.leave._id)
        
        sendLeaveEmail(data.leave._id,"True");
        
        console.log("data", res.data);
      } catch (error) {
        toast.error("Error in Applying Leave")
        console.error("Error Leave Apply", error);
      }finally{
        setIsAppliedLeave(!isAppliedLeave)
        setIsLOP(!isLOP);
      }
      
    };

    const handleCancel = (e) => {
      e.preventDefault()
      console.log("Cancelled!");
      togglePopup();
      setIsAppliedLeave(!isAppliedLeave)
    };

    


    const dataPrint = ()=>{
      console.log("Check Data:")
      console.log(leaveDetail,leaveReason,leaveType)
    }
    dataPrint()

    console.log("leave app",isAppliedLeave)
    const applyLeave = async (e) => {

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
            "reasonType":leaveReason ,
            "reason" : leaveDescription
        },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        //toaast


        if(res.status === 202){
          setIsLOP(!isLOP);
          console.log(isLOP)

        }else{
          var data = res.data;
          console.log("data",data)
          toast.success("Leave applied successfully");
          setLeaveId(data.leave._id)
          sendLeaveEmail(data.leave._id,"false");      
          
          console.log("data", res.data);
          setIsAppliedLeave(!isAppliedLeave)
        }
 
      } catch (error) {
        console.error("Error Leave Apply", error);
        toast.error("Error in applying Leave");
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
      userName={decodedToken.empName}
      imageUrl="https://www.gilbarco.com/us/sites/gilbarco.com.us/files/2022-07/gilbarco_logo.png"
      leaveId={objId}
      LOP={LOP}
      leaveDescription={leaveDescription}

      />
      );

      try {
        const response = await axios.post(
          'http://localhost:5000/mail/send',
          {
            email: "mohammedashif.a2022cse@sece.ac.in",
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
          navigate('/thank-you')
        } else {
          toast.error('Error Sending Mail !');
        }
      } catch (error) {
        console.error("Error sending email:", error.response ? error.response.data : error.message);
        toast.error('Error Sending Mail !');
      }
    };  

    const sendPermissionEmail = async (objId) => {
      const emailContent = await render(
        <PermissionEmailTemplate
        date = {permissionDate}
        fromTime = {fromTime.format("hh:mm A")}
        toTime={toTime.format("hh:mm A")}
        permissionReason = {permissionReason}
        userName = {decodedToken.empName}
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
          navigate('/thank-you')

        } else {
          toast.error('Error Sending Permission !');
        }
      } catch (error) {
        console.error("Error sending Permission:", error.response ? error.response.data : error.message);
        toast.error('Error Sending Permission !');

      }
    };
    const applyPermission = async (e)=>{
      console.log("permission")
      try {
          if (isTimeExceeding()) {
              toast.error('You have crossed 4 hrs limit !');
          } else {
            console.log("Permession Sendttttt",typeof(dayjs.duration(toTime.diff(fromTime)).asHours()))
        const res = await axios.post(
          "http://localhost:5000/permission/apply",
          {
            "empId":decodedToken.empId,
            "hrs":dayjs.duration(toTime.diff(fromTime)).asHours(),
            "reason":permissionReason,
            "date":permissionDate,
            "from": fromTime.format("hh:mm A"),
            "to":  toTime.format("hh:mm A")
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
        console.error("Error permission Apply", error);
      }finally{
        console.log("per end")
        setIsPermission(!isPermission)
      }
    }

    return (
      <div className="h-fit pt-2 pb-2 flex flex-wrap gap-2 justify-center">
      {/* Leave Application Form */}
      <ToastContainer />
       <div className="w-[48%] p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Leave Application</h2>
      <div>
        {/* Leave Type and Reason */}
        <div className="flex justify-between mb-4">
          <div className="w-[48%]">
            <label className="block text-gray-700 mb-1">Leave Type</label>
            <select
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring ${errors.leaveType ? 'border-red-500' : 'border-gray-300'}`}
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <option value="">Select Leave Type</option>
              <option value="Casual Leave">Casual Leave</option>
              {decodedToken.role !== "3P" && <option value="Privelage Leave">Privelage Leave</option>}
              {decodedToken.role !== "3P" && <option value="Paternity Leave">Paternity Leave</option>}
            </select>
            {errors.leaveType && <p className="text-red-500 text-sm">{errors.leaveType}</p>}
          </div>

          <div className="w-[48%]">
            <label className="flex justify-between items-center text-gray-700 mb-1">Leave Reason:{errors.leaveReason && <p className="text-red-500 text-sm">{errors.leaveReason}</p>}</label>
            <select
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring ${errors.leaveReason ? 'border-red-500' : 'border-gray-300'}`}
              value={leaveReason}
              onChange={(e) => setLeaveReason(e.target.value)}
            >
              <option value="">Select Leave Reason</option>
              <option value="Personal">Personal Leave</option>
              <option value="Medical">Medical Leave</option>
              <option value="Peternity">Paternity Leave</option>
              <option value="Family Function">Family Function</option>
            </select>
            
          </div>
        </div>

        {/* From Date and To Date */}
        <div className="flex justify-between mb-4">
          <div className="w-[48%]">
            <label className="flex items-center justify-between text-gray-700 mb-1">From Date: {errors.fromDate && <p className="text-red-500 text-sm">{errors.fromDate}</p>}</label>
            <input
              type="date"
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring ${errors.fromDate ? 'border-red-500' : 'border-gray-300'}`}
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setToDate(e.target.value);
              }}
            />
           
          </div>

          <div className="w-[48%]">
            <label className=" text-gray-700 mb-1 flex items-center justify-between">To Date:{errors.toDate && <p className="text-red-500 text-sm">{errors.toDate}</p>}</label>
            <input
              type="date"
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring ${errors.toDate ? 'border-red-500' : 'border-gray-300'}`}
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
          <label className="flex justify-between items-center text-gray-700 mb-1">Leave Description:{errors.leaveDescription && <p className="text-red-500 text-sm">{errors.leaveDescription}</p>}</label>
          <textarea
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring resize-none ${errors.leaveDescription ? 'border-red-500' : 'border-gray-300'}`}
            value={leaveDescription}
            onChange={(e) => setLeaveDescription(e.target.value)}
            placeholder="Reason for leave"
          />
          
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#595d5e] text-white py-2 rounded-md transition-colors duration-200"
        >
          Submit Leave Application
        </button>
      </div>
    </div>

      {/* Permission Form */}
      <div className="w-[48%] p-4 bg-white shadow-md rounded-md flex flex-col justify-between">
      <h2 className="text-2xl font-bold mb-4">Permission Form</h2>
      <div>
        <div className="flex justify-between mb-4">
          <div className="w-[50%]">
            <label className="block text-gray-700 mb-1">Permission Date</label>
            <input
              type="date"
              className={`w-full border ${permissionErrors.date ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500`}
              value={permissionDate}
              onChange={(e) => setPermissionDate(e.target.value)}
            />
            {permissionErrors.date && <p className="text-red-500 text-xs">{permissionErrors.date}</p>}
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
                    className={`w-full border ${permissionErrors.fromTime ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500`}
                  />
                )}
              />
              {permissionErrors.fromTime && <p className="text-red-500 text-xs">{permissionErrors.fromTime}</p>}
            </div>

            <div className="w-[48%]">
              <label className="block text-gray-700 mb-1">To Time</label>
              <MobileTimePicker
                value={toTime}
                minTime={fromTime.add(10,"minute")}
                onChange={(newValue) => setToTime(newValue)}
                renderInput={(params) => (
                  <input
                    {...params}
                    className={`w-full border ${permissionErrors.toTime ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500`}
                  />
                )}
              />
            </div>
          </LocalizationProvider>
        </div>

        <div className="mb-4">
          <label className="flex items-center justify-between text-gray-700 mb-1">Permission Reason: {permissionErrors.reason && <p className="text-red-500 text-xs">{permissionErrors.reason}</p>}</label>
          <textarea
            className={`w-full border ${permissionErrors.reason ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500 resize-none`}
            value={permissionReason}
            onChange={(e) => setPermissionReason(e.target.value)}
            placeholder="Reason for permission"
          />
         
        </div>

        <button
          onClick={permissionFieldValidation}
          className="w-full bg-[#595d5e] text-white py-2 rounded-md transition-colors duration-200"
        >
          Apply Permission
        </button>
      </div>
    </div>
      {isLOP && (
       <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
       <div className="bg-white p-6 rounded-lg shadow-lg w-80">
         <h2 className="text-lg font-semibold mb-4">Leave Limit Notification</h2>
         <p className="mb-4">
           You have crossed your leave limit. Are you sure you want to apply for Loss Of Pay (LOP)?
         </p>
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

      {/* Confirmation Popup */}
      { !isLOP && isAppliedLeave ? (
        <ConfirmLeave
          fromDate={fromDate}
          toDate={toDate}
          leaveReason={leaveReason}
          leaveType={leaveType}
          leaveDescription={leaveDescription}
          onClose={setIsAppliedLeave}
          numberOfDays={numberOfDays}
          applyLeave={applyLeave}
        />
      ) : null}
      {/* <ConfirmPermission/> */}
      { isPermission&&<ConfirmPermission
       hours={dayjs.duration(toTime.diff(fromTime)).asHours()}
       reason = {permissionReason}
       fromTime = {fromTime.format("hh:mm A")}
       toTime = {toTime.format("hh:mm A")}
       permissionDate = {permissionDate}
       employeeName = {decodedToken.empName}
       onClose = {setIsPermission}
       applyPermission = {applyPermission}
      />
      }
    </div>




    );
  };

  export default LeaveApplyForm;
