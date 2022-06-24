import { createSlice, createSelector } from "@reduxjs/toolkit";
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
      const transactions = state[userId].transactions;
      const index = _.findIndex(accounts, ["accId", accId]);
      accounts.splice(index, 1);
      _.pullAllBy(transactions, [{ accId: accId }], "accId");
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

const data = (state) => state.data;
const userId = (state) => state.status.currentUserId;

export const getData = (state) => state.data;

export const getAllAccById = (userId) => (state) => state.data[userId].accounts;

export const getAllCateById = (userId) => (state) =>
  state.data[userId].categories;

export const getAllTransById = (userId) => (state) =>
  state.data[userId].transactions;

export const getTransById = (userId, transId) => (state) =>
  state.data[userId].transactions.find((trans) => trans.transId === transId);

export const getAccById = (userId, accId) => (state) => {
  return state.data[userId].accounts.find((acc) => acc.accId === accId);
};

export const getCateById = (userId, cateId) => (state) =>
  state.data[userId].categories[cateId];

export const getAccsWithBalance = createSelector(
  [data, userId],
  (data, userId) => {
    const accounts = _.cloneDeep(data[userId].accounts);
    const transactions = data[userId].transactions;
    transactions.forEach((trans) => {
      const acc = accounts.find((acc) => acc.accId === trans.accId);
      acc["currentBalance"] =
        (acc["currentBalance"] || acc.openingBalance) +
        trans.amount * trans.transType;
    });
    accounts.forEach((acc) => {
      acc["currentBalance"] = acc["currentBalance"] || acc.openingBalance;
    });
    return accounts;
  }
);

export const getAccNames = createSelector([data, userId], (data, userId) =>
  data[userId].accounts.map((acc) => acc.accName)
);

export const getCateIdNameMap = (userId) => (state) => {
  return _.reduce(
    state.data[userId].categories,
    (map, cate) => {
      map.set(cate.cateId, cate.cateName);
      map.set(cate.cateName, cate.cateId);
      return map;
    },
    new Map()
  );
};

export const getCateIdNameMapNew = createSelector(
  [data, userId],
  (data, userId) => {
    return _.reduce(
      data[userId].categories,
      (map, cate) => {
        map.set(cate.cateId, cate.cateName);
        map.set(cate.cateName, cate.cateId);
        return map;
      },
      new Map()
    );
  }
);

export const getAccIdNameMap = (userId) => (state) => {
  return _.reduce(
    state.data[userId].accounts,
    (map, acc) => {
      map.set(acc.accId, acc.accName);
      map.set(acc.accName, acc.accId);
      return map;
    },
    new Map()
  );
};

export const getAccIdNameMapNew = createSelector(
  [data, userId],
  (data, userId) => {
    return _.reduce(
      data[userId].accounts,
      (map, acc) => {
        map.set(acc.accId, acc.accName);
        map.set(acc.accName, acc.accId);
        return map;
      },
      new Map()
    );
  }
);

export const amountDisplay = (type, amount) =>
  type < 0
    ? `-$${Math.abs(amount)?.toFixed(2) || 0}`
    : `$${amount?.toFixed(2) || 0}`;

export default dataSlice.reducer;
