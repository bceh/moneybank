import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { getAccIdNameMap, getCateIdNameMap } from "../store/dataSlice";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ShortTextIcon from "@mui/icons-material/ShortText";

const TransactionDisplay = (props) => {
  const {
    accId,
    amount,
    cateId,
    description,
    payee,
    date,
    time,
    transId,
    transType,
  } = props;
  const accIdNameMap = useSelector(getAccIdNameMap);
  const cateIdNameMap = useSelector(getCateIdNameMap);
  const accName = accIdNameMap.get(accId);
  const cateName = cateIdNameMap.get(cateId);

  return (
    <Grid container>
      <Grid item xs={8} sm={5}>
        <Grid container sx={{ flexDirection: "column" }}>
          <Grid item sx={{ textAlign: "left" }}>
            <Typography>{payee}</Typography>
          </Grid>
          <Grid item sx={{ textAlign: "left" }}>
            <Typography sx={{ color: "#666" }} component="span">
              {dayjs(date).format("MMM DD, YYYY")}&nbsp;at&nbsp;{time}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} sm={5} sx={{ opacity: { xs: 0, sm: 1 } }}>
        <Box sx={{ display: "flex" }}>
          <Chip
            icon={<AccountBalanceIcon />}
            label={accName}
            size="small"
            sx={{ mr: 1 }}
          />
          <Chip icon={<FolderOpenIcon />} label={cateName} size="small" />
        </Box>
        <Box sx={{ display: "flex" }}>
          <ShortTextIcon />
          <Typography
            component="span"
            sx={{
              maxWidth: "10rem",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {description}
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={3}
        sm={2}
        sx={{
          textAlign: "right",
          color: Number(transType) === -1 ? "red" : "green",
        }}
      >
        <Typography variant="p">
          {Number(transType) === -1 ? "Expense" : "Income"}
        </Typography>
        <Typography variant="h5">{Number(amount).toFixed(2)}</Typography>
      </Grid>
    </Grid>
  );
};

export default TransactionDisplay;
