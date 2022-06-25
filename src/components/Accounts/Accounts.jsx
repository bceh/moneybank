//Components
import Transaction from "./Transaction";
import TransactionFilter from "./TransactionFilter";
import TransactionModifier from "./TransactionModifier";
import AccountDial from "./AccountDial";
//Redux
import { getAllAcc, getAllTrans } from "../../store/dataSlice";
import { useSelector } from "react-redux";
//Libraries
import _ from "lodash";
import React, { useState } from "react";
//mui/material
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Badge from "@mui/material/Badge";

const Accounts = () => {
  const accounts = useSelector(getAllAcc);
  const transactions = useSelector(getAllTrans);

  const [transFilter, setTransFilter] = useState([-1, 1]);

  const accIds = accounts.map((acc) => acc.accId);
  const [accFilter, setAccFilter] = useState(accIds);
  const handleFilter = ({ transTypes, accIds }) => {
    setTransFilter(transTypes);
    setAccFilter(accIds);
  };

  const transactionsFiltered = transactions.filter(
    (trans) =>
      transFilter.includes(trans.transType) && accFilter.includes(trans.accId)
  );

  const [sort, setSort] = useState({ type: "date", order: "desc" });

  const transactionsSorted = _.orderBy(
    transactionsFiltered,
    sort.type,
    sort.order
  );

  const transactionsDisplayed = transactionsSorted;

  const [openModified, setOpenModified] = useState(false);

  const [transModifiedData, setTransModifiedData] = useState({});

  const handleCloseModified = () => {
    setOpenModified(false);
    setTransModifiedData({});
  };

  const handleTransClick = (transId) => {
    const trans = transactions.find((trans) => trans.transId === transId);
    setTransModifiedData(trans);
    setOpenModified(true);
  };

  const getBateBadge = () => {
    if (sort.type === "date") {
      if (sort.order === "desc") {
        return <ArrowDropDownIcon />;
      } else if (sort.order === "asc") {
        return <ArrowDropUpIcon />;
      }
    }
    return "";
  };

  const getAmountBadge = () => {
    if (sort.type === "amount") {
      if (sort.order === "desc") {
        return <ArrowDropDownIcon />;
      } else if (sort.order === "asc") {
        return <ArrowDropUpIcon />;
      }
    }
    return "";
  };
  const handleSortButton = (type) => {
    if (type !== sort.type) {
      setSort({ type, order: "desc" });
    } else {
      setSort((prev) => {
        return {
          type: prev.type,
          order: prev.order === "asc" ? "desc" : "asc",
        };
      });
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <TransactionFilter accounts={accounts} onFilter={handleFilter} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button sx={{ ml: 2 }} onClick={() => handleSortButton("date")}>
            <Badge badgeContent={getBateBadge()}>Date</Badge>
          </Button>
          <Button sx={{ mr: 2 }} onClick={() => handleSortButton("amount")}>
            <Badge badgeContent={getAmountBadge()}>Amount</Badge>
          </Button>
        </Box>
        <Container>
          {transactionsDisplayed.map((trans) => {
            return (
              <Transaction
                key={trans.transId}
                {...trans}
                onClick={handleTransClick}
              />
            );
          })}
        </Container>
      </Container>
      <AccountDial />
      <TransactionModifier
        open={openModified}
        onClose={handleCloseModified}
        data={transModifiedData}
        setData={setTransModifiedData}
      />
    </React.Fragment>
  );
};

export default Accounts;
