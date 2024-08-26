import React from 'react'
import UserImg from "../assets/user.png"


function UserDetailsCard() {
    var title = ["Desigination: ","Repoting Manager: ","DOJ: ","Function: ","Department: ","Band/Level: ","Location: "];
    var details = ["Senior Executive - HR ","Selvendran A","2024-06-03","Probation","Human Resources","Induvidual Contributor","Coimnatore"];
  return (
    <div className='p-10 w-[25%]  bg-red-100 text-blue-700 flex flex-col justify-center items-center '>
    <img src={UserImg} className='h-[10vh]'/>
    <div className='flex flex-col justify-center items-center'>
       <h1 className='text-xl font-bold'>Kishore Kumar K</h1>
       <div>
       {title.map((val,index)=><h1> <span className='text-black text-lg font-semibold'>{val}</span> {details[index]}</h1>)}

       </div>
       

    </div>
    </div>
  )
}

export default UserDetailsCard
