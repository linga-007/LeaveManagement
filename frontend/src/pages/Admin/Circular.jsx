import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

const ChatPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [messages, setMessages] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [content,setContent] = useState("");
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const token = document.cookie.split('=')[1];
  const decodedToken = jwtDecode(token);
  const empId = decodedToken.empId;


  useEffect(()=>{

    getCircular()
  },[])


  const handleMessageClick = (msg) => {
    setSelectedMessage(msg);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedMessage('');
  };


  const sendCircular = async()=>{

    try{
      const res = await axios.post("http://localhost:5000/circular/save",{
        empId:empId,
        empName:decodedToken.empName,
        message:content,
        subject:subject
     },
     {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    )
    console.log(res);
    if(res.status === 201){
      toggleChat();
      getCircular();
      console.log("got it")
      
    }
    }catch(e){
      console.log("Error",e)
    }
  }

  const getCircular = async ()=>{
    try{
      const res = await axios.get("http://localhost:5000/circular/getAll",
     {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    )
    console.log("get",res);
    setMessages(res.data)
    }catch(e){
      console.log("Error",e)
    }
  }

 

  return (
    <>
      <div className="relative w-[100%] h-[50%] overflow-y-auto">
        <div className="p-4 w-full -auto flex-1">
          {messages.length === 0 ? (
            <p className="text-gray-600">No messages yet. Start a conversation!</p>
          ) : (
            <ul className="w-full">
              {messages.map((msg, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-2 rounded-md m-2 cursor-pointer"
                  onClick={() => handleMessageClick(msg.message)}
                >
                  {msg.message}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Toggle Button */}
        <div  className="flex justify-center">
        <button
          className="fixed bottom-10  bg-blue-500 text-white justify-center items-center p-2 rounded-md shadow-lg "
          onClick={toggleChat}
        >
          Circular
        </button>
        </div>
      

        {/* Chat Panel */}
        <div
          className={`fixed bottom-10 right-4 w-80 h-50  bg-white shadow-xl rounded-lg transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-y-0 opacity-100 ' : 'translate-y-full opacity-0'
          }`}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between  p-4 border-b">
            <h3 className="text-lg font-semibold">Compose circular</h3>
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
              className="w-full flex-grow border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
      
             <textarea
              type="text"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full flex-grow border  rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-4 w-96">
              <h3 className="text-lg font-semibold">Circular</h3>
              <p className="mt-2">{selectedMessage}</p>
              <button
                onClick={closePopup}
                className="mt-4 bg-red-500 text-white p-2 rounded"
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

export default ChatPanel;
