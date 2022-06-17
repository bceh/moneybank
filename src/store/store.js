import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./usersSlice";
import statusReducer from "./statusSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    status: statusReducer,
  },
});
