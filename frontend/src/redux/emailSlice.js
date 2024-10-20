import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmails = createAsyncThunk("fetchEmails", async (page) => {
  const response = await axios.get(
    `https://flipkart-email-mock.now.sh/?page=${page}`
  );
  return response.data.list;
});

export const fetchEmailBody = createAsyncThunk("fetchEmailBody", async (id) => {
  const response = await axios.get(
    `https://flipkart-email-mock.vercel.app/?id=${id}`
  );
  return { id, body: response.data.body };
});

const initialState = {
  isLoading: false,
  emails: [],
  isError: null,
  emailBody: {},
  selectedEmailId: "",
  reads: [],
  favorites: [],
  filters: {
    read: false,
    unread: false,
    favorite: false,
  },
  currentPage: 1,
  totalPages: 2,
};

const emailSlice = createSlice({
  name: "emails",
  initialState: initialState,
  reducers: {
    selectEmail: (state, action) => {
      state.selectedEmailId = action.payload;
    },
    clearSelectedEmail: (state) => {
      state.selectedEmailId = "";
    },
    markAsRead: (state, action) => {
      state.reads.push(action.payload);
    },
    toggleFavorite: (state, action) => {
      const emailId = action.payload;
      if (state.favorites.includes(emailId)) {
        state.favorites = state.favorites.filter((id) => id !== emailId);
      } else {
        state.favorites = [...state.favorites, emailId];
      }
    },

    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
      state.selectedEmailId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.emails = action.payload;
        state.isLoading = false;

        return state;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.isError = action.payload;
      })
      // =========================================================
      .addCase(fetchEmailBody.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEmailBody.fulfilled, (state, action) => {
        state.emailBody = action.payload;
        state.isLoading = false;

        return state;
      })
      .addCase(fetchEmailBody.rejected, (state, action) => {
        state.isError = action.payload;
      });
  },
});

export const {
  selectEmail,
  clearSelectedEmail,
  markAsRead,
  toggleFavorite,
  setFilter,
  setPage,
} = emailSlice.actions;

export default emailSlice.reducer;
