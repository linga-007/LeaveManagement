import React, { useEffect, useState } from 'react';
import UserImg from "../assets/user.png";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import GVRLOGO from "../../../images/GVR.png";

function UserDetailsCard() {
  const [response, setResponse] = useState({});

  const token = document.cookie.split('=')[1];
  const decodedToken = jwtDecode(token);
  const empId = decodedToken.empId;

  console.log("token ", empId);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const title = [
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
