import React from 'react'
import { useParams } from 'react-router-dom';
import Nav from "./Nav"

const AdmProfile = () => {
    const { username } = useParams();
  return (
    <>
        <div className={`w-screen flex relative `}>
            <Nav username = {username} /> 
            <div className='flex justify-center items-center w-full'>
                <h1>Profile Page - {username}</h1>
            </div>
        </div>
    </>
  )
}

export default AdmProfile