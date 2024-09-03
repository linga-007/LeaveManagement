import React, { useEffect, useState } from 'react';
import GVR from '../../../images/GVRLogo.png';
import LogOut from '../../../images/logout.png';
import user from '../../../images/profile.png';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

function Nav() {
  const [response, setResponse] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  const token = document.cookie.split('=')[1];
  const decodedToken = jwtDecode(token);
  const empId = decodedToken.empId;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/emp/getEmp',
        { empId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setResponse(res.data[0]);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const title = [
    'Designation: ',
    'Reporting Manager: ',
    'DOJ: ',
    'Function: ',
    'Department: ',
    'Band/Level: ',
    'Location: ',
  ];
  const details = [
    response.designation,
    response.reportionManager,
    response.dateOfJoining,
    response.function,
    response.department,
    response.level,
    response.location,
  ];

  return (
    <>
      <div className='w-full flex justify-center items-center pl-6 pr-6 rounded-lg'>
        <div className='w-[100%] shadow-md flex justify-between items-center px-5 py-2 rounded-lg'>
          <div className='text-xl font-semibold'>
            <img src={GVR} className='h-10' />
          </div>
          <div>
            <button
              className='flex justify-center items-center'
              onClick={() => setShowDetails(!showDetails)}
            >
              <img src={user} className='h-10' />
            </button>
            {showDetails && (
              <div className='absolute mt-2 bg-white shadow-md rounded-lg p-4 text-black'>
                <h1 className='text-xl font-bold'>{response.empName}</h1>
                <div className='text-sm'>
                  {title.map((val, index) => (
                    <h1 key={index}>
                      <span className='text-gray-700 font-semibold'>{val}</span>{' '}
                      {details[index]}
                    </h1>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
