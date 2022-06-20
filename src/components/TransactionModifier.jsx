import { useDispatch, useSelector } from "react-redux";
import { transModified, transDeleted } from "../store/dataSlice";
import TransactionTable, { validateData } from "./TransactionTable";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";

const TransactionModifier = (props) => {
  const { transId } = props;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.status.currentUserId);
  const [data, setData] = useState({ ...props });
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
            amount,
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
  };

  const handleDeleteTransition = () => {
    dispatch(
      transDeleted({
        userId,
        transId,
      })
    );
  };
  const setTransType = (type) => {
    if (type !== null) {
      const newData = { ...data };
      newData.transType = type;
      setData(newData);
    }
  };
  return (
    <Grid container spacing={1}>
      <TransactionTable
        data={data}
        setData={setData}
        error={error}
        transType={transType}
        onSetTransType={setTransType}
      ></TransactionTable>
      <Grid item xs={6} sm={9}></Grid>
      <Grid item xs={3} sm={1.5}>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          onClick={handleSaveTransition}
        >
          Save
        </Button>
      </Grid>
      <Grid item xs={3} sm={1.5}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          onClick={handleDeleteTransition}
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  );
};

export default TransactionModifier;
