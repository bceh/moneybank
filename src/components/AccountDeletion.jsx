import { userChangedById, compareEmailPasswordId } from "../store/usersSlice";
import { currentUserIdSetted } from "../store/statusSlice";

import PaperContainer from "./PaperContainer";
import CustomDialog from "./CustomDialog";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const AccountDeletion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.status.currentUserId);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
  const [deleteData, setDeleteData] = useState({
    email: "",
    password: "",
  });

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteErrorMessage("");
  };

  const handleDeleteChange = ({ currentTarget: input }) => {
    const newData = { ...deleteData };
    newData[input.name] = input.value;
    setDeleteData(newData);
  };

  const isAbleDelete = useSelector(compareEmailPasswordId(deleteData, userId));

  const handleDelete = () => {
    if (!isAbleDelete) {
      setDeleteErrorMessage("Incorrected Email Address or Password");
    } else {
      const newData = { lastName: "", firstName: "", email: "", password: "" };
      dispatch(userChangedById({ userId, newData }));
      dispatch(currentUserIdSetted({ userId: -1 }));
      navigate("/signin");
    }
  };

  return (
    <PaperContainer subTitle="Account Deletion">
      <Typography variant="caption" sx={{ alignSelf: "flex-start", mb: 1 }}>
        <Typography color="error" variant="p" component="span">
          Warning:
        </Typography>
        Deleting your account will permanently delete all your data. This action
        cannot be undone.
      </Typography>
      <Grid item xs={10} sm={6} md={4}>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={() => setOpenDeleteDialog(true)}
        >
          Delect Account
        </Button>
        <CustomDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          title="Delete Account"
          submitButton={
            <Button color="error" onClick={handleDelete}>
              Delete
            </Button>
          }
        >
          <Typography>Are you sure?</Typography>
          <Typography>All your data will be permanently deleted.</Typography>
          <Typography>
            To proceed, please type your email address and password:
          </Typography>
          <TextField
            sx={{ mt: 1 }}
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            value={deleteData.email}
            onChange={handleDeleteChange}
          />
          <TextField
            sx={{ mt: 1 }}
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={deleteData.password}
            onChange={handleDeleteChange}
          />
          {Boolean(deleteErrorMessage) && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {deleteErrorMessage}
            </Alert>
          )}
        </CustomDialog>
      </Grid>
    </PaperContainer>
  );
};

export default AccountDeletion;
