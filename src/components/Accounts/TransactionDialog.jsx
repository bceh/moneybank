//Redux
import { getAllAcc, getAllCate } from "../../store/dataSlice";
import { useSelector } from "react-redux";
//mui/material
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Joi from "joi-browser";

const schema = Joi.object({
  payee: Joi.string().required().label("Payee"),
  amount: Joi.number().required().label("Amount"),
  accId: Joi.number().required().label("Account"),
  cateId: Joi.number().required().label("Category"),
  date: Joi.string().required().label("Date"),
  time: Joi.string().required().label("Time"),
  description: Joi.string(),
  transType: Joi.number(),
});

export const validateData = (data) => {
  const { error } = schema.validate(data);
  if (error) {
    if (error.details[0].path[0] === "cateId") {
      return '"Category" is not Allowed to be empty';
    } else if (error.details[0].path[0] === "accId") {
      return '"Account" is not Allowed to be empty';
    } else {
      return error.details[0].message;
    }
  } else {
    return null;
  }
};

const TransactionDialog = (props) => {
  const {
    type,
    open,
    onClose,
    data,
    onChangeHandler,
    errorMessage,
    onDeleteHandler,
    onSubmitHandler,
  } = props;

  const accs = useSelector(getAllAcc);
  const allCates = useSelector(getAllCate);

  const cates = allCates.filter((cate) => cate.transType === data.transType);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    onChangeHandler({ [name]: value });
  };

  const typeChangeHandler = (e, value) => {
    if (value === null) return;
    onChangeHandler({ transType: Number(value), cateId: undefined });
  };

  return (
    <Dialog fullWidth={true} open={open} onClose={onClose}>
      <DialogTitle sx={{ color: data.transType === -1 ? "red" : "green" }}>
        {`${type === "edit" ? "Change" : "New"} ${
          data.transType === -1 ? "Expense" : "Income"
        }`}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1} sx={{ mt: 0.1 }}>
          <Grid item xs={12}>
            <ToggleButtonGroup
              value={String(data.transType)}
              exclusive
              size="small"
              color="primary"
              onChange={typeChangeHandler}
            >
              <ToggleButton value="-1">Expense</ToggleButton>
              <ToggleButton value="1">Income</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="payee"
              label="Payee"
              type="text"
              value={data.payee}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="amount"
              label="Amount"
              type="number"
              value={data.amount}
              onChange={(e) => onChangeHandler({ amount: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "left" }}>
            <FormControl fullWidth>
              <InputLabel>Account</InputLabel>
              <Select
                name="accId"
                value={String(data.accId)}
                onChange={(e) =>
                  onChangeHandler({ accId: Number(e.target.value) })
                }
                label="Account"
              >
                <MenuItem value={undefined}> </MenuItem>
                {accs.map((acc) => (
                  <MenuItem key={acc.accId} value={String(acc.accId)}>
                    {acc.accName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "left" }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="cateId"
                value={String(data.cateId)}
                onChange={(e) =>
                  onChangeHandler({ cateId: Number(e.target.value) })
                }
                label="Category"
              >
                <MenuItem value={undefined}> </MenuItem>
                {cates.map((cate) => {
                  return (
                    <MenuItem key={cate.cateId} value={cate.cateId}>
                      {cate.cateName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              name="date"
              label="Date"
              type="date"
              value={data.date}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              name="time"
              label="Time"
              type="time"
              value={data.time}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="description"
              label="Description"
              type="text"
              value={data.description}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12}>
            {Boolean(errorMessage) && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errorMessage}
              </Alert>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          sx={{ borderColor: "gray", color: "gray" }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button variant="outlined" color="primary" onClick={onSubmitHandler}>
          {type === "edit" ? "Save" : "Add"}
        </Button>
        {type === "edit" && (
          <Button variant="outlined" color="error" onClick={onDeleteHandler}>
            Delete
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TransactionDialog;
