import React from 'react'
import { useState } from 'react';

function Cicular() {
    const circulars = [
      {
        subject: 'Annual Report',
        date: '2024-09-01',
        manager: 'John Doe',
        content: 'This is the content of the Annual Report circular.',
      },
      {
        subject: 'Quarterly Meeting',
        date: '2024-08-25',
        manager: 'Jane Smith',
        content: 'This is the content of the Quarterly Meeting circular.',
      },
      // Add more circulars here
    ];
  
    return (
      <div className='flex flex-col w-[25%] bg-white '>
          <div className='w-full text-center text-xl font-bold text-black border-2 border-white rounded-lg  bg-slate-100'>
    Circular
    </div>
        {circulars.map((circular, index) => (
          <CircularContainer
            key={index}
            subject={circular.subject}
            date={circular.date}
            manager={circular.manager}
            content={circular.content}
          />
        ))}
      </div>
    );
  };

export default Cicular


const CircularContainer = ({ subject, date, manager, content }) => {
    const [showPopup, setShowPopup] = useState(false);
  
    const handleContainerClick = () => {
      setShowPopup(true);
    };
  
    const handleClosePopup = () => {
      setShowPopup(false);
    };
  
    return (
      <div className='w-[100%]'>
        <div
          className=' bg-slate-100 p-4 m-2 border rounded-md cursor-pointer shadow-md '
          onClick={handleContainerClick}
        >
          <div className='w-full text-center text-xl font-bold text-black'>
            {subject}
          </div>
          <div className='text-sm text-gray-500'>
            Date: {date}
          </div>        
          <div className='text-sm text-gray-500'>
            Manager: {manager}
          </div>
        </div>
  
        {showPopup && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-8 rounded-md w-[50%]'>
              <h2 className='text-2xl font-bold mb-4'>{subject}</h2>
              <p className='mb-4'>{content}</p>
              <button
                className='bg-blue-500 text-white p-2 rounded-md'
                onClick={handleClosePopup}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };