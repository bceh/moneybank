import React, { useState, useEffect } from "react";
import AccountTable from "./AccountTable";
import Grid from "@mui/material/Grid";
import {
  accDeleted,
  getAccsWithBalance,
  accModified,
} from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../store/statusSlice";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AccountAddDialog from "./AccountAddDialog";
import AccountModifyDialog from "./AccountModifyDialog";

const AccManage = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector(getCurrentUserId);
  const accounts = useSelector(getAccsWithBalance);

  const defaultEditAccount = {
    isEdit: false,
    edittedAccId: null,
  };

  const [editAccount, setEditAccount] = useState(defaultEditAccount);
  const [openAddAccountDialog, setOpenAddAccountDialog] = useState(false);
  const [openModifiedAccountDialog, setOpenModifiedAccountDialog] =
    useState(false);
  let accData = {};

  useEffect(() => {
    accData = accounts.filter(
      (account) => account.accId === defaultEditAccount.edittedAccId
    )[0];
  }, [defaultEditAccount]);

  const selectHandler = (accId) => {
    if (accId !== editAccount.edittedAccId) {
      setEditAccount({ ...editAccount, edittedAccId: accId });
    } else {
      setEditAccount({ ...editAccount, edittedAccId: null });
    }
  };
  const editAccountHandler = () => {
    if (editAccount.isEdit === false) {
      setEditAccount({ ...editAccount, isEdit: true });
    } else {
      setEditAccount(defaultEditAccount);
    }
  };
  const accDeleteHandler = () => {
    dispatch(accDeleted({ userId, accId: editAccount.edittedAccId }));
  };
  const changeAccountHandler = (data) => {
    dispatch(
      accModified({
        userId,
        accId: editAccount.edittedAccId,
        accModified: data,
      })
    );
  };

  return (
    <React.Fragment>
      <AccountTable
        accounts={accounts}
        editAccount={editAccount}
        onSetEditAccount={selectHandler}
      />
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={editAccountHandler}>Edit Account</Button>
        {editAccount.isEdit && (
          <Box>
            <Button
              onClick={() => setOpenModifiedAccountDialog(true)}
              disabled={editAccount.edittedAccId === null}
            >
              Change
            </Button>
            <Button
              onClick={accDeleteHandler}
              disabled={editAccount.edittedAccId === null}
            >
              Delete
            </Button>
            <Button onClick={() => setOpenAddAccountDialog(true)}>
              Add New
            </Button>
          </Box>
        )}
      </Grid>

      <AccountAddDialog
        open={openAddAccountDialog}
        onClose={() => setOpenAddAccountDialog(false)}
      />
      <AccountModifyDialog
        open={openModifiedAccountDialog}
        onClose={() => setOpenModifiedAccountDialog(false)}
        accData={accData}
        onChangeAccount={changeAccountHandler}
      />
    </React.Fragment>
  );
};

export default AccManage;
