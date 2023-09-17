import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { User } from "../../interfaces/User";
import FileDisplay from "../../common/FileDisplay";
import { Bonus } from "../../interfaces/Bonus";
import { formatDateToLocaleTime } from "../../utils/formatDataToLocaleTime";

interface BonusesListProps {
  user: User;
}

const BonusesList = ({ user }: BonusesListProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Document</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.bonuses !== null &&
            user.bonuses.map((bonus: Bonus) => (
              <TableRow key={bonus.id}>
                <TableCell>{bonus.type}</TableCell>
                <TableCell>{bonus.amount}</TableCell>
                {bonus?.document && (
                  <TableCell>
                    <FileDisplay
                      fileBuffer={bonus?.document}
                      fileName={`bonus${bonus.id}`}
                      fileType={".pdf"}
                    />
                  </TableCell>
                )}
                <TableCell>{formatDateToLocaleTime(bonus.date)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BonusesList;
