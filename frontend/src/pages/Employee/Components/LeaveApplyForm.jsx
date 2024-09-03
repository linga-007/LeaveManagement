import React, { useEffect, useState } from "react";
import { render } from "@react-email/render";
import EmailTemplate from "../../EmailTemplate";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import axios from "axios";

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
  const [permissionDate, setPermissionDate] = useState("");
  const [leaveDescription, setLeaveDescription] = useState("");
  const [fromTime, setFromTime] = useState(dayjs());
  const [toTime, setToTime] = useState(dayjs());
  const [permissionReason, setPermissionReason] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const token = document.cookie.split("=")[1];
  const decodedToken = jwtDecode(token);

  const handleConfirm = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/leave/applyLOP",
        {
          empId: decodedToken.empId,
          leaveType,
          from: {
            date: fromDate,
            "first-half": fromFirstHalf,
            "second-half": fromSecondHalf,
          },
          to: {
            date: toDate,
            "first-half": toFirstHalf,
            "second-half": toSecondHalf,
          },
          numberOfDays: numberOfDays,
          reason: "Personal",
        },
        {
          headers: {
            Authorization: `Bearer ${to   ken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;
      console.log("data" , data)

      sendEmail(data.clleave._id, "True");
    } catch (error) {
      console.error("Error Leave Apply", error);
    } finally {
      setIsOpen(!isOpen);
    }
  };

  const handleCancel = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (fromDate && toDate) {
      const diff = dayjs(toDate).diff(dayjs(fromDate), "day") + 1;
      setNumberOfDays(diff);
    }
  }, [fromDate, toDate]);

  const sendData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/leave/apply",
        {
          empId: decodedToken.empId,
          leaveType,
          from: {
            date: fromDate,
            "first-half": fromFirstHalf,
            "second-half": fromSecondHalf,
          },
          to: {
            date: toDate,
            "first-half": toFirstHalf,
            "second-half": toSecondHalf,
          },
          numberOfDays: numberOfDays,
          reason: leaveReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 202) {
        setIsOpen(!isOpen);
      }

      const data = res.data;

      console.log("objId",data.leave._id)
      sendEmail(data.leave._id, "false");
    } catch (error) {
      console.error("Error Leave Apply", error);
    }
  };

  const sendEmail = async (objId, LOP) => {
    const emailContent = await render(
      <EmailTemplate
        empId={decodedToken.empId}
        leaveType={leaveType}
        fromDate={fromDate}
        toDate={toDate}
        leaveReason={leaveReason}
        userName="aa"
        imageUrl="https://www.gilbarco.com/us/sites/gilbarco.com.us/files/2022-07/gilbarco_logo.png"
        leaveId={objId}
        LOP={LOP}
      />
    );

    try {
      const response = await axios.post(
        "http://localhost:5000/mail/send",
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
        alert("Email sent successfully");
      } else {
        alert("Failed to send email");
      }
    } catch (error) {
      console.error(
        "Error sending email:",
        error.response ? error.response.data : error.message
      );
      alert("Error sending email");
    }
  };

  const applyPermission = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/permission/apply",
        {
          empId: decodedToken.empId,
          hrs: 1,
          reason: permissionReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;
      console.log("data", res.data);
    } catch (error) {
      console.error("Error Leave Apply", error);
    }
  };

  return (
    <div className=" h-fit bg-[#f5f6f7] pt-2 pb-2 flex flex-wrap gap-2 justify-center">
      {/* Leave Application Form */}
      <div className="w-[48%] p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Leave Application</h2>
        <form onSubmit={sendData}>  
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
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
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
            <div className="w-full">
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
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Submit Permission
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveApplyForm;
