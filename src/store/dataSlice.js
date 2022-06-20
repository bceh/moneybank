import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

let lastUserId = 0;
const initialState = [
  {
    userId: 0,
    lastAccId: 1,
    lastTransId: 5,
    lastCateId: 2,
    accounts: [
      {
        accId: 0,
        accName: "comm",
        openingBalance: 100,
      },
      {
        accId: 1,
        accName: "anz",
        openingBalance: 200,
      },
    ],
    categories: [
      {
        cateId: 0,
        cateName: "food",
      },
      {
        cateId: 1,
        cateName: "electronics",
      },
      {
        cateId: 2,
        cateName: "drink",
      },
    ],
    transactions: [
      {
        transType: -1,
        accId: 0,
        amount: 100,
        description: "eat",
        payee: "kfc",
        cateId: 0,
        date: "",
        date: "2020-03-05",
        time: "14:40",
        transId: 0,
      },
      {
        transType: -1,
        accId: 1,
        amount: 50,
        description: "eat",
        payee: "Chinese Restraunt",
        cateId: 0,
        date: "",
        date: "2020-05-05",
        time: "14:50",
        transId: 1,
      },
      {
        transType: -1,
        accId: 0,
        amount: 5,
        description: "coffee",
        payee: "starbucks",
        cateId: 2,
        date: "",
        date: "2020-06-05",
        time: "14:20",
        transId: 2,
      },
      {
        transType: -1,
        accId: 1,
        amount: 32,
        description: "eat",
        payee: "kfc",
        cateId: 2,
        date: "",
        date: "2020-06-01",
        time: "15:40",
        transId: 3,
      },
      {
        transType: -1,
        accId: 0,
        amount: 2940,
        description: "iphone",
        payee: "apple",
        cateId: 1,
        date: "2021-06-01",
        time: "14:40",
        transId: 4,
      },
      {
        transType: 1,
        accId: 0,
        amount: 350,
        description: "salary",
        payee: "app",
        cateId: 1,
        date: "2021-03-01",
        time: "9:40",
        transId: 5,
      },
    ],
  },
];

const emptyData = {
  lastAccId: -1,
  lastTransId: -1,
  accounts: [],
  transactions: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    dataAdded: (state) => {
      state.push({
        ...emptyData,
        userId: ++lastUserId,
      });
    },
    dataDeleted: (state, action) => {
      //payload: userId
      const userId = action.payload;
      state[userId] = { ...emptyData, userId };
    },
    accAdded: (state, action) => {
      //payload attrs: userId: , accAdded: {accName, openingBalance}
      const { userId, accAdded } = action.payload;
      state[userId].accounts.push({
        ...accAdded,
        accId: ++state[userId].lastAccId,
      });
    },

    accModified: (state, action) => {
      //payload attrs: userId: accId, accModified: {accName, openingBalance}
      const { userId, accId, accModified } = action.payload;
      const accounts = state[userId].accounts;
      const index = _.findIndex(accounts, ["accId", accId]);
      accounts[index] = { ...accounts[index], ...accModified };
    },

    accDeleted: (state, action) => {
      //payload attrs: userId, accId
      const { userId, accId } = action.payload;
      const accounts = state[userId].accounts;
      const index = _.findIndex(accounts, ["accId", accId]);
      accounts.splice(index, 1);
    },

    transAdded: (state, action) => {
      //payload attrs: userId:, transactionAdded: {accId, amount, description, payee, category, time}
      const { userId, transAdded } = action.payload;
      state[userId].transactions.push({
        ...transAdded,
        transId: ++state[userId].lastTransId,
      });
    },
    transModified: (state, action) => {
      //payload attrs: userId: transId, transModified: {accId, amount, description, payee, category, time}
      const { userId, transId, transModified } = action.payload;
      const transactions = state[userId].transactions;
      const index = _.findIndex(transactions, ["transId", transId]);
      transactions[index] = { ...transactions[index], ...transModified };
    },
    transDeleted: (state, action) => {
      //payload attrs: userId, transId
      const { userId, transId } = action.payload;
      const transactions = state[userId].transactions;
      const index = _.findIndex(transactions, ["transId", transId]);
      transactions.splice(index, 1);
    },
  },
});

export const {
  dataAdded,
  dataDeleted,
  accAdded,
  accModified,
  accDeleted,
  transAdded,
  transModified,
  transDeleted,
} = dataSlice.actions;

export const getData = (state) => state.data;
export const getAllAccById = (userId) => (state) => state.data[userId].accounts;

export const getAllCateById = (userId) => (state) =>
  state.data[userId].categories;

export const getAllTransById = (userId) => (state) =>
  state.data[userId].transactions;

export const getAccById = (userId, accId) => (state) =>
  state.data[userId].accounts[accId].accName;

export const getCateById = (userId, cateId) => (state) =>
  state.data[userId].categories[cateId].cateName;

export default dataSlice.reducer;
