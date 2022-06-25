//Components
import TransactionTable, { validateData } from "./TransactionTable";
//Redux
import { transModified, transDeleted } from "../../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
//Libraries
import React, { useState } from "react";
//mui/material
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const TransactionModifier = (props) => {
  const { open, onClose, data, setData } = props;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.status.currentUserId);
  const [error, setError] = useState(null);

  const transType = data.transType;
  const handleSaveTransition = () => {
    const {
      accId,
      amount,
      cateId,
      date,
      description,
      payee,
      time,
      transId,
      transType,
    } = data;
    const clearData = { ...data };
    delete clearData.transId;
    delete clearData.transType;
    const error = validateData(clearData);
    if (error) {
      setError(error);
    } else {
      dispatch(
        transModified({
          userId,
          transId,
          transModified: {
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
      setError(null);
    }
    handleClose();
  };

  const handleDeleteTransition = () => {
    dispatch(
      transDeleted({
        userId,
        transId: data.transId,
      })
    );
    handleClose();
  };
  const setTransType = (type) => {
    if (type !== null) {
      const newData = { ...data };
      newData.transType = type;
      setData(newData);
    }
  };
  const handleClose = () => {
    onClose();
    setError(null);
  };

  return (
    <Dialog fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle sx={{ color: transType === -1 ? "red" : "green" }}>
        Change {transType === -1 ? "Expense" : "Income"}
      </DialogTitle>
      <DialogContent>
        <TransactionTable
          data={data}
          setData={setData}
          error={error}
          transType={transType}
          onSetTransType={setTransType}
        ></TransactionTable>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          sx={{ borderColor: "gray", color: "gray" }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSaveTransition}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteTransition}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionModifier;
