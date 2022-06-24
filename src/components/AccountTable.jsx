import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import { amountDisplay } from "../store/dataSlice";
import { getCurrentUserId } from "../store/statusSlice";
import Checkbox from "@mui/material/Checkbox";

import { useSelector } from "react-redux";
import FormControlLabel from "@mui/material/FormControlLabel";
const AccountTable = (props) => {
  const userId = useSelector(getCurrentUserId);
  const { accounts, editAccount, onSetEditAccount } = props;

  const { isEdit, edittedAccId } = editAccount;

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {isEdit && <TableCell>Select</TableCell>}
          <TableCell>Account Name</TableCell>
          <TableCell>Opening Balance</TableCell>
          <TableCell>Current Balance</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {accounts.map((acc) => (
          <TableRow key={acc.accId}>
            {isEdit && (
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={acc.accId.toString()}
                      checked={edittedAccId === acc.accId}
                      onChange={(e) => onSetEditAccount(+e.target.name)}
                    />
                  }
                />
              </TableCell>
            )}
            <TableCell>{acc.accName}</TableCell>
            <TableCell>
              {amountDisplay(acc.openingBalance, acc.openingBalance)}
            </TableCell>
            <TableCell>
              {amountDisplay(acc.currentBalance, acc.currentBalance)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AccountTable;
