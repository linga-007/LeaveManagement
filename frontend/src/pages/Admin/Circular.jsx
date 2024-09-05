import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Ensure correct import for jwtDecode

export const Circular = () => {
  const today = new Date().toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
  const formattedDate = today.replace(/\//g, ".");

  const [isOpen, setIsOpen] = useState(false); // State to control the chat panel
  const [messages, setMessages] = useState([]); // Store messages
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the popup
  const [selectedMessage, setSelectedMessage] = useState(null); // Store selected message for popup
  const [subject, setSubject] = useState(""); // For the subject input
  const [content, setContent] = useState(""); // For the content input

  const token = document.cookie.split("=")[1];
  const decodedToken = jwtDecode(token);
  const empId = decodedToken.empId;

  // Fetch circular messages
  useEffect(() => {
    getCircular();
  }, []);

  // Toggle chat panel visibility
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle message click to open popup
  const handleMessageClick = (msg) => {
    setSelectedMessage(msg);
    setIsPopupOpen(true);
  };

  // Close popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedMessage(null);
  };

  // Fetch circular messages
  const getCircular = async () => {
    try {
      const res = await axios.get("http://localhost:5000/circular/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setMessages(res.data);
    } catch (e) {
      console.error("Error fetching circulars", e);
    }
  };

  // Send new circular message
  const sendCircular = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/circular/save",
        {
          empId: empId,
          empName: decodedToken.empName,
          message: content,
          subject: subject,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        toggleChat();
        getCircular();
      }
    } catch (e) {
      console.error("Error sending circular", e);
    }
  };

  return (
    <>
      <div className="relative w-[100%] h-[85%] overflow-y-auto">
        <div className="p-4 w-full flex-1">
          {messages.length === 0 ? (
            <p className="text-gray-600">No messages yet. Start a conversation!</p>
          ) : (
            <ul className="w-full">
              {messages.map((msg, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-2 rounded-md m-2 cursor-pointer"
                  onClick={() => handleMessageClick(msg)}
                >
                  <div className="flex flex-col gap-3">
                    <h1>Date: {formattedDate}</h1>
                    <h1 className="font-bold">Subject: {msg.subject}</h1>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Toggle Button */}
        <button
          className="fixed bottom-10 right-4 bg-blue-500 text-white p-2 rounded-md shadow-lg"
          onClick={toggleChat}
        >
          Circular
        </button>

        {/* Chat Panel */}
        <div
          className={`fixed bottom-10 right-4 w-80 h-52 bg-white shadow-xl rounded-lg transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Messaging</h3>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={toggleChat}
            >
              ✕
            </button>
          </div>

          {/* Chat Body */}
          {/* Chat Footer */}
          <div className="p-4 border-t flex space-x-2 flex-col gap-3">
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full flex-grow border rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full flex-grow border rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={sendCircular}
              className="bg-blue-500 text-white p-2 rounded-full shadow-md"
            >
              Send
            </button>
          </div>
        </div>

        {/* Popup for Circular */}
        {isPopupOpen && selectedMessage && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white p-4 rounded-md w-1/3 text-center shadow-lg transition-transform duration-300 transform scale-100">
              <h1 className="font-bold text-lg">Date: {formattedDate}</h1>
              <h1 className="font-bold mt-2">Subject: {selectedMessage.subject}</h1>
              <p className="mt-4">Content: {selectedMessage.message}</p>
              <button
                className="mt-6 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Circular;
