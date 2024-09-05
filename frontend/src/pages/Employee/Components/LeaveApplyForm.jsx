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
  import DatePicker from 'react-datepicker';
  import 'react-datepicker/dist/react-datepicker.css';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeaveNotification from './LeaveNotification';

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
    const [permissionDate,setPermissionDate] = useState("");
    const [fromTime, setFromTime] = useState(dayjs()); 
    const [toTime, setToTime] = useState(dayjs().add(1,"hour"));
    const [permissionReason,setPermissionReason] = useState("") 
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [leaveId,setLeaveId] = useState("");
    const [leaveDescription, setLeaveDescription] = useState("");
    const [isAppliedLeave , setIsAppliedLeave] = useState(false)
    const [isPermission , setIsPermission] = useState(false)
    const [summary,setSummary] = useState({})


    const [isLOP, setIsLOP] = useState(false);
    const [errors, setErrors] = useState({
      leaveType: '',
      leaveReason: '',
      fromDate: '',
      toDate: '',
      leaveDescription: '',
      privilegeLeave:''
    });

    const [permissionErrors, setPermissionsErrors] = useState({
      date: '',
      fromTime: '',
      toTime: '',
      reason: '',
      maxTime:''
    });


    const handleSubmit = () => {
      let newErrors = {
        leaveType: '',
        leaveReason: '',
        fromDate: '',
        toDate: '',
        leaveDescription: '',
        privilegeLeave: ''
      };

      console.log("loglog")
    
      // Basic validations
      if (!leaveType) newErrors.leaveType = 'Enter a value';
      if (!leaveReason) newErrors.leaveReason = 'Enter a value';
      if (!fromDate) newErrors.fromDate = 'Enter a value';
      if (!toDate) newErrors.toDate = 'Enter a value';
      if (!leaveDescription) newErrors.leaveDescription = 'Enter a value';
    
      // Check if leaveType is 'privilege Leave' and if the number of days is less than 3
      const numberOfDays = dayjs(toDate).diff(dayjs(fromDate), 'day') + 1;
      if (leaveType === 'privilege Leave' && numberOfDays < 3) {
        newErrors.privilegeLeave = 'Privilege Leave requires at least 3 days.';
      }
      console.log("check",numberOfDays)
    
      setErrors(newErrors);
    
      const hasErrors = Object.values(newErrors).some((error) => error);
    
      // Proceed only if no errors
      if (!hasErrors) {
        handleAppliedLeave(!isAppliedLeave); 
      }
    };
  
  
    const permissionFieldValidation = () => {
      let newErrors = { date: '', fromTime: '', toTime: '', reason: '' ,maxTime:''};
  
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
      if(dayjs.duration(toTime.diff(fromTime)).asHours()<0 || !(dayjs.duration(toTime.diff(fromTime)).asHours()>=1 )|| !(dayjs.duration(toTime.diff(fromTime)).asHours()<=2) ){
        newErrors.maxTime = 'Enter a proper Time';
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
      return timeDifference > 2;
  };


    const handleConfirm = async() => {
  
      try {
        const res = await axios.post(
          "http://localhost:5000/leave/apply",
          {
            "empId": decodedToken.empId,
            "empName": decodedToken.empName,
            "role": decodedToken.role,
            "leaveType": leaveType,
            "from": {
                "date": "10-10-24",
                "firstHalf": false,
                "secondHalf": true
            },
            "to": {
                "date": "12-10-24",
                "firstHalf": true,
                "secondHalf": false
            },
            "numberOfDays": 1,
            "reasonType": "Family Function",
            "reason": "sample function",
            "LOP": 1
        },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("ksdhfgiyrsgbrwnh")
        if(res.status === 201){
          toast.success("Leave Requested Successfully")
        }
        else{
          toast.error("Error in requesting Leave")
        }
        
      var data = res.data;
        console.log(data.leave._id)
      
        sendLeaveEmail(data.leave._id,"True");
        
        console.log("data", res.data);
      } catch (error) {

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
                "date": fromDate.toLocaleDateString('en-GB'),
                "firstHalf": !fromFirstHalf && !fromSecondHalf?true:fromFirstHalf ,
                "secondHalf": !fromFirstHalf && !fromSecondHalf?true:fromSecondHalf
            },
            "to": {
                "date": toDate.toLocaleDateString('en-GB'),
                "firstHalf": !fromFirstHalf && !fromSecondHalf?true:fromFirstHalf ,
                "secondHalf": !fromFirstHalf && !fromSecondHalf?true:fromSecondHalf
            },
            "numberOfDays": leaveType === "Casual Leave"?summary.CL:leaveType === "privilege Leave"?summary.PL:summary.Paternity,
            "reasonType":leaveReason ,
            "reason" : leaveDescription,
            "LOP":summary.LOP
        },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if(res.status === 201){
          toast.success("Leave Request sent Successfully")
        }

          var data = res.data;
          console.log("data",data)
          setIsLOP(false)
          setIsAppliedLeave(!isAppliedLeave)
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
      fromDate={fromDate.toLocaleDateString('en-GB')}
      toDate={toDate.toLocaleDateString('en-GB')}
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
          toast.error("Error in sending Email")
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
        userName = {decodedToken.empName}
        imageUrl = {img}
        permissionId = {objId}
        />
      );

      try {
        const response = await axios.post(
          'http://localhost:5000/mail/send',
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
          
        } 
       
        else {
          toast.error("error in sending mail")
        }
      } catch (error) {
        console.error("Error sending email:", error.response ? error.response.data : error.message);
        toast.error("error in sending mail")
      }
    };
    const applyPermission = async (e)=>{
      console.log("permission")
      try {
          if (isTimeExceeding()) {
              toast.error("Time limit Exceeded")
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
        if(res.status === 201){
          toast.success("Requested Permission Successfully")
          var data = res.data;    
        console.log("data", data);
      sendPermissionEmail(data.permission._id)
        }
        else if(res.status === 203){
          toast.error("Insufficient Permission Balance")

        }
      
      } 
    }catch (error) {
        console.error("Error permission Apply", error);
        toast.error("Error is requesting Permission")
      }finally{
        console.log("per end")
        setIsPermission(!isPermission)
      }
    }

    const handleLOP = ()=>{
      setIsLOP(!isLOP);
      setIsAppliedLeave(!isAppliedLeave)
    }

    const checkLeave = async()=>{
      try{
        const res =await axios.post("http://localhost:5000/leave/checkLeave",{
          "empId": decodedToken.empId,
          "role": decodedToken.role,
          "leaveType": leaveType,
          "from": {
              "date": fromDate,
              "firstHalf": !fromFirstHalf && !fromSecondHalf?true:fromFirstHalf ,
              "secondHalf": !fromFirstHalf && !fromSecondHalf?true:fromSecondHalf
          },
          "numberOfDays":numberOfDays
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
 
      if(res.status === 202){
        toast.error("Date is Already Applied")
      }else{
        setSummary(res.data);
        handleLOP();
      }
 
      }catch(e){
       toast.error("Somthing went wrong")
      }
    }


    const formatDate = (date) => {
      if (!date) return '';
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    

    return (
      <div className="h-fit pt-2 pb-2 flex flex-wrap gap-2 justify-center">
  
      {/* Leave Application Form */}
      <ToastContainer />
       <div className="w-[48%] p-4 bg-slate-100 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Leave Form</h2>
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
              {decodedToken.role !== "3P" && <option value="privilege Leave">privilege Leave</option>}
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


        <div className="w-[48%] ">
        <label className="flex items-center justify-between text-gray-700 mb-1">
          From Date: {(errors.fromDate || errors.privilegeLeave) && <p className="text-red-500 text-sm">{errors.fromDate || errors.privilegeLeave}</p>}
        </label>
        <DatePicker
  selected={fromDate}
  onChange={(date) => {
    setFromDate(date);
    setToDate(date); // Set toDate to fromDate when fromDate changes
    setErrors((prev) => ({ ...prev, fromDate: '', toDate: '' })); // Reset errors
    if (!date) {
      setErrors((prev) => ({ ...prev, fromDate: 'From Date is required.' }));
    }
  }}
  filterDate={(date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Disable weekends
  }}
  minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
  maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 2, 0)} // Last day of next month
  className={`w-[150%] border rounded-md p-2 focus:outline-none focus:ring ${
    errors.fromDate ? 'border-red-500' : 'border-gray-300'
  }`}
  dateFormat="dd/MM/yyyy"
  placeholderText="Select From Date"
/>
      </div>


     <div className="w-[48%]">
        <label className="text-gray-700 mb-1 flex items-center justify-between">
          To Date: {errors.toDate || errors.privilegeLeave && <p className="text-red-500 text-sm">{errors.toDate || errors.privilegeLeave}</p>}
        </label>
        <DatePicker
  selected={toDate}
  onChange={(date) => {
    setToDate(date);
    setErrors((prev) => ({ ...prev, toDate: '', fromDate: '' })); // Reset errors

    // Ensure that To Date is after or equal to From Date
    if (fromDate && date && new Date(date) < new Date(fromDate)) {
      setErrors((prev) => ({ ...prev, toDate: 'To Date must be equal to or after From Date.' }));
    }
  }}
  filterDate={(date) => {
    const day = date.getDay();
    const isWeekend = day !== 0 && day !== 6; // Disable weekends

    // Ensure the date is in the same month as fromDate
    const sameMonth = fromDate && date.getMonth() === fromDate.getMonth();
    
    return isWeekend && sameMonth; // Return only if it's a valid day and in the same month
  }}
  minDate={fromDate}
  maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 2, 0)}
  className={`w-[150%] border rounded-md p-2 focus:outline-none focus:ring ${errors.toDate ? 'border-red-500' : 'border-gray-300'}`}
  dateFormat="dd/MM/yyyy"
  placeholderText="Select To Date"
