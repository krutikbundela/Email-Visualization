import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-moment";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  TimeScale,
);

const BarChart = ({ totalFeatures, setSelectedFeature }) => {
  const labels = Object.keys(totalFeatures || {});
  const TotalTimeSpent = Object.values(totalFeatures || {});

  const [highlightedIndex, setHighlightedIndex] = useState(null);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Time Spent",
        data: TotalTimeSpent,
        backgroundColor: labels.map((_, index) =>
          index === highlightedIndex ? "#071952" : "#088395"
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Sales",
        },
      },
      responsive: true,
      y: {
        title: {
          display: true,
          text: "Features (A, B, C, D, E, F)",
        },
      },
    },
    onClick: (event, activeElements) => {
      if (activeElements.length > 0) {
        const index = activeElements[0].index;
        if (highlightedIndex === index) {
          setHighlightedIndex(null);
          setSelectedFeature(null);
        } else {
          setHighlightedIndex(index);
          setSelectedFeature(labels[index]);
        }
      }
    },
  };

  return (
      <Bar data={chartData} options={options} />
  );
};

export default BarChart;
