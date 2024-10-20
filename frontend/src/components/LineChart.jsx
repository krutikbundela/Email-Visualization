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

  const colorPalette = [
    "#071952", 
    "#088395", 
    "#D1495B", 
    "#EDAE49", 
    "#00798C", 
    "#30638E", 
  ];

  
  const lineChartData = {
    labels: formattedDates,
    datasets: Object.keys(totalFeatures || {})
      .filter((feature) => !selectedFeature || feature === selectedFeature)
      .map((feature, index) => ({
        label: feature,
        data: newFilteredData.map((item) => item.features[feature]),
        borderColor: colorPalette[index % colorPalette.length],
        tension: 0.1,
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
           speed: 0.05, 
         },
         pinch: {
           enabled: true,
           speed: 0.05, 
         },
         mode: "xy",
         rangeMin: {
           x: null,
           y: 0, 
         },
         rangeMax: {
           x: null,
           y: 100, 
         },
       },
       pan: {
         enabled: true,
         mode: "xy",
         speed: 10, 
       },
     },
   },
 };


  return <Line data={lineChartData} options={lineChartOptions} />;
};

export default LineChart;
