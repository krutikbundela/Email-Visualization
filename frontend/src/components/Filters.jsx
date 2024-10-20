import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setPreferences, loadPreferences } from "../redux/preferenceSlice";
import { fetchData } from "../redux/dataSlice";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function Filters() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPreferences());
  }, [dispatch]);

  const { startDate, endDate, ageGroup, gender } = useSelector(
    (state) => state.preferences
  );

  const [localDate, setLocalDate] = useState([
    {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      key: "selection",
    },
  ]);
  const [localAgeGroup, setLocalAgeGroup] = useState(ageGroup || ""); 
  const [localGender, setLocalGender] = useState(gender || "");
  const isMobile = useMediaQuery("(max-width: 900px)");

  useEffect(() => {
    setLocalDate([
      {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        key: "selection",
      },
    ]);
  }, [startDate, endDate]);

  const handleAgeGroupChange = (event) => {
    setLocalAgeGroup(event.target.value);
  };

  const handleGenderChange = (event) => {
    setLocalGender(event.target.value);
  };

  const formatDateToMidnight = (date) => {
    const offset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - offset);
    return localDate.toISOString().split("T")[0];
  };

  const handleApplyFilters = () => {
    const preferences = {
      startDate: formatDateToMidnight(localDate[0].startDate),
      endDate: formatDateToMidnight(localDate[0].endDate),
      ageGroup: localAgeGroup,
      gender: localGender,
    };
    dispatch(setPreferences(preferences));
    dispatch(fetchData(preferences));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        borderRadius: 2,
        width: isMobile ? "100%" : "100%",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#DFF2FF",
      }}
    >
      <Box
        sx={{
          mb: 3,
          width: isMobile ? "100%" : "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DateRangePicker
          onChange={(item) => setLocalDate([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          ranges={localDate}
          months={isMobile ? 1 : 2}
          direction={isMobile ? "vertical" : "horizontal"}
          rangeColors={["#3e6fe1"]}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}
      >
        <FormControl sx={{ mb: isMobile ? 2 : 0 }}>
          <FormLabel
            sx={{ fontSize: "16px", fontWeight: "550", color: "black" }}
          >
            Age Group
          </FormLabel>
          <RadioGroup value={localAgeGroup} onChange={handleAgeGroupChange}>
            <FormControlLabel value="15-25" control={<Radio />} label="15-25" />
            <FormControlLabel value=">25" control={<Radio />} label=">25" />
          </RadioGroup>
        </FormControl>

        <FormControl sx={{ mb: isMobile ? 2 : 0 }}>
          <FormLabel
            sx={{ fontSize: "16px", fontWeight: "550", color: "black" }}
          >
            Gender
          </FormLabel>
          <RadioGroup value={localGender} onChange={handleGenderChange}>
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: isMobile ? "100%" : "90%",
          justifyContent: isMobile ? "space-between" : "space-evenly",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleApplyFilters}
          sx={{ width: isMobile ? "100%" : "45%", mb: isMobile ? 1 : 0 }}
        >
          Apply Filters
        </Button>
      </Box>
    </Paper>
  );
}
