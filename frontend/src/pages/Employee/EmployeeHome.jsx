import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from './Components/UserLeaveDetails';
import UserDetailsCard from './Components/UserDetailsCard';
import Nav from './Components/Nav';

import LeaveApplyForm from './Components/LeaveApplyForm';


function EmployeeHomePage() {

  const { username } = useParams();

  console.log(username);



  return (
    <div className="w-screen h-screen flex flex-col justify-evenly px-5 py-2">
      <Nav/>
      <div className="flex justify-start w-[100%]">
        <UserDetailsCard />
        <LeaveApplyForm/>
      </div>
      <Table />
    </div>
  );
}

export default EmployeeHomePage;
