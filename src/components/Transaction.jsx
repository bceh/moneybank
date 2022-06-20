import React, { useState, useEffect, useRef } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import TransactionDisplay from "./TransactionDisplay";
import TransactionModifier from "./TransactionModifier";

export default function Transaction(props) {
  const { transId } = props;

  const [expanded, setExpanded] = useState(false);
  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Box>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        id={transId}
        key={transId}
        sx={{ "&:hover": { bgcolor: "#F0F4F6" } }}
      >
        <AccordionSummary>
          <TransactionDisplay {...props} />
        </AccordionSummary>
        <AccordionDetails>
          <TransactionModifier {...props} />
        </AccordionDetails>
      </Accordion>

      <Divider />
    </Box>
  );
}
