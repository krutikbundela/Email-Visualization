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

  const formattedDates = newFilteredData.map((item) =>
    dayjs(item.day, "YYYY-MM-DD").toDate()
  );

  // Define a consistent color palette that complements the bar chart
  const colorPalette = [
    "#071952", // Dark blue (same as highlighted bar color)
    "#088395", // Teal blue (same as regular bar color)
    "#D1495B", // Coral red
    "#EDAE49", // Golden yellow
    "#00798C", // Deep cyan
    "#30638E", // Slate blue
  ];

  // Prepare data for the line chart
  const lineChartData = {
    labels: formattedDates,
    datasets: Object.keys(totalFeatures || {})
      .filter((feature) => !selectedFeature || feature === selectedFeature)
      .map((feature, index) => ({
        label: feature,
        data: newFilteredData.map((item) => item.features[feature]),
        borderColor: colorPalette[index % colorPalette.length],
        // backgroundColor: colorPalette[index % colorPalette.length] + "50", // Slightly transparent fill color
        tension: 0.1,
        // fill: true, // Enable background fill
      })),
  };

 const lineChartOptions = {
   responsive: true,
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
           speed: 0.05, // Lower the speed for less sensitive zoom
         },
         pinch: {
           enabled: true,
           speed: 0.05, // Lower speed for pinch zoom
         },
         mode: "xy",
         rangeMin: {
           x: null,
           y: 0, // Prevent zooming out beyond 0 on the y-axis
         },
         rangeMax: {
           x: null,
           y: 100, // Adjust this to limit the zoom-out level on the y-axis
         },
       },
       pan: {
         enabled: true,
         mode: "xy",
         speed: 10, // Lower panning speed for smoother control
       },
     },
   },
 };


  return <Line data={lineChartData} options={lineChartOptions} />;
};

export default LineChart;
