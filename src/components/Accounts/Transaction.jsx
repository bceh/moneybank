//Components
import TransactionDisplay from "./TransactionDisplay";
//Libraries
import React from "react";
//mui/material
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

export default function Transaction(props) {
  const { transId, transType, onClick } = props;

  const handleClick = (transId) => {
    onClick(transId);
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
        <Box onClick={() => handleClick(transId)}>
          <TransactionDisplay {...props} />
        </Box>
      </Paper>
      <Divider />
    </Box>
  );
}
