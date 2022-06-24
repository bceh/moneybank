import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useSelector } from "react-redux";
import { getAllAcc, getAllCate } from "../store/dataSlice";

const Joi = require("joi-browser");
const schema = Joi.object({
  payee: Joi.string().required().label("Payee"),
  amount: Joi.number().required().label("Amount"),
  accId: Joi.number().required().label("Account"),
  cateId: Joi.number().required().label("Category"),
  date: Joi.string().required().label("Date"),
  time: Joi.string().required().label("Time"),
  description: Joi.string(),
});
export const validateData = (data) => {
  const { error } = schema.validate(data);
  if (error) {
    if (error.details[0].path[0] === "cateId") {
      return '"Category" is not Allowed to be empty';
    } else {
      return error.details[0].message;
    }
  } else {
    return null;
  }
};

const TransactionTable = (props) => {
  const { data, setData, error, transType, onSetTransType } = props;
  const userId = useSelector((state) => state.status.currentUserId);
  const accs = useSelector(getAllAcc);
  const allCates = useSelector(getAllCate);

  const cates = allCates.filter((cate) => cate.transType === transType);
  const changeHandeler = (e) => {
    const { name, value } = e.currentTarget ? e.currentTarget : e.target;
    const newData = { ...data };
    newData[name] = value;
    setData(newData);
  };
  const typeButtonHandler = (e, type) => {
    const newData = { ...data };
    newData["cateId"] = "";
    setData(newData);
    onSetTransType(type);
  };

  return (
    <Grid container spacing={1} sx={{ mt: 0.1 }}>
      <Grid item xs={12}>
        <ToggleButtonGroup
          value={transType}
          exclusive
          onChange={typeButtonHandler}
          size="small"
          color="primary"
        >
          <ToggleButton value={-1}>Expense</ToggleButton>
          <ToggleButton value={1}>Income</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          name="payee"
          label="Payee"
          type="text"
          value={data["payee"]}
          onChange={changeHandeler}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          name="amount"
          label="Amount"
          type="number"
          value={data["amount"]}
          onChange={changeHandeler}
        />
      </Grid>
      <Grid item xs={6} sx={{ textAlign: "left" }}>
        <FormControl fullWidth>
          <InputLabel>Account</InputLabel>
          <Select
            name="accId"
            value={data["accId"]}
            onChange={changeHandeler}
            label="Account"
          >
            {accs.map((acc) => (
              <MenuItem key={acc.accId} value={acc.accId}>
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
            value={data["cateId"]}
            onChange={changeHandeler}
            label="Category"
          >
            <MenuItem value=""> </MenuItem>
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
          value={data["date"]}
          onChange={changeHandeler}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          name="time"
          label="Time"
          type="time"
          value={data["time"]}
          onChange={changeHandeler}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          name="description"
          label="Description"
          type="text"
          value={data["description"]}
          onChange={changeHandeler}
        />
      </Grid>
      <Grid item xs={12}>
        {Boolean(error) && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default TransactionTable;
