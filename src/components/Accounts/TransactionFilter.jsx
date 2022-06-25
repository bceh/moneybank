//Libraries
import React, { useState } from "react";
//mui/material
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const TransactionFilter = (props) => {
  const { onFilter, accounts } = props;
  const [transTypeChecked, setTransTypeChecked] = useState([true, true]);
  const allAccsTrue = new Map(accounts.map((account) => [account.accId, true]));
  const [accChecked, setAccChecked] = useState(allAccsTrue);
  const changeHandler = (e) => {
    const { name, checked } = e.target;
    switch (name) {
      case "expense":
        setTransTypeChecked([checked, transTypeChecked[1]]);
        break;
      case "income":
        setTransTypeChecked([transTypeChecked[0], checked]);
        break;
      case "all":
        setTransTypeChecked([checked, checked]);
        break;
      default:
        break;
    }
  };
  const filterHandler = () => {
    const transTypes = [];
    transTypeChecked[0] && transTypes.push(-1);
    transTypeChecked[1] && transTypes.push(1);
    const accIds = [];
    accounts.forEach(({ accId }) => {
      if (accChecked.get(accId)) accIds.push(accId);
    });
    onFilter({ transTypes, accIds });
  };

  const accCheckHandler = (e) => {
    const { name, checked } = e.target;
    if (name === "all") {
      setAccChecked(
        new Map(accounts.map((account) => [account.accId, checked]))
      );
    } else {
      const newAccChecked = new Map(accChecked);
      newAccChecked.set(+name, checked);
      setAccChecked(newAccChecked);
    }
  };

  return (
    <Box>
      <Grid container sx={{ alignItems: "left" }}>
        <Grid item sx={{ textAlign: "left" }}>
          <Typography variant="overline">types</Typography>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  name="all"
                  onChange={changeHandler}
                  indeterminate={
                    transTypeChecked.some((c) => c) &&
                    transTypeChecked.some((c) => !c)
                  }
                  checked={transTypeChecked.every((c) => c)}
                />
              }
              label="All"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="expense"
                  onChange={changeHandler}
                  checked={transTypeChecked[0]}
                />
              }
              label="Expense"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="income"
                  onChange={changeHandler}
                  checked={transTypeChecked[1]}
                />
              }
              label="Income"
            />
          </FormGroup>
          <Typography variant="overline">Accounts</Typography>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  name="all"
                  onChange={accCheckHandler}
                  indeterminate={
                    [...accChecked.values()].some((c) => c) &&
                    [...accChecked.values()].some((c) => !c)
                  }
                  checked={[...accChecked.values()].every((c) => c)}
                />
              }
              label="All"
            />
            {accounts.map(({ accId, accName }) => (
              <FormControlLabel
                key={accId}
                control={
                  <Checkbox
                    key={accId}
                    name={accId + ""}
                    onChange={accCheckHandler}
                    checked={accChecked.get(accId)}
                  />
                }
                label={accName}
              />
            ))}
          </FormGroup>
          <Button onClick={filterHandler}>Filter</Button>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 2 }} />
    </Box>
  );
};

export default TransactionFilter;
