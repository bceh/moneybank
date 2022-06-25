//Components
import Title from "../../utils/Title";
//Redux
import {
  getAllTrans,
  getCateIdNameMap,
  getAccIdNameMap,
  amountDisplay,
} from "../../store/dataSlice";
import { useSelector } from "react-redux";
//Libraries
import React from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
//mui/material
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function RecentTransactions() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.status.currentUserId);
  const transactions = useSelector(getAllTrans);
  const accIdNameMap = useSelector(getAccIdNameMap);
  const cateIdNameMap = useSelector(getCateIdNameMap);

  const transactionsSorted = _.orderBy(transactions, "date", "desc").slice(
    0,
    5
  );

  const clickHandler = (event) => {
    event.preventDefault();
    navigate("/accounts");
  };

  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      <Box sx={{ width: "100%", overflow: "scroll" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Payee</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionsSorted.map((trans) => (
              <TableRow key={trans.transId}>
                <TableCell>{trans.date}</TableCell>
                <TableCell>{trans.payee}</TableCell>
                <TableCell>{accIdNameMap.get(trans.accId)}</TableCell>
                <TableCell>{cateIdNameMap.get(trans.cateId)}</TableCell>
                <TableCell align="right">
                  {amountDisplay(trans.transType, trans.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Link
        color="primary"
        onClick={clickHandler}
        sx={{ mt: 2, cursor: "pointer" }}
      >
        See more transactions
      </Link>
    </React.Fragment>
  );
}
