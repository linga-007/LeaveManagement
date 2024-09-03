import { MdDashboard } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";
<<<<<<< HEAD


const Sidenav = () => {
 
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-black bg-opacity-5  h-full w-[7rem] rounded-xl flex flex-col items-center gap-y-[3rem]  py-[2rem]">
        <Link to ='/Employee' className="icon-a icon-hover flex items-center justify-center flex-col gap-y-2 mt-[4rem]">
          <MdDashboard className="text-3xl text-black -100"/>
          <p className="text-sm">Dashboard</p>
        </Link>
        <Link to="/calllog" className="icon-a icon-hover flex items-center justify-center flex-col gap-y-2">
          <IoCall className="text-3xl text-black-100"/>
          <p className="text-sm">Call Logs</p>
=======
import { jwtDecode } from "jwt-decode";

const Sidenav = () => {

  const token = document.cookie.split('=')[1];
  const decodedToken = jwtDecode(token);
  const id = decodedToken.empId
 
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#595d5e]  h-full w-[7rem]  flex flex-col items-center gap-y-[3rem]  py-[2rem]">
        <Link to ={`/Employee/${id}`} className="icon-a icon-hover flex items-center justify-center flex-col gap-y-2 mt-[4rem]">
          <MdDashboard className="text-4xl font-semibold text-[#FEF3E2]"/>
          <p className="text-md font-semibold text-[#FEF3E2]">Dashboard</p>
        </Link>
        <Link to={`/history/${id}`} className="icon-a icon-hover flex items-center justify-center flex-col gap-y-2">
          <IoCall className="text-4xl font-semibold text-[#FEF3E2]"/>
          <p className="text-md font-semibold text-[#FEF3E2]">History</p>
>>>>>>> 6573be8d24cf0cbee1a7f139e066e3f73df7ff39
        </Link>
      </div>
    </div>
  
  )
}

export default Sidenav