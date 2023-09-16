import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React from "react";
import { EmployeeDocument, User } from "../../interfaces/User";
import FileDisplay from "../../common/FileDisplay";
import { formatDateToLocaleTime } from "../../utils/formatDataToLocaleTime";

interface EmployeeDocumentListProps {
  user: User;
}

const EmployeeDocumentList = ({ user }: EmployeeDocumentListProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Document</TableCell>
            <TableCell>Date of Upload</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.documents !== null &&
            user?.documents.map((employeeDocument: EmployeeDocument) => (
              <TableRow key={employeeDocument.id}>
                <TableCell>{employeeDocument.id}</TableCell>
                <TableCell>{employeeDocument.name}</TableCell>
                <TableCell>
                  <FileDisplay
                    fileBuffer={employeeDocument.document}
                    fileName={employeeDocument.name || "user_document"}
                    fileType={employeeDocument.documentType}
                  />
                </TableCell>
                <TableCell>
                  {employeeDocument?.dateOfUpload &&
                    formatDateToLocaleTime(employeeDocument?.dateOfUpload)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeDocumentList;