/>
      </div>

      
        </div>

        {/* Half-Day Options */}
        <div className="flex justify-between mb-2">
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

        <div className="mb-2">
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
          className="w-full bg-blue-400 text-white py-2 rounded-md transition-colors duration-200"
        >
          Submit Leave Request
        </button>
      </div>
    </div>

      {/* Permission Form */}
      <div className="w-[48%] p-4 bg-slate-100 shadow-md rounded-md flex flex-col justify-between">
      <h2 className="text-2xl font-bold mb-4">Permission Form</h2>
      <div>
        <div className="flex justify-between mb-4 w-[50%] ">
        {/* <div className="w-[50%]">
            <label className="block text-gray-700 mb-1">Permission Date</label>
            <input
              type="date"
              className={`w-full border ${permissionErrors.date ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500`}
              value={permissionDate}
              onChange={(e) => setPermissionDate(e.target.value)}
            />
            {permissionErrors.date && <p className="text-red-500 text-xs">{permissionErrors.date}</p>}
          </div> */}
          <div className="w-[50%]">
      <label className="block text-gray-700 mb-1">Permission Date</label>
      <DatePicker
        selected={permissionDate}
        onChange={(date) => {
          setPermissionDate(formatDate(date));
          setPermissionsErrors((prev) => ({ ...prev, date: '' })); // Reset errors
          if (!date) {
            setPermissionsErrors((prev) => ({ ...prev, date: 'Permission Date is required.' }));
          }

        }}
        filterDate={(date) => {
          const today = new Date();
          const dayOfWeek = today.getDay();
          
          // Allow today and tomorrow
          const isToday = date.toDateString() === today.toDateString();
          const isTomorrow = date.toDateString() === new Date(today.setDate(today.getDate() + 1)).toDateString();
          
          // If today is Friday, allow Monday (two days after tomorrow)
          const isMonday = dayOfWeek === 5 && date.toDateString() === new Date(today.setDate(today.getDate() + 2)).toDateString();
          
          // Disable weekends (Saturday and Sunday)
          const day = date.getDay();
          const isWeekend = day === 0 || day === 6;
          
          return !isWeekend && (isToday || isTomorrow || isMonday);
        }}
        className={`w-full border ${permissionErrors.date ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500`}
        dateFormat="dd/MM/yyyy" // Change the format as per your requirement
        placeholderText="Select Permission Date"
        // Use the formatDate function to display the formatted value
        value={permissionDate}
      />
      {permissionErrors.date && <p className="text-red-500 text-xs">{permissionErrors.date}</p>}
    </div>
{  dayjs.duration(toTime.diff(fromTime)).asHours()}
        </div>

        <div className="flex justify-between mb-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="w-[48%]">
              <label className="block text-gray-700 mb-1">From Time</label>
              <MobileTimePicker
                value={fromTime}
                onChange={(newValue) => setFromTime(newValue)}
                minTime={dayjs().set('hour', 9).set('minute', 0)}
                maxTime={dayjs().set('hour', 17).set('minute', 0)}
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
                minTime={fromTime.add(1,"hour")}
                maxTime={fromTime.add(2,"hour")}
                onChange={(newValue) => {setToTime(newValue)
                  setPermissionsErrors((prev) => ({ ...prev, maxTime: '' })); 
                  if(dayjs.duration(toTime.diff(fromTime)).asHours()<0 || !(dayjs.duration(toTime.diff(fromTime)).asHours()>=1 )|| !(dayjs.duration(toTime.diff(fromTime)).asHours()<=2) ){
                    setPermissionsErrors((prev) => ({ ...prev, maxTime: 'Enter Proper To Time' }));
                  }
                }}
                renderInput={(params) => (
                  <input
                    {...params}
                    className={`w-full border ${permissionErrors.toTime || permissionErrors.maxTime  ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500`}
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
          className="w-full bg-blue-400 text-white py-2 rounded-md transition-colors duration-200"
        >
          Submit Permission Request
        </button>
      </div>
    </div>
      {isLOP && (
       <LeaveNotification
      casualLeaveDays={leaveType === "Casual Leave"?summary.CL:leaveType === "privilege Leave"?summary.PL:summary.Paternity} 
      lopDays={summary.LOP} 
      handleCancel={handleCancel} 
      handleConfirm={handleConfirm} 
    />
      )}

      {/* Confirmation Popup */}
      {  isAppliedLeave ? (
        <ConfirmLeave
          fromDate={fromDate.toLocaleDateString('en-GB')}
          toDate={toDate.toLocaleDateString('en-GB')}
          leaveReason={leaveReason}
          leaveType={leaveType}
          leaveDescription={leaveDescription}
          onClose={setIsAppliedLeave}
          numberOfDays={numberOfDays}
          applyLeave={checkLeave}
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
