import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React from "react";
import { useUser } from "../../../../../hooks/contextHooks";
import { Bonus } from "../../../../../interfaces/Bonus";
import { formatDateToLocaleTime } from "../../../../../utils/formatDataToLocaleTime";
import FileDisplay from "../../../../../common/FileDisplay";

const BonusesList = () => {
  const { openedEmployee } = useUser();

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
          {openedEmployee.bonuses !== null &&
            openedEmployee.bonuses.map((bonus: Bonus) => (
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
