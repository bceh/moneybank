import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./usersSlice";
import statusReducer from "./statusSlice";
import dataReducer from "./dataSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    status: statusReducer,
    data: dataReducer,
  },
});
