import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import axios from 'axios';

function Table() {
  const [value, setValue] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const token = document.cookie.split('=')[1];
  const decodedToken = jwtDecode(token);
  const [data, setData] = useState({});

  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/table/getDetails",
        {
          empId: decodedToken.empId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setData(res.data);
      console.log(res.data)
      
      // Update the value array based on the retrieved data
      

      console.log("data", res.data);
    } catch (error) {
      console.error("Error fetching table data", error);
    }
  };
  
  useEffect(()=>{
    if (data.clDetails) {
      const clDetials_ = [data.clDetails.opBalance,data.clDetails.eligibility,data.clDetails.totalEligibility ,data.clDetails.availed , data.clDetails.LOP , data.clDetails.leaveLapsed , data.clDetails.leaveEncashed , data.clDetails.closingBalance , data.clDetails.carryForward , data.clDetails.futureAvailed , data.clDetails.futureClosingBalance ]
      setValue((prevValue) => {
        const newValue = [...prevValue];
        newValue[1] = clDetials_; // Update the first row of the array
  
        return newValue;
      });
    }
  
    if (data.plDetails) {
      const plDetails_ = [data.plDetails.opBalance,data.plDetails.eligibility,data.plDetails.totalEligibility ,data.plDetails.availed , data.plDetails.LOP , data.plDetails.leaveLapsed , data.plDetails.leaveEncashed , data.plDetails.closingBalance , data.plDetails.carryForward , data.plDetails.futureAvailed , data.plDetails.futureClosingBalance ]
      setValue((prevValue) => {
        const newValue = [...prevValue];
        newValue[0] = plDetails_; // Update the first row of the array
  
        return newValue;
      });
    }
  
    if (data.paternityLeave) {
      const paterneityLeave_ = [data.paternityLeave.opBalance,data.paternityLeave.eligibility,data.paternityLeave.totalEligibility ,data.paternityLeave.availed , data.paternityLeave.LOP , data.paternityLeave.leaveLapsed , data.paternityLeave.leaveEncashed , data.paternityLeave.closingBalance , data.paternityLeave.carryForward , data.paternityLeave.futureAvailed , data.clDetails.futureClosingBalance ]
      setValue((prevValue) => {
        const newValue = [...prevValue];
        newValue[2] = paterneityLeave_; // Update the first row of the array
  
        return newValue;
      });
    }
  },[data])

  const tableHead = [
    "Leave Type",
    "Op Balance",
    "Eligibility",
    "Total Eligibility",
    "Availed",
    "LOP",
    "Leave Lapsed",
    "Leave Encashed",
    "Closing Balance",
    "Max Leave Carry Forward",
    "Availed",
    "Closing Balance",
  ];

  const currentData = ["Privilege Leave", "Casual Leave", "Paternity Leave"];

  return (
    <div className=' bg-[#f5f6f7] p-3 rounded-md'>

<div className='flex flex-wrap flex-col w-[100%] '>
<div className="overflow-x-auto">
  <table className='table-fixed w-full border-collapse border border-gray-400 sm:min-w-full sm:table-fixed'>
    <thead className='bg-blue-600'>
      <tr>
        <th
          colSpan={tableHead.length}
          className=" text-left text-xs text-white uppercase"
        >
          Leave Balance Management
        </th>
      </tr>
    </thead>
    <thead className="divide-y divide-gray-200 bg-white">
      <tr className="bg-gray-50">
        {tableHead.map((val, index) => (
          <th
            key={index}
            className=" border border-gray-400 text-left text-md  text-gray-500 uppercase text-balance break-words"
          >
            <div className='flex justify-center items-center'>{val}</div>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {currentData.map((val, index) => (
        <tr key={index} className="border border-gray-400 bg-white text-[18px]">
          <td className=' border border-gray-400 '>
            <div className='flex justify-center items-center uppercase'>{val}</div>
          </td>
          {value[index].map((cellValue, i) => (
            <td key={i} className=' border border-gray-400 '>
              <div className='flex justify-center items-center '>{cellValue}</div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>

    </div>
    
  );
}

export default Table;
