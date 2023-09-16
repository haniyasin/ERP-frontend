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
import { Leave } from "../../interfaces/Leave";
import { formatDateToLocaleTime } from "../../utils/formatDataToLocaleTime";

interface LeavesListProps {
  user: User;
}

const LeavesList = ({ user }: LeavesListProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Document</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.leaves !== null &&
            user.leaves.map((leave: Leave) => (
              <TableRow key={leave.id}>
                <TableCell>{leave.id}</TableCell>
                <TableCell>{leave.type}</TableCell>
                <TableCell>
                  <FileDisplay
                    fileBuffer={leave.document}
                    fileName={`leave${leave.id}`}
                    fileType={".pdf"}
                  />
                </TableCell>
                <TableCell>{formatDateToLocaleTime(leave.startDate)}</TableCell>
                <TableCell>{formatDateToLocaleTime(leave.endDate)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeavesList;
