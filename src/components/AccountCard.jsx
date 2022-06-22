import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
const AccountCard = (props) => {
  const { accName, accBalance, index, selectedCard } = props;
  const [visibility, setVisibility] = useState(false);
  const visibilityHandler = () => {
    setVisibility((prev) => !prev);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "inherit",
        position: "absolute",
        width: "inherit",
        left: `${100 * index}%`,
        transform: `translateX(-${selectedCard}00%)`,
        transition: "1s",
      }}
    >
      <Typography variant="caption">Account Name</Typography>
      <Typography sx={{ mb: 2 }} variant="h4">
        {accName}
      </Typography>
      <Typography variant="caption">Current Balance</Typography>
      <Typography variant="h5">
        {visibility
          ? accBalance < 0
            ? `-$${Math.abs(accBalance).toFixed(2)}`
            : `$${accBalance.toFixed(2)}`
          : "********"}
        <IconButton onClick={visibilityHandler}>
          {visibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </Typography>
    </Card>
  );
};

export default AccountCard;
