//Components
import Transaction from "./Transaction";
import TransactionFilter from "./TransactionFilter";
import TransactionDialog, { validateData } from "./TransactionDialog";
import AccountDial from "./AccountDial";
//Redux
import {
  getAllAcc,
  getAllTrans,
  transDeleted,
  transAdded,
  transModified,
} from "../../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/statusSlice";
//Libraries
import _ from "lodash";
import React, { useState } from "react";
//mui/material
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Badge from "@mui/material/Badge";

const Accounts = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getCurrentUserId);

  const accounts = useSelector(getAllAcc);
  const transactions = useSelector(getAllTrans);

  const [transFilter, setTransFilter] = useState([-1, 1]);

  const accIds = accounts.map((acc) => acc.accId);
  const [accFilter, setAccFilter] = useState(accIds);
  const handleFilter = ({ transTypes, accIds }) => {
    setTransFilter(transTypes);
    setAccFilter(accIds);
  };

  const transactionsFiltered = transactions.filter(
    (trans) =>
      transFilter.includes(trans.transType) && accFilter.includes(trans.accId)
  );

  const [sort, setSort] = useState({ type: "date", order: "desc" });

  const transactionsSorted = _.orderBy(
    transactionsFiltered,
    sort.type,
    sort.order
  );

  const transactionsDisplayed = transactionsSorted;

  const getBateBadge = () => {
    if (sort.type === "date") {
      if (sort.order === "desc") {
        return <ArrowDropDownIcon />;
      } else if (sort.order === "asc") {
        return <ArrowDropUpIcon />;
      }
    }
    return "";
  };

  const getAmountBadge = () => {
    if (sort.type === "amount") {
      if (sort.order === "desc") {
        return <ArrowDropDownIcon />;
      } else if (sort.order === "asc") {
        return <ArrowDropUpIcon />;
      }
    }
    return "";
  };
  const handleSortButton = (type) => {
    if (type !== sort.type) {
      setSort({ type, order: "desc" });
    } else {
      setSort((prev) => {
        return {
          type: prev.type,
          order: prev.order === "asc" ? "desc" : "asc",
        };
      });
    }
  };

  const init = { open: false, data: {}, errorMessage: null };

  const [transDialog, setTransDialog] = useState(init);

  const closeHandler = () => {
    setTransDialog(init);
  };

  const transClickHandler = (transId) => {
    //        transId: number; transType: number; accId: number, amount: number; cateId: number; description: string; payee: string; date: string; time: string,

    const trans = transactions.find((trans) => trans.transId === transId);
    setTransDialog({
      type: "edit",
      open: true,
      data: trans,
      errorMessage: null,
    });
  };
  const addDialogHandler = (transType) => {
    setTransDialog({ type: "add", open: true, data: { transType } });
  };

  const changeHandler = (newData) => {
    setTransDialog({
      ...transDialog,
      data: { ...transDialog.data, ...newData },
      errorMessage: null,
    });
  };
  const deleteHandler = () => {
    dispatch(
      transDeleted({
        userId,
        transId: transDialog.data.transId,
      })
    );
    setTransDialog(init);
  };

  const submitHandler = () => {
    const { transId, ...newData } = transDialog.data;
    const errorMessage = validateData(newData);
    if (errorMessage) {
      setTransDialog({ ...transDialog, errorMessage });
      return;
    } else if (transDialog.type === "edit") {
      dispatch(
        transModified({
          userId,
          transId,
          transModified: { ...newData, amount: Number(newData.amount) },
        })
      );
    } else if (transDialog.type === "add") {
      dispatch(
        transAdded({
          userId,
          transAdded: { ...newData, amount: Number(newData.amount) },
        })
      );
    }
    setTransDialog(init);
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <TransactionFilter accounts={accounts} onFilter={handleFilter} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button sx={{ ml: 2 }} onClick={() => handleSortButton("date")}>
            <Badge badgeContent={getBateBadge()}>Date</Badge>
          </Button>
          <Button sx={{ mr: 2 }} onClick={() => handleSortButton("amount")}>
            <Badge badgeContent={getAmountBadge()}>Amount</Badge>
          </Button>
        </Box>
        <Container>
          {transactionsDisplayed.map((trans) => {
            return (
              <Transaction
                key={trans.transId}
                {...trans}
                onClick={transClickHandler}
              />
            );
          })}
        </Container>
      </Container>
      <AccountDial onAddDialogHandler={addDialogHandler} />
      <TransactionDialog
        open={transDialog.open}
        type={transDialog.type}
        onClose={closeHandler}
        data={transDialog.data}
        onSubmitHandler={submitHandler}
        onChangeHandler={changeHandler}
        onDeleteHandler={deleteHandler}
        errorMessage={transDialog.errorMessage}
      />
    </React.Fragment>
  );
};

export default Accounts;
