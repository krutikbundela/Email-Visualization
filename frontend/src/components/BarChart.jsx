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
import zoomPlugin from "chartjs-plugin-zoom";
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
  zoomPlugin
);

const BarChart = ({ totalFeatures, setSelectedFeature }) => {
  const labels = Object.keys(totalFeatures || {});
  const salesData = Object.values(totalFeatures || {});

  const [highlightedIndex, setHighlightedIndex] = useState(null);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Sales",
        data: salesData,
        backgroundColor: labels.map((_, index) =>
          index === highlightedIndex ? "blue" : "rgba(75, 192, 192, 0.6)"
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Sales",
        },
      },
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
        // Toggle the selection
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
