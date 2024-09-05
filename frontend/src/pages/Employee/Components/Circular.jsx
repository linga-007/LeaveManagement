import React, { useEffect } from 'react'
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function Cicular() {

  const token = document.cookie.split('=')[1];
  const decodedToken = jwtDecode(token);
  const empId = decodedToken.empId;

  const [circular,setCircular] = useState([])

  const formatDate = (dateString) => {
    var [year,month,day] = dateString.split('T')[0].split('-')
    var date = day+"-"+month+"-"+year;
    return date; 
  };
  useEffect(()=>{
    getData();
  },[])
  const getData = async() =>{
    try{
      const res = await axios.get('http://localhost:5000/circular/getAll',{
        
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        
      })
      console.log(res.data)
      setCircular(res.data)
    }
    catch{
      console.log("error")
    }
  }
  
    return (
      <div className='flex flex-col w-[25%] bg-white h-full'>
          <div className='w-full text-center text-xl font-bold text-black border-2 border-white rounded-lg  bg-slate-100'>
    Circular
    </div>
        <div className='overflow-y-auto'>
        {circular.map((circular, index) => (
          <CircularContainer
            key={index}
            subject={circular.subject}
            date={formatDate(circular.createdAt)}
            manager="Manager"
            content={circular.message}
          />
        ))}
        </div>
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
          <div className='text-sm text-gray-500 font-semibold'>
            Date: {date}
          </div>        
          <div className='text-sm text-gray-500 font-semibold'>
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