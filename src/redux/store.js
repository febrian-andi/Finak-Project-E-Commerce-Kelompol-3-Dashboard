import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";

const authTransform = createTransform(
  // Inbound transform: what gets stored in Redux Persist
  (inboundState) => ({
    user: inboundState.user,
    isLoggedIn: inboundState.isLoggedIn,
  }),
  // Outbound transform: what gets rehydrated (restored) into Redux store
  (outboundState) => outboundState
);

const persistConfig = {
  key: "isLoggedIn",
  storage,
  whitelist: ["auth"],
  transforms: [authTransform],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
