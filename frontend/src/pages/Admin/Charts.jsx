import React from 'react'
import BarChart from './BarChart'
import DoughnutChart from './DoughnutChart'
import LineChart from './LineChart'

const Charts = () => {
  return (
    <div>
              <div className="w-full h-fit p-5 rounded-lg">
                <div className="flex justify-between">
                  <BarChart />
                  {/* <DoughnutChart/> */}
                  <DoughnutChart />
                </div>
              </div>
              <div className="w-full h-fit rounded-lg">
                <LineChart />
              </div>
            </div>
  )
}

export default Charts