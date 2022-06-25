//Components
import TransactionAdd from "./TransactionAdd";
//Libraries
import React, { useState } from "react";
//mui/material
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PaidIcon from "@mui/icons-material/Paid";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const AccountDial = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [transType, setTransType] = useState(-1);
  const [openTrans, setOpenTrans] = useState(false);
  const handleCloseTrans = () => {
    setOpenTrans(false);
    handleClose();
  };

  const handleOpenTrans = (type) => {
    setTransType(type);
    setOpenTrans(true);
    handleClose();
  };

  const handleTransType = (type) => {
    if (type !== null) {
      setTransType(type);
    }
  };

  return (
    <React.Fragment>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction
          icon={<PaidIcon />}
          tooltipTitle={"Expense"}
          tooltipOpen
          onClick={() => handleOpenTrans(-1)}
        />
        <SpeedDialAction
          icon={<AccountBalanceWalletIcon />}
          tooltipTitle={"Income"}
          tooltipOpen
          onClick={() => handleOpenTrans(1)}
        />
      </SpeedDial>
      <TransactionAdd
        open={openTrans}
        onClose={handleCloseTrans}
        transType={transType}
        onSetTransType={handleTransType}
      />
    </React.Fragment>
  );
};

export default AccountDial;
