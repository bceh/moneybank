//Components
import AccountTable from "./AccTable";
import AccountManageDialog from "./AccManageDialog";

//Redux
import { getCurrentUserId } from "../../store/statusSlice";
import {
  accDeleted,
  getAccsWithBalance,
  accModified,
  getAccNames,
  getAccIdNameMap,
  accAdded,
} from "../../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
//Libraries
import React, { useReducer } from "react";
import Joi from "joi-browser";
//mui/material
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const editingInit = {
  isEditing: false,
  accId: null,
  openDialog: false,
  type: "add",
  accName: "",
  openingBalance: "",
  errorMessage: null,
};

const editingReducer = (state, action) => {
  switch (action.type) {
    case "editOrNot":
      if (state.isEditing === true) {
        return editingInit;
      } else {
        return { ...state, isEditing: true };
      }
    case "openDialog":
      return { ...state, openDialog: true, ...action.payload };
    case "closeDialog":
      return { ...state, openDialog: false, errorMessage: null };
    case "select":
      const accId = action.payload.accId;
      if (state.accId !== accId) {
        return { ...state, accId: action.payload.accId };
      } else {
        return { ...state, accId: null };
      }
    case "change":
      return { ...state, ...action.payload };
    case "error":
      return { ...state, errorMessage: action.payload.errorMessage };
    default:
      return;
  }
};

const AccManage = () => {
  const dispatch = useDispatch();
  const [editing, dispatchEditing] = useReducer(editingReducer, editingInit);
  const accIdNameMap = useSelector(getAccIdNameMap);
  const userId = useSelector(getCurrentUserId);
  const accounts = useSelector(getAccsWithBalance);

  const selectHandler = (accId) => {
    dispatchEditing({
      type: "select",
      payload: {
        accId,
      },
    });
  };

  const editHandler = () => {
    const acc = accounts.find((acc) => acc.accId === editing.accId);
    dispatchEditing({
      type: "openDialog",
      payload: {
        type: "edit",
        accName: acc.accName,
        openingBalance: acc.openingBalance,
      },
    });
  };

  const addHandler = () => {
    dispatchEditing({
      type: "openDialog",
      payload: {
        type: "add",
        accName: "",
        openingBalance: "",
      },
    });
  };

  const deleteHandler = () => {
    dispatch(accDeleted({ userId, accId: editing.accId }));
  };

  const changeHandler = (data) => {
    dispatchEditing({ type: "change", payload: data });
  };

  const schema = Joi.object({
    accName: Joi.string().required().label("Account Name"),
    openingBalance: Joi.number().required().label("Opening Balance"),
  });

  const accNames = useSelector(getAccNames);

  const submitHandler = () => {
    //editing.accId
    const data = {
      accName: editing.accName,
      openingBalance: Number(editing.openingBalance),
    };
    const { error } = schema.validate(data);
    if (error) {
      dispatchEditing({
        type: "error",
        payload: { errorMessage: error.details[0].message },
      });
    } else if (
      accNames.includes(data.accName) &&
      data.accName !== accIdNameMap.get(editing.accId)
    ) {
      dispatchEditing({
        type: "error",
        payload: { errorMessage: "The account name alreay exists" },
      });
    } else {
      if (editing.type === "edit") {
        if (
          accNames.includes(data.accName) &&
          data.accName !== accIdNameMap.get(editing.accId)
        ) {
          dispatchEditing({
            type: "error",
            payload: { errorMessage: "The account name alreay exists" },
          });
          return;
        }
        dispatch(
          accModified({
            userId,
            accId: editing.accId,
            accModified: data,
          })
        );
      } else if (editing.type === "add") {
        if (accNames.includes(data.accName)) {
          dispatchEditing({
            type: "error",
            payload: { errorMessage: "The account name alreay exists" },
          });
          return;
        }
        dispatch(
          accAdded({
            userId,
            accAdded: data,
          })
        );
      }
      dispatchEditing({ type: "closeDialog" });
    }
  };

  return (
    <React.Fragment>
      <AccountTable
        accounts={accounts}
        isEditing={editing.isEditing}
        selectedAccId={editing.accId}
        onSelectHandler={selectHandler}
      />
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={() => dispatchEditing({ type: "editOrNot" })}>
          Edit Account
        </Button>
        {editing.isEditing && (
          <Box>
            <Button onClick={editHandler} disabled={editing.accId === null}>
              Change
            </Button>
            <Button
              color="error"
              onClick={deleteHandler}
              disabled={editing.accId === null}
            >
              Delete
            </Button>
            <Button onClick={addHandler}>Add New</Button>
          </Box>
        )}
      </Grid>
      <AccountManageDialog
        open={editing.openDialog}
        type={editing.type}
        onClose={() => dispatchEditing({ type: "closeDialog" })}
        accName={editing.accName}
        openingBalance={editing.openingBalance}
        onSubmitHandler={submitHandler}
        onChangeHandler={changeHandler}
        errorMessage={editing.errorMessage}
      />
    </React.Fragment>
  );
};

export default AccManage;
