import React, { useState, useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

import TransactionDisplay from "./TransactionDisplay";
import TransactionModifier from "./TransactionModifier";

export default function Transaction(props) {
  const { transId, transType } = props;

  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Box>
      <Paper
        id={transId}
        key={transId}
        sx={{
          p: 1,
          pr: 1.5,
          borderRight: `5px solid ${transType === -1 ? "red" : "green"}`,
          "&:hover": { bgcolor: "#F0F4F6" },
          cursor: "pointer",
        }}
      >
        <Box onClick={handleClick}>
          <TransactionDisplay {...props} />
        </Box>
        {expanded && <TransactionModifier {...props} />}
      </Paper>

      <Divider />
    </Box>
  );
}
