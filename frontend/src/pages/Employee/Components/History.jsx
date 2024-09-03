import React, { useEffect, useState } from 'react'
import Sidenav from './Sidenav'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';

const History = () => {

  const token = document.cookie.split('=')[1];
  console.log(token)
  const decodedToken = jwtDecode(token);

  const [data , setData] = useState([]);
  const getEmployeeLogs = async()=>{
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
      setData(res.data);
      console.log("history",res)
    }
    catch(e){
      console.error("History Error",e)
    }
  }
useEffect(()=>{
  getEmployeeLogs()
},[])
    

  return (
    <div className="w-screen h-screen flex">
        <Sidenav />
      <div className="w-full  flex flex-col pt-2 ">
         {data.map((e)=><div>{e.role}</div>)}
      </div>
  
    </div>
  )
}

export default History
