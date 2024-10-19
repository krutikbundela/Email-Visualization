import { Paper } from "@mui/material";
import { useState } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

const Charts = ({ data }) => {
  const { newFilteredData, totalFeatures } = data || {};
  const [selectedFeature, setSelectedFeature] = useState(null); // State to track selected feature

  return (
    <Paper
      elevation={1}
      sx={{
        marginTop: "30px",
        width: "100%",
        height:"fit-content",
        padding: "20px",
        display: "flex",
        flexDirection:{xs:"column",md:"row"},
        backgroundColor: "#DFF2FF",
      }}
    >
      <Paper
        elevation={3}
        sx={{ width: "90%", padding: "20px", margin: "10px" }}
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
