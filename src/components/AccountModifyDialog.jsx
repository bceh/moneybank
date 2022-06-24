import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { accModified, getAccById, getAccNames } from "../store/dataSlice";

import Joi from "joi-browser";
import Alert from "@mui/material/Alert";

const AccountModifyDialog = (props) => {
  const { open, onClose, onChangeAccount } = props;

  const accNames = useSelector(getAccNames);

  const schema = Joi.object({
    accName: Joi.string().required().label("Account Name"),
    openingBalance: Joi.string().required().label("Opening Balance"),
  });
  const defaultData = {
    accName: "",
    openingBalance: "",
  };

  const [data, setData] = useState(defaultData);
  const [errorMessage, setErrorMessage] = useState();
  const closeHandler = () => {
    setErrorMessage(null);
    onClose();
  };

  const changeAccountHandler = () => {
    const newData = { ...data, openingBalance: Number(data.openingBalance) };
    const { error } = schema.validate(data);
    if (error) {
      setErrorMessage(error.details[0].message);
    } else {
      onChangeAccount(newData);
      closeHandler();
    }
  };

  return (
    <Dialog fullWidth={true} open={open} onClose={closeHandler}>
      <DialogTitle>Modify The Account</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mt: 1 }}
          fullWidth
          name="accName"
          label="Account Name"
          type="text"
          value={data.accName}
          onChange={(e) => setData({ ...data, accName: e.currentTarget.value })}
        />
        <TextField
          sx={{ mt: 1 }}
          fullWidth
          label="Opening Balance"
          type="number"
          value={data.openingBalance}
          onChange={(e) =>
            setData({ ...data, openingBalance: e.currentTarget.value })
          }
        />
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Cancel</Button>
        <Button onClick={changeAccountHandler}>Change</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountModifyDialog;
