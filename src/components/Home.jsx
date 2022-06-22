import React, { useState } from "react";
import AccountCard from "./AccountCard";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";

import { getAllAccById, getAccBalancesById } from "../store/dataSlice";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import { blueGrey } from "@mui/material/colors";

export default function Home() {
  const userId = useSelector((state) => state.status.currentUserId);
  const accounts = useSelector(getAllAccById(userId));

  const accBalance = useSelector(getAccBalancesById(userId));

  const [selectedCard, setSelectedCard] = useState(0);
  const selectedCardHandler = (e) => {
    setSelectedCard(e.target.value);
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 0,
              position: "relative",
              height: 240,
              width: "100%",
              overflow: "hidden",
            }}
          >
            {accounts.map((acc, index) => (
              <AccountCard
                key={acc.accId}
                index={index}
                accName={acc.accName}
                accBalance={accBalance[acc.accId] || 0}
                selectedCard={selectedCard}
              />
            ))}
            <Box
              sx={{
                position: "absolute",
                bottom: "0",
                width: "100%",
              }}
            >
              {accounts.map((acc, index) => (
                <Radio
                  key={index}
                  value={index}
                  checked={selectedCard == index}
                  onChange={selectedCardHandler}
                  size="xs"
                  sx={{
                    color: blueGrey[200],
                    "&.Mui-checked": { color: blueGrey[400] },
                  }}
                />
              ))}
            </Box>
            {/* <Deposits /> */}
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
