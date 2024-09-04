import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from './Components/UserLeaveDetails';
import Nav from './Components/Nav';
import Sidenav from './Components/Sidenav';
import LeaveApplyForm from './Components/LeaveApplyForm';
import History from './Components/History';
// Import the History component if it exists
// import History from './Components/History';

function EmployeeHomePage() {
  const { username } = useParams();
  const [isLeave, setIsLeave] = useState("Leave");
  console.log(username);

return (
    <>
        <div className="w-screen h-screen flex flex-row bg-white">
          <Sidenav />
      {isLeave === "Leave" ? (   
        <>
          <div className="flex-1 flex flex-col pt-1">
            <Nav />
            <LeaveApplyForm />
            <Table />
          </div>
          <div className="fixed bottom-0 left-0 w-full text-black opacity-65 text-center text-sm bg-white p-2">
            <a href="https://sece.ac.in/" target="_blank" rel="noopener noreferrer">
              Copyright©2024 Sri Eshwar Technologies PVT LTD
            </a>
          </div>
        </>
        ):   (<History />) }
        </div>
    </>
  );
}

export default EmployeeHomePage;
