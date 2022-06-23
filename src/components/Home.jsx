import React, { useState } from "react";
import AccountCard from "./AccountCard";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Orders from "./Orders";
import { useDispatch, useSelector } from "react-redux";

import { getAllAccById, getAccBalancesById } from "../store/dataSlice";
import Radio from "@mui/material/Radio";
import { blueGrey } from "@mui/material/colors";
import CurrentMonth from "./CurrentMonth";

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
        <Grid item xs={12} md={8} lg={9}>
          <CurrentMonth />
        </Grid>
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
                  size="small"
                  sx={{
                    color: blueGrey[200],
                    "&.Mui-checked": { color: blueGrey[400] },
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
