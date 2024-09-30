import cartReducer from "./cartReducer";
import authReducer from "../features/auth/authSlice";

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // only persist cart slice
};

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer, // any other slices you have
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore serialization warnings for Redux Persist
    }),
});

// Persistor setup
export const persistor = persistStore(store);

export default store;
