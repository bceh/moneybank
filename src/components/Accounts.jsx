import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import {
  dataAdded,
  dataDeleted,
  accAdded,
  accModified,
  accDeleted,
  getData,
  getAllAccById,
  getAllTransById,
} from "../store/dataSlice";

import Transaction from "./Transaction";
import Container from "@mui/material/Container";
import AccountDial from "./AccountDial";
import TransactionFilter from "./TransactionFilter";

const Accounts = () => {
  const userId = useSelector((state) => state.status.currentUserId);
  const dispatch = useDispatch();
  const data = useSelector(getData);
  const accounts = useSelector(getAllAccById(userId));
  const transactions = useSelector(getAllTransById(userId));

  const handleAddData = () => {
    dispatch(dataAdded());
  };
  const handleDeleteData = () => {
    dispatch(dataDeleted(userId));
  };
  const handleAddAccount = () => {
    dispatch(
      accAdded({
        userId,
        accAdded: { accName: "comm2", openingBalance: 10000 },
      })
    );
  };

  const handleModifyAccount = () => {
    dispatch(
      accModified({
        userId,
        accId: 0,
        accModified: { accName: "comm_", openingBalance: 1000 },
      })
    );
  };
  const handleDeleteAccount = (accId) => {
    dispatch(
      accDeleted({
        userId,
        accId,
      })
    );
  };

  const handlePrintAccount = () => {
    console.log(accounts);
  };

  const [transFilter, setTransFilter] = useState([-1, 1]);

  const accIds = accounts.map((acc) => acc.accId);
  const [accFilter, setAccFilter] = useState(accIds);
  const handleFilter = ({ transTypes, accIds }) => {
    setTransFilter(transTypes);
    setAccFilter(accIds);
  };

  const transactionsDisplayed = transactions.filter(
    (trans) =>
      transFilter.includes(trans.transType) && accFilter.includes(trans.accId)
  );
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <TransactionFilter accounts={accounts} onFilter={handleFilter} />
        <Container>
          {transactionsDisplayed.map((trans) => {
            return <Transaction key={trans.transId} {...trans} />;
          })}
        </Container>
      </Container>
      <AccountDial />
    </React.Fragment>
  );
};

export default Accounts;
