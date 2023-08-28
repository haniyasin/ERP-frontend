import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React from "react";
import { useUser } from "../../../../hooks/contextHooks";
import { Salary } from "../../../../interfaces/Salary";
import FileDisplay from "../../../../common/FileDisplay";
import { formatDateToLocaleTime } from "../../../../utils/formatDataToLocaleTime";

const SalariesList = () => {
  const { openedEmployee } = useUser();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>NET</TableCell>
            <TableCell>GROSS</TableCell>
            <TableCell>Document</TableCell>
            <TableCell>Start Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {openedEmployee.salaries !== null &&
            openedEmployee.salaries.map((salary: Salary) => (
              <TableRow key={salary?.id}>
                <TableCell>{salary?.id}</TableCell>
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
