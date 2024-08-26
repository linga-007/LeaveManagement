import React from 'react'
// import { useState , useEffect} from 'react';
import axios from 'axios';
function Table() {

  // const [response,setResponse] = useState({});
  const empId = "3P1";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBJZCI6IjNQMSIsInJvbGUiOiIzUCIsImlhdCI6MTcyNDY2ODQ5NywiZXhwIjoxNzI0NjcyMDk3fQ.2anufOX8LjYRigGCAdH0mxOXJ2IktyWKPfI59mixzc8"
  

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
      // setResponse(res.data[0]);
      console.log(res);
  
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  const tableHead = ["Leave Type","Op Balance", "Eligibility", "Total Eligibility", "Availed", "LOP", "Leave Lapsed","Leave Encashed","closing Balance","Max Leave Carry Forward","Availed","Closing Balance"];

  const currentData = ["Paternity Leave","Paternity Leave","Paternity Leave"]
  const value = [[1,2,3,4,5,6,7,8,9,10,11],[1,2,3,4,5,6,7,8,9,10,11],[1,2,3,4,5,6,7,8,9,10,11]];
  return (
    <>
        <div className='flex flex-wrap flex-col w-[100%]'>
          <table className='table-fixed w-[100%] border-collapse border border-gray-400'>
          <thead className='bg-blue-600'>
              <tr>
                <th colSpan={tableHead.length} className="px-5 py-3 text-left text-xs text-white uppercase">
                  Leave Balance Management
                </th>
              </tr>
            </thead>
            <thead className="divide-y divide-gray-200 bg-white">
              <tr className="bg-gray-50">
                {tableHead.map((val, index) => (
                  <th key={index} className="px-5 py-5  border border-gray-400 text-left text-xs text-gray-500 uppercase  text-balance break-words">
                    <div className='flex justify-center items-center'>
                    {val}
                      </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((val,index)=>  <tr key={index} className="border border-gray-400">
                  <td className='px-3 py-2 border border-gray-400 '><div className='flex justify-center items-center uppercase'>{val}</div></td>
                  {value[index].map((val, i) => (
                    <td key={i} className='border border-gray-400'><div className='flex justify-center items-center'>{val}</div></td>
                  ))}
                </tr>)}
            </tbody>
          
          </table>
        </div>

    </>
  )
}

export default Table
