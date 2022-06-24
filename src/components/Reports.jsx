import CategoryGraph from "./categoryGraph";
import MonthlyChart from "./MonthlyChart";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "./Title";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import ArrowCircleLeft from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRight from "@mui/icons-material/ArrowCircleRight";
import Box from "@mui/material/Box";
import { indigo } from "@mui/material/colors";
import { useState } from "react";
import TextField from "@mui/material/TextField";

const Reports = () => {
  const [monthField, setMonthField] = useState(dayjs().format("YYYY-MM"));

  const month = dayjs(monthField).month();

  const changeHandler = (type) => {
    if (type === "add") {
      setMonthField((prev) => dayjs(prev).add(1, "M").format("YYYY-MM"));
    } else if ((type = "sub")) {
      setMonthField((prev) => dayjs(prev).subtract(1, "M").format("YYYY-MM"));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 90,
            }}
          >
            <Title>Monthly Report</Title>
            <Box>
              <IconButton
                onClick={() => changeHandler("sub")}
                sx={{ color: indigo[400] }}
              >
                <ArrowCircleLeft />
              </IconButton>
              <TextField
                InputLabelProps={{ shrink: true }}
                name="month"
                type="month"
                variant="standard"
                value={monthField}
                onChange={(e) => setMonthField(e.currentTarget.value)}
              />
              <IconButton
                onClick={() => changeHandler("add")}
                sx={{ color: indigo[400] }}
              >
                <ArrowCircleRight />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper
            sx={{
              position: "relative",
              height: 250,
            }}
          >
            <Title
              sx={{
                position: "absolute",
                top: "1rem",
                textAlign: "center",
                width: "100%",
              }}
            >
              Daily Transactions
            </Title>
            <MonthlyChart month={month} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              position: "relative",
              height: 250,
            }}
          >
            <Title
              sx={{
                position: "absolute",
                top: "1rem",
                textAlign: "center",
                width: "100%",
              }}
            >
              Expense Categories
            </Title>
            <CategoryGraph month={month} transType={-1} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              position: "relative",
              height: 250,
            }}
          >
            <Title
              sx={{
                position: "absolute",
                top: "1rem",
                textAlign: "center",
                width: "100%",
              }}
            >
              Income Categories
            </Title>
            <CategoryGraph month={month} transType={1} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports;
