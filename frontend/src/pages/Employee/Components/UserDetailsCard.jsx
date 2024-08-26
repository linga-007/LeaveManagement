import React from 'react'
import UserImg from "../assets/user.png"
import axios from 'axios'
import { useEffect , useState } from 'react'

function UserDetailsCard() {

  const [response,setResponse] = useState({});
  const empId = "3P1";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBJZCI6IjNQMSIsInJvbGUiOiIzUCIsImlhdCI6MTcyNDY2ODQ5NywiZXhwIjoxNzI0NjcyMDk3fQ.2anufOX8LjYRigGCAdH0mxOXJ2IktyWKPfI59mixzc8"
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
  
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

    var title = ["Desigination: ","Repoting Manager: ","DOJ: ","Function: ","Department: ","Band/Level: ","Location: "];
    var details = [response.designation , response.reportionManager,  response.dateOfJoining , response.function , response.department , response.level , response.location    ];
  return (
    <div className='p-10 w-[25%]  bg-red-100 text-blue-700 flex flex-col justify-center items-center '>
    <img src={UserImg} className='h-[10vh]'/>
    <div className='flex flex-col justify-center items-center'>
       <h1 className='text-xl font-bold'>{response.empName}</h1>
       <div>
       {title.map((val,index)=><h1> <span className='text-black text-lg font-semibold'>{val}</span> {details[index]}</h1>)}

       </div>
       

    </div>
    </div>
  )
}

export default UserDetailsCard
