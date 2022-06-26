//mui/material
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";

const AccountManageDialog = (props) => {
  const {
    open,
    type,
    onClose,
    accName,
    openingBalance,
    onSubmitHandler,
    onChangeHandler,
    errorMessage,
  } = props;
  return (
    <Dialog fullWidth={true} open={open} onClose={onClose}>
      <DialogTitle>{`${
        type === "edit" ? "Modify The" : "Add a New"
      } Account`}</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mt: 1 }}
          fullWidth
          name="accName"
          label="Account Name"
          type="text"
          value={accName}
          onChange={(e) => onChangeHandler({ accName: e.currentTarget.value })}
        />
        <TextField
          sx={{ mt: 1 }}
          fullWidth
          label="Opening Balance"
          type="number"
          value={openingBalance}
          onChange={(e) =>
            onChangeHandler({ openingBalance: e.currentTarget.value })
          }
        />
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmitHandler}>{`${
          type === "edit" ? "Change" : "Add"
        }`}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountManageDialog;
