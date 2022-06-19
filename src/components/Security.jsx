import PaperContainer from "./PaperContainer";
import CustomDialog from "./CustomDialog";
import React, { useState } from "react";
import { userChangedById, comparePasswordId } from "../store/usersSlice";

import { useSelector, useDispatch } from "react-redux";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const Security = () => {
  const Joi = require("joi-browser");
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.status.currentUserId);
  const emptyPassword = {
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  };
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [password, setPassword] = useState(emptyPassword);

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
    setPasswordMessage(null);
  };
  const handlePasswordChange = ({ currentTarget: input }) => {
    const newPassword = { ...password };
    newPassword[input.name] = input.value;
    setPassword(newPassword);
  };

  const passwordSchema = Joi.object({
    oldPassword: Joi.string().required().label("Old Password"),
    newPassword: Joi.string().min(8).required().label("New Password"),
    repeatPassword: Joi.ref("newPassword"),
  });

  const isPasswordCorrect = useSelector(
    comparePasswordId(password.oldPassword, userId)
  );

  const handleNewPasswordButton = () => {
    let catchError = "";
    const { error } = passwordSchema.validate(password);
    if (error) {
      if (error.details[0].path[0] === "repeatPassword") {
        catchError = "Please make sure your passwords match";
      } else {
        catchError = error.details[0].message;
      }
      setPasswordMessage({ type: "error", message: catchError });
    } else if (!isPasswordCorrect) {
      setPasswordMessage({
        type: "error",
        message: "The old password you have entered is incorrected",
      });
    } else {
      const newData = { password: password.newPassword };
      dispatch(
        userChangedById({
          userId,
          newData,
        })
      );
      setPassword(emptyPassword);
      setPasswordMessage({
        type: "success",
        message: "Your password has been changed successfully",
      });
    }
  };

  return (
    <PaperContainer subTitle="Security">
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid item xs={10} sm={6} md={4}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setOpenPasswordDialog(true)}
          >
            Change Password
          </Button>
          <CustomDialog
            open={openPasswordDialog}
            onClose={handleClosePasswordDialog}
            title="Change Password"
            submitButton={
              <Button onClick={handleNewPasswordButton}>Change Password</Button>
            }
          >
            <TextField
              sx={{ mt: 1 }}
              fullWidth
              name="oldPassword"
              label="Old Password"
              type="password"
              value={password.oldPassword}
              onChange={handlePasswordChange}
            />
            <TextField
              sx={{ mt: 1 }}
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              value={password.newPassword}
              onChange={handlePasswordChange}
            />
            <TextField
              sx={{ mt: 1 }}
              fullWidth
              name="repeatPassword"
              label="Repeat Password"
              type="password"
              value={password.repeatPassword}
              onChange={handlePasswordChange}
            />
            {Boolean(passwordMessage) && (
              <Alert severity={passwordMessage.type} sx={{ mt: 1 }}>
                {passwordMessage.message}
              </Alert>
            )}
          </CustomDialog>
        </Grid>
      </Grid>
    </PaperContainer>
  );
};

export default Security;
