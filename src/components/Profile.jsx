import {
  getBasicInfoById,
  userChangedById,
  comparePasswordId,
  compareEmailPasswordId,
} from "../store/usersSlice";
import { currentUserIdSetted } from "../store/statusSlice";
import { useSelector, useDispatch } from "react-redux";
import _, { isEqual } from "lodash";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";

const Profile = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.status.currentUserId);
  const basicInfo = useSelector(getBasicInfoById(userId));
  const dispatch = useDispatch();
  let originData = {
    firstName: basicInfo.firstName,
    lastName: basicInfo.lastName,
    email: basicInfo.email,
  };
  const [data, setData] = useState(originData);
  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const Joi = require("joi-browser");
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null);

  const emptyPassword = {
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  };
  const [password, setPassword] = useState(emptyPassword);

  const schema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("Email"),
    password: Joi.string().required().min(8).label("Password"),
  };
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const newSchema = Joi.object({ [name]: schema[name] });
    const { error } = newSchema.validate(obj);
    return error ? error.details[0].message : null;
  };
  const handleChange = ({ currentTarget: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
    setErrors(newErrors || {});
    if (isEqual(newData, originData)) setIsChanged(false);
    else setIsChanged(true);
  };

  const handleDiscard = () => {
    setData(originData);
    setErrors({});
    setIsChanged(false);
  };

  const handleSave = () => {
    const newData = { ...data };
    dispatch(userChangedById({ userId, newData }));
    originData = newData;
    setIsChanged(false);
  };

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

  const [deleteData, setDeleteData] = useState({
    email: "",
    password: "",
  });

  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteErrorMessage("");
  };

  const isAbleDelete = useSelector(compareEmailPasswordId(deleteData, userId));

  const handleDeleteChange = ({ currentTarget: input }) => {
    const newData = { ...deleteData };
    newData[input.name] = input.value;
    setDeleteData(newData);
  };

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
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Personal Information */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              pt: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "gray", alignSelf: "flex-end" }}
            >
              Personal Information
            </Typography>
            <Typography
              variant="h3"
              sx={{ mb: 4 }}
            >{`${basicInfo.firstName} ${basicInfo.lastName}`}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={data["firstName"]}
                  onChange={handleChange}
                  error={Boolean(errors["firstName"])}
                  helperText={errors["firstName"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={data["lastName"]}
                  onChange={handleChange}
                  error={Boolean(errors["lastName"])}
                  helperText={errors["lastName"]}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={data["email"]}
                  onChange={handleChange}
                  error={Boolean(errors["email"])}
                  helperText={errors["email"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!isChanged}
                  onClick={handleDiscard}
                >
                  Discard Changes
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  disabled={!isChanged}
                  onClick={handleSave}
                  variant="contained"
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* Security  */}
        <Grid item xs={12} sm={12} md={12}>
          <Paper
            sx={{
              p: 2,
              pt: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: 100,
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "gray", alignSelf: "flex-end", mb: 1 }}
            >
              Security
            </Typography>
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
                <Dialog
                  fullWidth={true}
                  open={openPasswordDialog}
                  onClose={handleClosePasswordDialog}
                >
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogContent>
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
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClosePasswordDialog}>Cancel</Button>
                    <Button onClick={handleNewPasswordButton}>
                      Change Password
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* Account Deletion  */}
        <Grid item xs={12} sm={12} md={12}>
          <Paper
            sx={{
              p: 2,
              pt: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "gray", alignSelf: "flex-end", mb: 1 }}
            >
              Account Deletion
            </Typography>
            <Typography
              variant="caption"
              sx={{ alignSelf: "flex-start", mb: 1 }}
            >
              <Typography color="error" variant="p" component="span">
                Warning:
              </Typography>
              Deleting your account will permanently delete all your data. This
              action cannot be undone.
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
              <Dialog
                fullWidth={true}
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
              >
                <DialogTitle>Delete Account</DialogTitle>
                <DialogContent>
                  <Typography>Are you sure?</Typography>
                  <Typography>
                    All your data will be permanently deleted.
                  </Typography>
                  <Typography>
                    To proceed, please type your email address and password:
                  </Typography>
                  <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    name="email"
                    label="email"
                    type="email"
                    autocomplete="off"
                    value={deleteData.email}
                    onChange={handleDeleteChange}
                  />
                  <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autocomplete="off"
                    value={deleteData.password}
                    onChange={handleDeleteChange}
                  />
                  {Boolean(deleteErrorMessage) && (
                    <Alert severity="error" sx={{ mt: 1 }}>
                      {deleteErrorMessage}
                    </Alert>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                  <Button color="error" onClick={handleDelete}>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
