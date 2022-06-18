import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;
const initialState = [
  {
    email: "user1@example.com",
    password: "88888888",
    firstName: "Francis",
    lastName: "Cheng",
    id: 0,
  },
];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userRegistered: (state, action) => {
      state.push({
        ...action.payload,
        id: ++lastId,
      });
    },
    userChangedById: (state, action) => {
      const userId = action.payload.userId;
      state[userId] = {
        ...state[userId],
        ...action.payload.newData,
      };
    },
  },
});

export const { userRegistered, userChangedById } = usersSlice.actions;

export default usersSlice.reducer;

export const isLoggedIn =
  ({ email, password }) =>
  (state) => {
    const arr = state.users.filter(
      (user) => email === user.email && password === user.password
    );
    if (arr.length === 1) {
      return { status: "success", userId: arr[0].id };
    } else {
      return { status: "fail" };
    }
  };

export const isEmailExist = (email) => (state) =>
  state.users.some((user) => email === user.email);

export const getUserNumber = (state) => state.users.length;

export const getBasicInfoById = (id) => (state) => {
  return {
    firstName: state.users[id].firstName,
    lastName: state.users[id].lastName,
    email: state.users[id].email,
  };
};

export const comparePasswordId = (password, id) => (state) =>
  password === state.users[id].password;

export const compareEmailPasswordId =
  ({ email, password }, id) =>
  (state) =>
    email === state.users[id].email && password === state.users[id].password;
