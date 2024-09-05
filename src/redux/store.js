import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice"; // Your root reducer

const store = configureStore({
  reducer: userReducer,
});

export { store };
