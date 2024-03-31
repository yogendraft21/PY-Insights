import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slice";

const store = configureStore({
  reducer: {
    global: globalReducer,
    // Add other reducers here if you have more slices
  },
});

export default store;
