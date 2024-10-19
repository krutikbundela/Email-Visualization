import { Box, Button, Paper, Typography } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Filters from "../components/Filters";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchData } from "../redux/dataSlice";
import Charts from "../components/Charts";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Loader from "../components/Loader";
import { loadPreferences } from "../redux/preferenceSlice";

const Dashboard = () => {
  const [newFilteredData, setNewFilteredData] = useState([]);
  const [totalFeatures, setTotalFeatures] = useState({});
  const [isProcessed, setIsProcessed] = useState(false);
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.data);
  const { startDate, endDate, ageGroup, gender } = useSelector((state) => state.preferences);
  const { user, isAuthenticated, isUserLoading, isUserError } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(loadPreferences());
    dispatch(fetchData({ startDate, endDate, ageGroup, gender }));
  }, [dispatch, startDate, endDate, ageGroup, gender]);

  useEffect(() => {
    if (!isLoading && data.length > 0) {
      const { totalFeatures, newFilteredData } = FilterData(data);
      setTotalFeatures(totalFeatures);
      setNewFilteredData(newFilteredData);
      setIsProcessed(true);
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


  const handleShare = () =>{

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
  }

  return (
    <>
      <Typography> {user ? user.name : ""} </Typography>
      <Box
        sx={{
          width: "100%",
          height: {
            xs: "fit-content", // shorter height on mobile
            sm: "fit-content", // small devices
            md: "200px", // default height on larger screens
          },
          display: "flex",
          flexDirection: { sm: "column", xs: "column", md: "row", xl: "row" },
          justifyContent: {
            xs: "center", // center content on mobile
            sm: "flex-start", // align to the left on small screens and above
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
            flexDirection: { sm: "column" ,xs:"column", md: "row", xl: "row" },
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
              justifyContent: {sm:"flex-start",md:"space-between"},
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
            >{`${startDate} TO ${endDate}`}</Typography>
          </Paper>
          <Paper
            evaluation={1}
            sx={{
              width: { sm: "100%", xs: "100%", md: "auto" },
              height: "80%",
              p: 2,
              display: "flex",
              justifyContent: {sm:"flex-start",md:"space-between"},
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
              justifyContent: {sm:"flex-start",md:"space-between"},
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

      {isLoading || !isProcessed ? (
        <Loader />
      ) : (
        <Charts data={{ newFilteredData, totalFeatures }} />
      )}
      <Filters />
    </>
  );
};

export default Dashboard;