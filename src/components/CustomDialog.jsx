import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const CustomDialog = (props) => {
  const { children, open, onClose, title, submitButton } = props;
  return (
    <Dialog fullWidth={true} open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {submitButton}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
