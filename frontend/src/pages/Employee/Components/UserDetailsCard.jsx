import React from 'react'
import UserImg from "../assets/user.png"
import axios from 'axios'
import { useEffect , useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import GVRLOGO from "../../../images/GVR.png"



 
function UserDetailsCard() {

  const [response,setResponse] = useState({});
 
  const token = document.cookie.split('=')[1]
  const decodedToken = jwtDecode(token)
  const empId = decodedToken.empId


  console.log("token ",empId)

  useEffect(()=>{
 
    getData();
  },[])

  const getData = async() =>{
    try {
      const res = await axios.post("http://localhost:5000/emp/getEmp",{
      empId
      },
       {

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setResponse(res.data[0]);
      console.log(res);
      console.log( )
   
  
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

    var title = ["Desigination: ","Repoting Manager: ","DOJ: ","Function: ","Department: ","Band/Level: ","Location: "];
    var details = [response.designation , response.reportionManager,  response.dateOfJoining , response.function , response.department , response.level , response.location    ];
  return (
    <div className='w-[25%]  bg-[#000046]  '>
      <div className=''>
          <img src={GVRLOGO}/> 
          </div>
 <div className='w-[100%] text-white flex flex-col justify-center items-center '>
    <img src={UserImg} className='h-[10vh]'/>
    <div className='flex flex-col justify-center items-center'>
       <h1 className='text-xl font-bold'>{response.empName}</h1>
       <div>
       {title.map((val,index)=><h1> <span className='text-pink-700 text-lg font-semibold'>{val}</span> {details[index]}</h1>)}

       </div>
    </div>
    </div>
    </div>
   
  )
}

export default UserDetailsCard
