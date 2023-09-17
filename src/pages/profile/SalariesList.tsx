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
import { Salary } from "../../interfaces/Salary";
import { formatDateToLocaleTime } from "../../utils/formatDataToLocaleTime";

interface SalariesListProps {
  user: User;
}

const SalariesList = ({ user }: SalariesListProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>NET</TableCell>
            <TableCell>GROSS</TableCell>
            <TableCell>Document</TableCell>
            <TableCell>Start Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.salaries !== null &&
            user.salaries.map((salary: Salary) => (
              <TableRow key={salary?.id}>
                <TableCell>{salary?.net}</TableCell>
                <TableCell>{salary.gross}</TableCell>
                <TableCell>
                  <FileDisplay
                    fileBuffer={salary.document}
                    fileName={`salary${salary.id}`}
                    fileType={".pdf"}
                  />
                </TableCell>
                <TableCell>
                  {formatDateToLocaleTime(salary.startDate)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SalariesList;
