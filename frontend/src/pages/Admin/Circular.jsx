import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import { MdOutlineDriveFolderUpload } from "react-icons/md";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);

  const handleSendMessage = () => {
    if (input.trim() || file) {
      const newMessage = { text: input, file };
      setMessages([...messages, newMessage]);
      setInput('');
      setFile(null);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 w-full">
        
      <div className="w-full h-full overflow-y-auto mb-4 flex flex-col ">
        <p className='font-semibold text-xl'>Messages</p>
        <div className="flex flex-col space-y-2 gap-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className="self-end bg-blue-500 text-white p-2 rounded-lg max-w-xs"
              style={{ marginTop: index === 0 ? 'auto' : 0 }} // To align the first message to top-right
            >
              {message.text && <p>{message.text}</p>}
              {message.file && (
                <div className="mt-2">
                  <a
                    href={URL.createObjectURL(message.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {message.file.name}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Input Area */}
      <div className = "flex items-center justify-start w-full h-fit p-1 gap-2 ">
      <div className="w-[70%] max-w-2xl  space-x-2">
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
