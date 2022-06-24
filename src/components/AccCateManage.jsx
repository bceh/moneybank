import Container from "@mui/material/Container";
import PaperContainer from "./PaperContainer";
import Grid from "@mui/material/Grid";
import AccManage from "./AccManage";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../store/statusSlice";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CategoryManage from "./CategoryManage";

const AccCateManage = () => {
  const userId = useSelector(getCurrentUserId);
  const dispatch = useDispatch();

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PaperContainer subTitle="Account">
            <AccManage />
          </PaperContainer>
        </Grid>
        <Grid item xs={12}>
          <PaperContainer subTitle="Category">
            <CategoryManage />
          </PaperContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccCateManage;
