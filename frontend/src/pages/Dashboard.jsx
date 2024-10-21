import { Alert, Box, Button, Paper, Typography } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Filters from "../components/Filters";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchData } from "../redux/dataSlice";
import Charts from "../components/Charts";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Loader from "../components/Loader";
import {
  fetchDefaultPreferences,
  loadPreferences,
} from "../redux/preferenceSlice";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [newFilteredData, setNewFilteredData] = useState([]);
  const [totalFeatures, setTotalFeatures] = useState({});
  const [isProcessed, setIsProcessed] = useState(false);
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.data);
  const { startDate, endDate, ageGroup, gender } = useSelector(
    (state) => state.preferences
  );

  useEffect(() => {
    const savedPreferences = Cookies.get("preferences");
    if (!savedPreferences) {
      dispatch(fetchDefaultPreferences());
      dispatch(fetchData({ startDate, endDate, ageGroup, gender }));
    } else {
      dispatch(loadPreferences());
      dispatch(fetchData({ startDate, endDate, ageGroup, gender }));
    }
  }, [dispatch, startDate, endDate, ageGroup, gender]);

  useEffect(() => {
    if (!isLoading) {
      if (data.length === 0) {
        setIsProcessed(false);
      } else {
        const { totalFeatures, newFilteredData } = FilterData(data);
        setTotalFeatures(totalFeatures);
        setNewFilteredData(newFilteredData);
        setIsProcessed(true);
      }
    }
  }, [isLoading, data]);

  const FilterData = (data) => {
    const totalFeatures = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };

    const newFilteredData = data.map((item) => {
      totalFeatures.A += item.features.A;
      totalFeatures.B += item.features.B;
      totalFeatures.C += item.features.C;
      totalFeatures.D += item.features.D;
      totalFeatures.E += item.features.E;
      totalFeatures.F += item.features.F;

      return {
        ...item,
        day: new Date(item.day).toISOString().split("T")[0],
      };
    });

    return { totalFeatures, newFilteredData };
  };

  const handleShare = () => {
    const queryParams = new URLSearchParams({
      startDate: startDate,
      endDate: endDate,
      ageGroup: ageGroup,
      gender: gender,
    });

    const shareableURL = `${
      window.location.origin
    }/share?${queryParams.toString()}`;

    navigator.clipboard.writeText(shareableURL).then(() => {
      alert("Shareable link copied to clipboard!");
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: {
            xs: "fit-content",
            sm: "fit-content",
            md: "200px",
          },
          display: "flex",
          flexDirection: { sm: "column", xs: "column", md: "row", xl: "row" },
          justifyContent: {
            xs: "center",
            sm: "flex-start",
          },
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: { sm: "100%", xs: "100%", md: "auto" },
            height: "100%",
          }}
        >
          <Button
            variant="contained"
            sx={{ width: "100%", height: "100%", alignSelf: "flex-start" }}
          >
            <FilterAltOutlinedIcon />
            Filter
          </Button>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: { sm: "column", xs: "column", md: "row", xl: "row" },
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Paper
            evaluation={1}
            sx={{
              width: { sm: "100%", xs: "100%", md: "auto" },
              height: "80%",
              p: 2,
              display: "flex",
              justifyContent: { sm: "flex-start", md: "space-between" },
              alignItems: "center",
              flexDirection: { sm: "row", xs: "row", md: "column" },
            }}
          >
            <Button variant="contained">
              <FilterAltOutlinedIcon />
              Date Range
            </Button>
            <Typography
              className="active"
              sx={{
                p: 1,
                fontSize: { sm: "1rem", xs: "1rem", md: "1.5rem" },
                ml: { sm: "10px", xs: "10px" },
                fontStyle: "bold",
                fontWeight: "500",
              }}
            >
              {`${formatDate(startDate)} TO ${formatDate(endDate)}`}
            </Typography>
          </Paper>
          <Paper
            evaluation={1}
            sx={{
              width: { sm: "100%", xs: "100%", md: "auto" },
              height: "80%",
              p: 2,
              display: "flex",
              justifyContent: { sm: "flex-start", md: "space-between" },
              alignItems: "center",
              flexDirection: { sm: "row", xs: "row", md: "column" },
            }}
          >
            <Button variant="contained">
              <FilterAltOutlinedIcon />
              Age Group
            </Button>
            <Typography
              className="active"
              sx={{
                p: 1,
                fontSize: { sm: "1rem", xs: "1rem", md: "1.5rem" },
                ml: { sm: "10px", xs: "10px" },
                fontStyle: "bold",
                fontWeight: "500",
              }}
            >{`${ageGroup}`}</Typography>
          </Paper>
          <Paper
            evaluation={1}
            sx={{
              width: { sm: "100%", xs: "100%", md: "auto" },
              height: "80%",
              p: 2,
              display: "flex",
              justifyContent: { sm: "flex-start", md: "space-between" },
              alignItems: "center",
              flexDirection: { sm: "row", xs: "row", md: "column" },
            }}
          >
            <Button variant="contained">
              <FilterAltOutlinedIcon />
              Gender
            </Button>
            <Typography
              className="active"
              sx={{
                p: 1,
                fontSize: { sm: "1rem", xs: "1rem", md: "1.5rem" },
                ml: { sm: "10px", xs: "10px" },
                fontStyle: "bold",
                fontWeight: "500",
              }}
            >{`${gender}`}</Typography>
          </Paper>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            width: { sm: "100%", xs: "100%", md: "auto" },
            height: "100%",
          }}
        >
          <Button
            variant="contained"
            sx={{ width: "100%", height: "100%", alignSelf: "flex-start" }}
            onClick={handleShare}
          >
            <SendOutlinedIcon />
            Share
          </Button>
        </Paper>
      </Box>

      {isLoading ? (
        <Loader />
      ) : data && data.length > 0 && isProcessed ? (
        <Charts data={{ newFilteredData, totalFeatures }} />
      ) : (
        <Alert
          severity="error"
          sx={{
            align:"center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
            width: "100%",
            fontSize:"20px",
            fontWeight:"500",
            margin: "30px 0px",
          }}
        >
          No data available. Please adjust your filters.
        </Alert>
      )}

      <Filters />
    </>
  );
};

export default Dashboard;
