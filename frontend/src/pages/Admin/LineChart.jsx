import React from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LineChart = () => {
  const sampleData = [43, 40, 50, 40, 70, 40, 45, 33, 40, 60, 40, 50, 36];

  // Create gradient fill
  const createGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgb(0, 0, 139)'); // dark blue at the bottom
    gradient.addColorStop(1, 'rgb(200, 221, 244)'); // light blue shade at the top
    return gradient;
  };

  const canvasData = {
    datasets: [
      {
        label: "Home",
        borderColor: "navy",
        pointRadius: 0,
        fill: true,
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) {
            // Fallback for initial chart load
            return 'rgba(0, 0, 139, 0.5)';
          }
          return createGradient(ctx, chartArea);
        },
        lineTension: 0.4,
        data: sampleData,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        ticks: {
          color: "red",
          font: {
            family: "Nunito",
            size: 12,
          },
        },
        title: {
          display: true,
          text: 'Month', // Replace with your desired label
          color: 'black',
          font: {
            family: "Nunito",
            size: 14,
            weight: 'semibold',
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        min: 0,
        max: 80,
        ticks: {
          stepSize: 10,
          color: "green",
          font: {
            family: "Nunito",
            size: 12,
          },
        },
        title: {
          display: true,
          text: 'Leave Taken', // Replace with your desired label
          color: 'black',
          font: {
            family: "Nunito",
            size: 14,
            weight: 'semibold',
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  const graphStyle = {
    minHeight: "10rem",
    width: "100%",
    border: "1px solid #C4C4C4",
    borderRadius: "0.375rem",
    padding: "0.5rem",
  };

  return (
    <div style={graphStyle}>
      <Line id="home" options={options} data={canvasData} />
    </div>
  );
}

export default LineChart;
