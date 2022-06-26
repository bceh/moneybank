//Libraries
import React, { useState } from "react";
//mui/material
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PaidIcon from "@mui/icons-material/Paid";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const AccountDial = (props) => {
  const { onAddDialogHandler } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          onClick={() => onAddDialogHandler(-1)}
        />
        <SpeedDialAction
          icon={<AccountBalanceWalletIcon />}
          tooltipTitle={"Income"}
          tooltipOpen
          onClick={() => onAddDialogHandler(1)}
        />
      </SpeedDial>
    </React.Fragment>
  );
};

export default AccountDial;
