import { Line } from "react-chartjs-2";
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
import dayjs from "dayjs";

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

const LineChart = ({ data, selectedFeature }) => {
  const { newFilteredData, totalFeatures } = data || {};

  // Ensure that dates are parsed into JavaScript Date objects
  const formattedDates = newFilteredData.map((item) =>
    dayjs(item.day, "YYYY-MM-DD").toDate()
  );

  // Prepare data for the line chart
  const lineChartData = {
    labels: formattedDates,
    datasets: Object.keys(totalFeatures || {})
      .filter((feature) => !selectedFeature || feature === selectedFeature) // Filter based on selected feature
      .map((feature, index) => ({
        label: feature,
        data: newFilteredData.map((item) => item.features[feature]),
        borderColor: `hsl(${
          (index * 360) / Object.keys(totalFeatures).length
        }, 100%, 50%)`,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3,
      })),
  };

  const lineChartOptions = {
    scales: {
      x: {
        type: "time",
        title: {
          display: true,
          text: "Date",
        },
        time: {
          unit: "day",
          tooltipFormat: "MMM D, YYYY",
        },
      },
      y: {
        title: {
          display: true,
          text: "Sales",
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
  };

  return (
      <Line data={lineChartData} options={lineChartOptions} />
  );
};

export default LineChart;
