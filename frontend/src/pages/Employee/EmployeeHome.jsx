import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from './Components/UserLeaveDetails';
import UserDetailsCard from './Components/UserDetailsCard';
import Nav from './Components/Nav';
import LeaveAcceptedEmailTemplate from '../EmployeeAcceptedMailTemplate';
import Sidenav from './Components/Sidenav';
import LeaveApplyForm from './Components/LeaveApplyForm';


function EmployeeHomePage() {

  const { username } = useParams();

  console.log(username);



  return (
    <div className="w-screen h-screen flex bg-white">
        <Sidenav />
      <div className="w-screen  flex flex-col pt-1 ">
        <Nav/>
        <LeaveApplyForm/>
        <Table />
        <div className="h-full  text-black opacity-65 text-center  text-sm ">
      <p>Copyright©2024 Sri Eshwar Technologies PVT LTD</p>
    </div>
      </div>
  
    </div>
  );
}

export default EmployeeHomePage;
