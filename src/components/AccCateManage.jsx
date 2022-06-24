import Container from "@mui/material/Container";
import PaperContainer from "./PaperContainer";
import Grid from "@mui/material/Grid";
import AccManage from "./AccManage";
import React, { useState } from "react";
import {
  accAdded,
  accModified,
  accDeleted,
  getAccsWithBalance,
} from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../store/statusSlice";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const AccCateManage = () => {
  const userId = useSelector(getCurrentUserId);

  const dispatch = useDispatch();
  const handleAddAccount = () => {
    dispatch(
      accAdded({
        userId,
        accAdded: { accName: "comm2", openingBalance: 10000 },
      })
    );
  };

  const handleModifyAccount = () => {
    dispatch(
      accModified({
        userId,
        accId: 0,
        accModified: { accName: "comm_", openingBalance: 1000 },
      })
    );
  };

  const handleDeleteAccount = (accId) => {
    dispatch(
      accDeleted({
        userId,
        accId,
      })
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PaperContainer subTitle="Account">
            <AccManage />
          </PaperContainer>
        </Grid>
        <Grid item xs={12}>
          <PaperContainer subTitle="Category"></PaperContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccCateManage;
