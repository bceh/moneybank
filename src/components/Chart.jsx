import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import Title from "./Title";

// Generate Sales Data
function createData(time, amount) {
  return { time: time, amount: amount };
}

const data = [
  createData("00:00", 0),
  createData("03:00", 300),
  createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Today</Title>

      <VictoryChart width={700} height={220}>
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryLine
          data={data}
          x="time"
          y="amount"
          style={{ width: "600px" }}
        />
      </VictoryChart>
    </React.Fragment>
  );
}
