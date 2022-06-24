import { getAllCate } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import {
  getCateIdNameMap,
  cateModified,
  cateAdded,
  getCateNames,
  cateDeleted,
} from "../store/dataSlice";
import { getCurrentUserId } from "../store/statusSlice";
import _ from "lodash";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";

const CategoryManage = () => {
  const userId = useSelector(getCurrentUserId);
  const dispatch = useDispatch();
  const existCateNames = useSelector(getCateNames);
  const allCate = useSelector(getAllCate);
  const cateIdMap = useSelector(getCateIdNameMap);
  let expenseCate = _.orderBy(
    allCate.filter((cate) => cate.transType === -1),
    "cateName"
  );
  let incomeCate = _.orderBy(
    allCate.filter((cate) => cate.transType === 1),
    "cateName"
  );
  const [editCate, setEditCate] = useState({
    transType: "-1",
    cateId: 0,
    cateName: "",
  });
  const [cateDialog, setCateDialog] = useState({
    open: false,
    type: "edit",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const editHandler = (cateId) => {
    setErrorMessage(null);
    setEditCate({ cateId: cateId, cateName: cateIdMap.get(cateId) });
    setCateDialog({ open: true, type: "edit" });
  };
  const submitHandler = () => {
    if (editCate.cateName === "") {
      setErrorMessage("Account Name is required");
      return;
    } else if (existCateNames.includes(editCate.cateName)) {
      setErrorMessage("Account Name already exists");
      return;
    }
    if (cateDialog.type === "edit") {
      dispatch(cateModified({ userId, ...editCate }));
      setCateDialog({ ...cateDialog, open: false });
    } else if (cateDialog.type === "add") {
      console.log(editCate);
      dispatch(
        cateAdded({
          userId,
          transType: editCate?.transType || "-1",
          cateName: editCate.cateName,
        })
      );
      setErrorMessage(null);
      setCateDialog({ ...cateDialog, open: false });
    }
  };
  const addHandler = () => {
    setErrorMessage(null);
    setEditCate({ cateName: "" });
    setCateDialog({ open: true, type: "add" });
  };
  const deleteHandler = () => {
    dispatch(cateDeleted({ userId, cateId: editCate.cateId }));
    setCateDialog({ ...cateDialog, open: false });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Expense Category
        </Typography>
        {expenseCate.map((cate) => (
          <Typography
            key={cate.cateId}
            onClick={() => editHandler(cate.cateId)}
            sx={{ cursor: "pointer" }}
          >
            {cate.cateName}
          </Typography>
        ))}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Income Category
        </Typography>
        {incomeCate.map((cate) => (
          <Typography
            key={cate.cateId}
            onClick={() => editHandler(cate.cateId)}
            sx={{ cursor: "pointer" }}
          >
            {cate.cateName}
          </Typography>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Button onClick={addHandler}>Add A New Category</Button>
      </Grid>
      <Typography sx={{ color: "gray", width: "100%" }} variant="caption">
        Please Click Category Names to Edit.
      </Typography>
      <Dialog
        open={cateDialog.open}
        onClose={() => setCateDialog({ ...cateDialog, open: false })}
      >
        <DialogTitle>
          {cateDialog.type === "edit" ? "Edit the" : "Add a"} Category
        </DialogTitle>
        <DialogContent>
          {cateDialog.type === "add" && (
            <FormControl sx={{ mt: 2 }} fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={editCate?.transType || "-1"}
                onChange={(e) =>
                  setEditCate({ ...editCate, transType: e.target.value })
                }
                label="Account"
              >
                <MenuItem value="-1">Expense</MenuItem>
                <MenuItem value="1">Income</MenuItem>
              </Select>
            </FormControl>
          )}
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            value={editCate.cateName}
            label="Name"
            onChange={(e) =>
              setEditCate({ ...editCate, cateName: e.currentTarget.value })
            }
          />
          {Boolean(errorMessage) && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {errorMessage}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCateDialog({ ...cateDialog, open: false })}>
            Cancel
          </Button>
          <Button onClick={submitHandler}>Confirm</Button>
          {cateDialog.type === "edit" && (
            <Button color="error" onClick={deleteHandler}>
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default CategoryManage;
