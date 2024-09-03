import { MdDashboard } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";


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
        </Link>
      </div>
    </div>
  
  )
}

export default Sidenav