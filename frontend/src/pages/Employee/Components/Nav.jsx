import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import GVR from '../../../images/GVRLogo.png';
import userImg from '../../../images/profile.png';
import { useNavigate } from 'react-router-dom';

function Nav() {

  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const token = document.cookie.split('=')[1];
  const decodedToken = jwtDecode(token);
  const empId = decodedToken.empId;

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.post("http://localhost:5000/emp/getEmp", { empId }, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUserDetails(res.data[0]);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getUserDetails();
  }, [empId, token]);

  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

 
    // Implement logout functionality here
    const handleLogout = () => {
      // Remove the JWT cookie by setting its expiration date to a past date
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      console.log('Logged out, cookie removed');
      navigate("/");
  };

  return (
    <>
      <div className='w-full flex justify-center items-center pl-6 pr-6 rounded-lg'>
        <div className='w-[100%] shadow-md flex justify-between items-center px-5 py-2 rounded-lg bg-[#595d5e]'>
          <div className='text-xl font-semibold'>
            <img src={GVR} alt="GVR Logo" className='h-10' />
          </div>
          <div className='relative'>
            <button className='flex justify-center items-center bg-[#595d5e]' onClick={handleUserClick}>
              <img src={userImg} alt="User" className='h-10' />
            </button>
            {isDropdownOpen && (
              <div className='absolute right-0  w-80 bg-white shadow-lg rounded-lg p-4 z-50'>
                <div className='flex flex-col justify-center items-center'>
                  
                  <h1 className='text-xl font-bold'>{userDetails.empName}</h1>
                  <table className='text-left text-gray-700 mt-2'>
                    <tbody>
                      <tr>
                        <td className='font-semibold'>Designation:</td>
                        <td>{userDetails.designation}</td>
                      </tr>
                      <tr>
                        <td className='font-semibold'>Reporting Manager:</td>
                        <td>{userDetails.reportionManager}</td>
                      </tr>
                      <tr>
                        <td className='font-semibold'>DOJ:</td>
                        <td>{userDetails.dateOfJoining}</td>
                      </tr>
                      <tr>
                        <td className='font-semibold'>Function:</td>
                        <td>{userDetails.function}</td>
                      </tr>
                      <tr>
                        <td className='font-semibold'>Department:</td>
                        <td>{userDetails.department}</td>
                      </tr>
                      <tr>
                        <td className='font-semibold'>Band/Level:</td>
                        <td>{userDetails.level}</td>
                      </tr>
                      <tr>
                        <td className='font-semibold'>Location:</td>
                        <td>{userDetails.location}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    className='mt-4 bg-red-500 text-white px-4 py-2 rounded-lg'
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isDropdownOpen && (
        <div 
          className='fixed inset-0 bg-black opacity-50' 
          onClick={() => setIsDropdownOpen(false)} 
        />
      )}
    </>
  );
}

export default Nav;
