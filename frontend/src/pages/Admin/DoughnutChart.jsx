import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";

const DoughnutChart = () => {
  Chart.register(ArcElement, Tooltip, Legend, Title);
  Chart.defaults.plugins.tooltip.backgroundColor = "rgb(0, 0, 156)";
  Chart.defaults.plugins.legend.position = "right";
  Chart.defaults.plugins.legend.title.display = true;
  Chart.defaults.plugins.legend.title.text = "60 of 100 Done";
  Chart.defaults.plugins.legend.title.font = "Helvetica Neue";

  const data = {
    labels: ["GVR", "3P "],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["rgb(0, 197, 0)", "rgb(204, 223, 243)"],
        borderWidth: 2,
        radius: "100%",
      },
    ],
  };

  return (
    <div className="w-[16rem] h-[14rem] flex  justify-center items-center p-0">
      <div>
        {/* <h2>Requests Summary Widget</h2> */}
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default DoughnutChart;
