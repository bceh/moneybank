//Redux
import { amountDisplay } from "../../store/dataSlice";

//mui/material
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const AccountTable = (props) => {
  const { accounts, isEditing, selectedAccId, onSelectHandler } = props;

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {isEditing && <TableCell>Select</TableCell>}
          <TableCell>Account Name</TableCell>
          <TableCell>Opening Balance</TableCell>
          <TableCell>Current Balance</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {accounts.map((acc) => (
          <TableRow key={acc.accId}>
            {isEditing && (
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={String(acc.accId)}
                      checked={selectedAccId === acc.accId}
                      onChange={(e) => onSelectHandler(Number(e.target.value))}
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
