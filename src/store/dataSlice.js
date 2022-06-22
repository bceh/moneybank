import { TramSharp } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import initialState from "../data/user1Data";

let lastUserId = 0;

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

export const getTransById = (userId, transId) => (state) =>
  state.data[userId].transactions.find((trans) => trans.transId === transId);

export const getAccById = (userId, accId) => (state) =>
  state.data[userId].accounts[accId].accName;

export const getCateById = (userId, cateId) => (state) =>
  state.data[userId].categories[cateId].cateName;

export const getAccBalanceById = (userId, accId) => (state) => {
  state.data[userId].transactions
    .filter((trans) => trans.accId === accId)
    .reduce((sum, trans) => sum + parseInt(trans.type) * trans.amount, 0);
};

export const getAccBalancesById = (userId) => (state) => {
  return _.reduce(
    state.data[userId].transactions,
    (obj, trans) => {
      obj[trans.accId] =
        (obj[trans.accId] || 0) + trans.amount * trans.transType;
      return obj;
    },
    {}
  );
};

export default dataSlice.reducer;
