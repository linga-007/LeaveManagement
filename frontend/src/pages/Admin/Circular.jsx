import React, { useState, useEffect } from 'react';
import { IoSend } from "react-icons/io5";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);

  const token = document.cookie.split('=')[1];
  const decodedToken = jwtDecode(token);
  const id = decodedToken.empId;
  const name = decodedToken.empName;

  // Fetch messages from the server when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/circular/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedMessages = response.data.map(msg => ({
          text: msg.message,
          fileName: msg.fileName,
          fileUrl: msg.fileUrl // Assuming the server sends a URL for the file
        }));

        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [token]);

  const handleSendMessage = async () => {
    if (!input.trim() && !file) {
      return;
    }

    let fileData = null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        fileData = reader.result.split(',')[1]; // Extract base64 string
        try {
          const response = await axios.post(
            'http://localhost:5000/circular/save',
            {
              empId: id,
              empName: name,
              message: input,
              fileName: file.name,
              fileData: fileData,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const newMessage = { text: input, fileUrl: response.data.fileUrl, fileName: file.name };
          setMessages([...messages, newMessage]);
          setInput('');
          setFile(null);
        } catch (error) {
          console.error('Error saving message:', error);
        }
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    } else {
      try {
        const response = await axios.post(
          'http://localhost:5000/circular/save',
          {
            empId: id,
            empName: name,
            message: input,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const newMessage = { text: input };
        setMessages([...messages, newMessage]);
        setInput('');
      } catch (error) {
        console.error('Error saving message:', error);
      }
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 w-full">
      <div className="w-full h-full overflow-y-auto mb-4 flex flex-col">
        <p className="font-semibold text-xl">Messages</p>
        <div className="flex flex-col space-y-2 gap-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className="self-end bg-blue-500 text-white p-2 rounded-lg max-w-xs"
              style={{ marginTop: index === 0 ? 'auto' : 0 }}
            >
              {message.text && <p>{message.text}</p>}
              {message.fileUrl && (
                <div className="mt-2">
                  <a
                    href={message.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {message.fileName}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Input Area */}
      <div className="flex items-center justify-start w-full h-fit p-1 gap-2">
        <div className="w-[70%] max-w-2xl space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
          />
        </div>
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer p-2 border rounded-lg bg-blue-500 text-white">
          <MdOutlineDriveFolderUpload />
        </label>
        <button
          onClick={handleSendMessage}
          className="p-2 bg-green-500 text-white rounded-lg"
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default Chat;
