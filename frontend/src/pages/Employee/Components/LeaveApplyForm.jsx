import React, { useState } from "react";
import { render } from "@react-email/render";

import EmailTemplate from "../../EmailTemplate";

const LeaveApplyForm = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [leaveDetail, setLeaveDetail] = useState("");
  const [fromFirstHalf, setFromFirstHalf] = useState(false);
  const [fromSecondHalf, setFromSecondHalf] = useState(false);
  const [toFirstHalf, setToFirstHalf] = useState(false);
  const [toSecondHalf, setToSecondHalf] = useState(false);

  const [leaveType, setLeaveType] = useState("");
  const [leaveReason, setLeaveReason] = useState("");

  var img =
    "https://www.gilbarco.com/us/sites/gilbarco.com.us/files/2022-07/gilbarco_logo.png";
  const sendEmail = async (e) => {
    e.preventDefault();
    console.log("SENDING...");
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ fromDate, toDate, leaveReason, leaveType });
  };

  return (
    <div className="w-[80%] shadow-lg mx-2 p-4 ">
      <h2 className="text-2xl font-bold mb-4">Leave Apply Form</h2>
      <form onSubmit={sendEmail} className="w-[90%] flex justify-center">
        <div className="w-[95%]">
          <div className="flex w-full justify-between">
            <div className="w-[40%]">
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
                <option value="sick">Sick Leave</option>
                <option value="vacation">Vacation Leave</option>
                <option value="casual">Casual Leave</option>
              </select>
            </div>
          </div>

          <div className="w-[100%] flex justify-between">
            <div className="mr-4 w-[60%]">
              <label className="block text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
              />
            </div>

            <div className="flex w-[40%] justify-around">
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

          <div className="w-[100%] flex justify-between">
            <div className="mr-4 w-[60%]">
              <label className="block text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
              />
            </div>

            <div className="flex w-[40%] justify-around">
              <div className="flex items-center mt-7">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={toFirstHalf}
                  onChange={() => setToFirstHalf(!toFirstHalf)}
                />
                <label className="ml-2 textay-700">First Half</label>
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

          <div className="flex justify-between">
            <div className="w-[80%]">
              <label className="block text-gray-700 mb-1">
                Reason for Leave
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                rows="2"
                value={leaveDetail}
                onChange={(e) => setLeaveDetail(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-center ">
              <button className="h-fit bg-blue-500 py-2 px-7 mx-2 rounded-lg shadow-lg">
                Apply
              </button>
            </div>
          </div>
        </div>
      </form>
      <button
        className="bg-blue-500 text-white font-bold  rounded"
        onClick={toggleModal}
      >
        Open Popup
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[50%]">
            
            <p className="mb-4">You have exhausted your leave entitlement for this month. If you proceed with this leave application, it will be considered as Leave Without Pay (LOP). Please confirm if you wish to continue.

</p>
            <div className="flex gap-10">
            <button
              className="bg-red-500 text-white font-bold py-2 px-4 rounded"
              onClick={toggleModal}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white font-bold py-2 px-4 rounded"
              onClick={toggleModal}
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
