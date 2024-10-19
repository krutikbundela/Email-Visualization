// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
// import dataReducer from "./dataSlice";
// import preferenceReducer from "./preferenceSlice";

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//     data: dataReducer,
//     preferences: preferenceReducer,
//   },
// });

// export default store;


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import emailsReducer from "./emailSlice"; // From persisted project
import userReducer from "./userSlice"; // From MERN project
import dataReducer from "./dataSlice"; // From MERN project
import preferenceReducer from "./preferenceSlice"; // From MERN project

// Create a rootReducer by combining all reducers
const rootReducer = combineReducers({
  emails: emailsReducer, // Persisted reducer
  user: userReducer, // MERN reducers
  data: dataReducer,
  preferences: preferenceReducer,
});

// Define persist configuration only for the `emails` reducer
const persistConfig = {
  key: "emails",
  storage,
  whitelist: ["emails"], // Only persist the emails reducer
};

// Apply persist to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for persist
    }),
});

export const persistor = persistStore(store);
