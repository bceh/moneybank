import { useDispatch, useSelector } from "react-redux";
import { transAdded } from "../store/dataSlice";
import TransactionTable, { validateData } from "./TransactionTable";

import Button from "@mui/material/Button";
import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const TransactionAdd = (props) => {
  const { open, onClose, transType, onSetTransType } = props;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.status.currentUserId);
  const [data, setData] = useState({
    accId: 0,
    cateId: "",
  });

  const [error, setError] = useState(null);
  const handleClose = () => {
    onClose();
    setError(null);
    setData({ accId: 0, cateId: "" });
  };
  const handleAddTransition = () => {
    const { accId, amount, cateId, date, description, payee, time, transId } =
      data;

    const error = validateData(data);
    if (error) {
      setError(error);
    } else {
      dispatch(
        transAdded({
          userId,
          transAdded: {
            transType,
            accId,
            amount: Number(amount),
            description,
            payee,
            cateId,
            date,
            time,
          },
        })
      );
      handleClose();
    }
  };

  return (
    <Dialog fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle sx={{ color: transType === -1 ? "red" : "green" }}>
        New {transType === -1 ? "Expense" : "Income"}
      </DialogTitle>
      <DialogContent>
        <TransactionTable
          data={data}
          setData={setData}
          error={error}
          transType={transType}
          onSetTransType={onSetTransType}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddTransition}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionAdd;
