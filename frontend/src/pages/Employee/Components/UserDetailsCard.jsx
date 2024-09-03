import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import UserImg from "../assets/user.png";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import GVRLOGO from "../../../images/GVR.png";

function UserDetailsCard() {
  const [response, setResponse] = useState({});
=======
import GVR from '../../../images/GVRLogo.png';
import LogOut from '../../../images/logout.png';
import user from '../../../images/profile.png';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

function Nav() {
  const [response, setResponse] = useState({});
  const [showDetails, setShowDetails] = useState(false);
>>>>>>> 6573be8d24cf0cbee1a7f139e066e3f73df7ff39

  const token = document.cookie.split('=')[1];
  const decodedToken = jwtDecode(token);
  const empId = decodedToken.empId;

<<<<<<< HEAD
  console.log("token ", empId);

=======
>>>>>>> 6573be8d24cf0cbee1a7f139e066e3f73df7ff39
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
<<<<<<< HEAD
      const res = await axios.post("http://localhost:5000/emp/getEmp", {
        empId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setResponse(res.data[0]);
      console.log(res);
=======
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
>>>>>>> 6573be8d24cf0cbee1a7f139e066e3f73df7ff39
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const title = [
<<<<<<< HEAD
    "Designation:", 
    "Reporting Manager:", 
    "DOJ:", 
    "Function:", 
    "Department:", 
    "Band/Level:", 
    "Location:"
  ];
  const details = [
    response.designation, 
    response.reportionManager, 
    response.dateOfJoining, 
    response.function, 
    response.department, 
    response.level, 
    response.location
  ];

  return (
    <div className='w-[7%] bg-[#000046] p-4'>
      xxx
      {/* <div className='mb-4'>
        <img src={GVRLOGO} alt="GVR Logo" className='mx-auto'/>
      </div>
      <div className='w-[100%] text-white flex flex-col justify-center items-center'>
        <img src={UserImg} alt="User" className='h-[10vh] mb-4'/>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-xl font-bold mb-2'>{response.empName}</h1>
          <table className='text-left'>
            <tbody>
              {title.map((val, index) => (
                <tr key={index}>
                  <td className='text-pink-700 text-lg font-semibold pr-2'>{val}</td>
                  <td className='text-lg'>{details[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
}

export default UserDetailsCard;
=======
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
>>>>>>> 6573be8d24cf0cbee1a7f139e066e3f73df7ff39
