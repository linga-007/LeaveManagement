import { IoCalendarNumberSharp } from "react-icons/io5";

import { MdHistory } from "react-icons/md";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Sidenav = () => {

  const token = document.cookie.split('=')[1];
  const decodedToken = jwtDecode(token);
  const id = decodedToken.empId
 
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#595d5e]  h-full w-[7rem]  flex flex-col items-center gap-y-[3rem]  py-[2rem]">
        <Link to ={`/Employee/${id}`} className="icon-a icon-hover flex items-center justify-center flex-col gap-y-2 mt-[4rem]">
          <IoCalendarNumberSharp  className="text-4xl font-semibold text-[#FEF3E2]"/>
          <p className="text-md font-semibold text-[#FEF3E2]">Leave</p>
        </Link>
        <Link to={`/history/${id}`} className="icon-a icon-hover flex items-center justify-center flex-col gap-y-2">
          <MdHistory className="text-4xl font-semibold text-[#FEF3E2]"/>
          <p className="text-md font-semibold text-[#FEF3E2]">Application</p>
        </Link>
      </div>
    </div>
  
  )
}

export default Sidenav