import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import eventReducer from "./slices/eventSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
  },
});

export default store;
