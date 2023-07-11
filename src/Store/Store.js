import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import studentsSlice from "./studentsSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    students: studentsSlice,
  },
});

export default store;
