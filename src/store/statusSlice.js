import { createSlice } from "@reduxjs/toolkit";
const initialState = { currentUserId: -1 };

export const usersSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    currentUserIdSetted: (state, action) => {
      state.currentUserId = action.payload.userId;
    },
  },
});

export const { currentUserIdSetted } = usersSlice.actions;

export const getCurrentUserId = (state) => state.status.currentUserId;

export default usersSlice.reducer;
