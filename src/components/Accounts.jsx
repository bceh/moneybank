import { useDispatch, useSelector } from "react-redux";
import {
  dataAdded,
  dataDeleted,
  accAdded,
  accModified,
  accDeleted,
  transAdded,
  transModified,
  transDeleted,
  getData,
  getAllAccById,
  getAllTransById,
} from "../store/dataSlice";

import Transaction from "./Transaction";
import Container from "@mui/material/Container";
import AccountDial from "./AccountDial";

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
  const handleAddTransition = () => {
    dispatch(
      transAdded({
        userId,
        transAdded: {
          accId: 1,
          amount: 500,
          description: "iphone",
          payee: "apple",
          cateId: 0,
          date: "2020-03-05",
          time: "15:30",
        },
      })
    );
  };

  const handleModifyTransition = () => {
    dispatch(
      transModified({
        userId,
        transId: 0,
        transModified: {
          accId: 1,
          amount: 500,
          description: "iphone",
          payee: "apple",
          cateId: 1,
          date: "2020-03-05",
          time: "14:30",
        },
      })
    );
  };

  const handleDeleteTransition = (transId) => {
    dispatch(
      transDeleted({
        userId,
        transId,
      })
    );
  };

  const handlePrintTransition = () => {
    console.log(transactions);
  };
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <div>
          <button onClick={() => console.log(data)}>PrintData</button>
          <button onClick={handleAddData}>AddData</button>
          <button onClick={handleDeleteData}>DeleteData</button>
        </div>
        <div>
          <button onClick={handleAddAccount}>AddAccount</button>
          <button onClick={handlePrintAccount}>PrintAccount</button>
          <button onClick={handleModifyAccount}>ModifyAccount</button>
          <button onClick={handleDeleteAccount}>DeleteAccount</button>
          {accounts.map((acc) => (
            <div
              name={acc.accId}
              key={acc.accId}
              onClick={() => handleDeleteAccount(acc.accId)}
            >
              {acc.accName}_{acc.openingBalance}_{acc.accId}
            </div>
          ))}
        </div>
        <div>
          {transactions.map((trans) => {
            return <Transaction key={trans.transId} {...trans} />;
          })}
        </div>
      </Container>
      <AccountDial />
    </div>
  );
};

export default Accounts;
