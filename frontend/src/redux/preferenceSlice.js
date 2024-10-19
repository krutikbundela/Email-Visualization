import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { addDays } from "date-fns";

// Check if preferences cookie exists
const savedPreferences = Cookies.get("preferences");

// Set initialState based on the existence of the cookie
const initialState = savedPreferences
  ? JSON.parse(savedPreferences) // If cookie exists, use its value
  : {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      ageGroup: "15-25",
      gender: "Male",
    };

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setPreferences: (state, action) => {
      const { startDate, endDate, ageGroup, gender } = action.payload;
      state.startDate = startDate;
      state.endDate = endDate;
      state.ageGroup = ageGroup;
      state.gender = gender;

      // Save preferences to cookies
      Cookies.set("preferences", JSON.stringify(action.payload), {
        expires: 7,
      });
    },
    loadPreferences: (state) => {
      const preferences = Cookies.get("preferences");
      if (preferences) {
        const { startDate, endDate, ageGroup, gender } = JSON.parse(preferences);
        state.startDate = startDate;
        state.endDate = endDate;
        state.ageGroup = ageGroup;
        state.gender = gender;
      }
    },
  },
});

export const { setPreferences, loadPreferences } = preferencesSlice.actions;

export default preferencesSlice.reducer;
