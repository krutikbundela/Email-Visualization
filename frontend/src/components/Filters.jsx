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

  // Load saved preferences from Redux when the component mounts
  useEffect(() => {
    dispatch(loadPreferences());
  }, [dispatch]);

  // Get the saved preferences from Redux
  const { startDate, endDate, ageGroup, gender } = useSelector(
    (state) => state.preferences
  );

  // Local state for filters, which will only update Redux on apply
  const [localDate, setLocalDate] = useState([
    {
      startDate: new Date(startDate), // Ensure proper date parsing from Redux
      endDate: new Date(endDate),
      key: "selection",
    },
  ]);
  const [localAgeGroup, setLocalAgeGroup] = useState(ageGroup || ""); // Local state for age group
  const [localGender, setLocalGender] = useState(gender || ""); // Local state for gender
  const isMobile = useMediaQuery("(max-width: 600px)");

  // Update local date state when Redux preferences are loaded
  useEffect(() => {
    setLocalDate([
      {
        startDate: new Date(startDate), // Ensure proper date parsing from Redux
        endDate: new Date(endDate),
        key: "selection",
      },
    ]);
  }, [startDate, endDate]);

  const handleAgeGroupChange = (event) => {
    setLocalAgeGroup(event.target.value); // Update local age group state
  };

  const handleGenderChange = (event) => {
    setLocalGender(event.target.value); // Update local gender state
  };

  const handleReset = () => {
    const defaultDateRange = {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    };
    setLocalDate([defaultDateRange]);
    setLocalAgeGroup("");
    setLocalGender("");
  };

const formatDateToMidnight = (date) => {
  const offset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
  const localDate = new Date(date.getTime() - offset);
  return localDate.toISOString().split("T")[0]; // Return in YYYY-MM-DD format
};


  const handleApplyFilters = () => {
    const preferences = {
      startDate: formatDateToMidnight(localDate[0].startDate), // Corrected for time zone issue
      endDate: formatDateToMidnight(localDate[0].endDate), // Corrected for time zone issue
      ageGroup: localAgeGroup,
      gender: localGender,
    };
    // Save preferences in Redux and cookies
    dispatch(setPreferences(preferences));
    // Fetch data based on applied preferences
    dispatch(fetchData(preferences));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        borderRadius: 2,
        width: "100%",
        margin: "auto",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#DFF2FF",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <DateRangePicker
          onChange={(item) => setLocalDate([item.selection])} // Update local date range state
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          ranges={localDate}
          months={2}
          direction={isMobile ? "vertical" : "horizontal"}
          rangeColors={["#3f51b5"]}
        />
      </Box>
      <Box sx={{ display:"flex" , width :" 70%" , justifyContent:"space-evenly"}}>
        <FormControl sx={{ mb: 3 }}>
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
        <FormControl sx={{ mb: 3 }}>
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
          flexDirection: "column",
          width:"90%",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleReset}
          sx={{ mt: 2 }}
        >
          Reset Filters
        </Button>
      </Box>
    </Paper>
  );
}
