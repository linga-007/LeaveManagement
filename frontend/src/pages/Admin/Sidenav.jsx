import React from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { Button } from '@mui/material';
import { IoTimer } from "react-icons/io5";
import { VscRequestChanges } from "react-icons/vsc";




const Sidenav = ({setIsRequest,  setIsPermission}) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-slate-100  h-full w-[7rem] rounded-xl flex flex-col items-center gap-y-[3rem]  py-[2rem]">
        <button onClick={()=>setIsRequest(false) } className="icon-a icon-hover flex items-center justify-center flex-col gap-y-2 mt-[4rem]">
          <MdDashboard className="text-3xl text-slate-900"/>
          <p className="text-md font-semibold">Dashboard</p>
        </button>
        <button onClick={()=>{setIsRequest(true)
          setIsPermission(false)
        }} className="icon-a icon-hover flex items-center justify-center flex-col gap-y-2">
          <VscRequestChanges className="text-3xl text-slate-900"/>
          <p className="text-md font-semibold">Leaves</p>
        </button>
        <button onClick={()=>{setIsPermission(true)
           setIsRequest(false)}} className="icon-a icon-hover flex items-center justify-center flex-col gap-y-2">
          <IoTimer className="text-3xl text-slate-900"/>
          <p className="text-md font-semibold">Permission</p>
        </button>
      </div>
      
    
    </div>
  )
}

export default Sidenav