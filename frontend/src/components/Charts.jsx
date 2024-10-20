import { Paper } from "@mui/material";
import { useState } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

const Charts = ({ data }) => {
  const { newFilteredData, totalFeatures } = data || {};
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <Paper
      elevation={1}
      sx={{
        margin: "30px 0px",
        width: "100%",
        height: "fit-content",
        padding: "20px",
        display: "flex",
        flexDirection: { sm:"column" ,xs: "column", md: "row" ,xl:"row" },
        backgroundColor: "#EBF4F6",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "90%",
          padding: "20px",
          margin: "10px",
        }}
      >
        <BarChart
          totalFeatures={totalFeatures}
          setSelectedFeature={setSelectedFeature}
        />
      </Paper>
      <Paper
        elevation={3}
        sx={{ width: "90%", padding: "20px", margin: "10px" }}
      >
        <LineChart
          data={{ newFilteredData, totalFeatures }}
          selectedFeature={selectedFeature}
        />
      </Paper>
    </Paper>
  );
};

export default Charts;
