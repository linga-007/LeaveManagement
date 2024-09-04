import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

const BarChart = () => {
  const data = {
    labels: ['Dpt 1', 'Dpt 2', 'Dpt 3', 'Dpt 4', 'Dpt 5' ,"Dpt 6" ,"Dpt 7"],
    datasets: [
      {
        label: 'Department',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [12, 19, 3, 5, 2 , 6,9],
      },
    ],
  };

  const options = {
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //   },
    // },
  };

  return (
    <div className="w-[40rem] h-[14rem] flex  justify-center items-center p-0">
      <Bar data={data} options={options} width={200} height={70}/>
    </div>
  );
};

export default BarChart;