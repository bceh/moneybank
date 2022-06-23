import Chart from "./MonthlyChart";
import Paper from "@mui/material/Paper";
import Title from "./Title";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";

const CurrentMonth = () => {
  const navigate = useNavigate();
  const currentMonth = dayjs().month();
  const clickHandler = (event) => {
    event.preventDefault();
    navigate("/reports");
  };
  return (
    <Paper
      sx={{
        position: "relative",
        height: 240,
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
        Transactions in This Month
      </Title>
      <Chart
        month={currentMonth}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />

      <Link
        color="primary"
        onClick={clickHandler}
        sx={{
          position: "absolute",
          bottom: "0.5rem",
          left: 0,
          width: "100%",
          textAlign: "center",
          cursor: "pointer",
          zIndex: 100,
        }}
      >
        See more reports
      </Link>
    </Paper>
  );
};

export default CurrentMonth;
