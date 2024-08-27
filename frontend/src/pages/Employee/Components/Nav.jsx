import React from 'react'
import GVR from '../../../images/GVRLogo.png'
import LogOut from '../../../images/logout.png'
function Nav() {
  return (
    <div className='w-[100%] shadow-md flex justify-between items-center px-5 py-2'>
        <div className='text-xl font-semibold'>
        <img src={GVR} className='h-10'/>
        </div>   
        <div >
            <button className='flex justify-center items-center'>
                LogOut
            <img src={LogOut} className='h-10'/>
            </button>
        </div>
    </div>
  )
}

export default Nav
