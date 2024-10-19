import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import emailsReducer from "./emailSlice";
import userReducer from "./userSlice";
import dataReducer from "./dataSlice";
import preferenceReducer from "./preferenceSlice";

const rootReducer = combineReducers({
  emails: emailsReducer,
  user: userReducer,
  data: dataReducer,
  preferences: preferenceReducer,
});

const persistConfig = {
  key: "emails",
  storage,
  whitelist: ["emails"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
