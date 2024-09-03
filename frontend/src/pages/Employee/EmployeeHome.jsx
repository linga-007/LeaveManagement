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
<<<<<<< HEAD
    <div className="w-screen h-screen flex ">
        <Sidenav />
      <div className=" w-full px-3 py-3 ">
=======
    <div className="w-screen h-screen flex">
        <Sidenav />
      <div className="w-full  flex flex-col pt-2 ">
        <Nav/>
>>>>>>> 6573be8d24cf0cbee1a7f139e066e3f73df7ff39
        <LeaveApplyForm/>
        <Table />
      </div>
  
    </div>
  );
}

export default EmployeeHomePage;
