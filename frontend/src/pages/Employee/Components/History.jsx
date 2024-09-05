import React, { useEffect, useState } from 'react'
import Sidenav from './Sidenav'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import LeaveHistoryTable from './LeaveHistoryTable';
import PermissionHistoryTable from './PermissionHistoryTable';
import Nav from './Nav';
import Cicular from './Circular';

const History = () => {

  const token = document.cookie.split('=')[1];
  console.log(token)
  const decodedToken = jwtDecode(token);

  const [leaveLogs , setLeaveLogs] = useState([]);
  const [permissionLogs , setPermissionLogs] = useState([]);


useEffect(()=>{
  getEmployeeLeaveLogs()
  getEmployeePermissionsLogs()
  console.log("length")
  console.log(leaveLogs.length)
},[])


const getEmployeeLeaveLogs = async()=>{
  try{
    const res =await axios.post("http://localhost:5000/leave/getLeave",
    {
      empId:decodedToken.empId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    )
    setLeaveLogs(res.data);
    console.log("history",res)
  }
  catch(e){
    console.error("History Error",e)
  }
}

const getEmployeePermissionsLogs = async()=>{
  try{
    const res =await axios.post("http://localhost:5000/permission/getPermission",
    {
      empId:decodedToken.empId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    )
    setPermissionLogs(res.data);
    console.log("per",res)
  }
  catch(e){
    console.error("History Error",e)
  }
}
    

  return (
    <div className="w-screen h-screen flex">
        <Sidenav />
      <div className="w-full h-full flex flex-col pt-2 ">
      <Nav/>
      <div className='flex  h-[90%] w-full  justify-start p-2'>
        
      <div className='flex flex-col justify-between   w-[75%] '>
        <LeaveHistoryTable LeaveLogs={leaveLogs}/>
        <PermissionHistoryTable PermissionLogs={permissionLogs}/>
        </div>       
      <Cicular/>
      </div>

      <div className="fixed bottom-0 left-0 w-full text-black opacity-65 text-center text-sm bg-white pb-1">
        <a href="https://sece.ac.in/" target="_blank" rel="noopener noreferrer">
          Copyright©2024 Sri Eshwar Technologies PVT LTD
        </a>
      </div>
      </div>
  
    </div>
  )
}

export default History
