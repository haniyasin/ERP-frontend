import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React, { useCallback } from "react";
import { useProject } from "../../../hooks/contextHooks";
import { CenteredTableCell } from "../../../styles/styled components/CenteredTableCell";
import { formatHeaders } from "../../../utils/formatHeaders";
import { User } from "../../../interfaces/User";
import { theme } from "../../../styles/Theme";

const EmployeesList = () => {
  const { openedProject } = useProject();

  const getColumnHeaders = useCallback(() => {
    if (openedProject.users.length === 0) return null;

    const employee = openedProject.users[0];
    const formattedHeaders = formatHeaders(Object.keys(employee));

    return formattedHeaders.map((key) => {
      if (key === "Full Name" || key === "Title" || key === "Is Contractor")
        return <CenteredTableCell key={key}>{key}</CenteredTableCell>;
    });
  }, [openedProject.users]);

  const getTableCells = useCallback((employee: User) => {
    return Object.entries(employee).map(([key, value], index) => {
      if (key === "fullName" || key === "title")
        return <CenteredTableCell key={index}>{value}</CenteredTableCell>;
      if (key === "isContractor")
        return (
          <CenteredTableCell key={index}>
            {value ? "Yes" : "No"}
          </CenteredTableCell>
        );
      else return null;
    });
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ margin: "0 auto", marginBottom: 10, width: "80%" }}
    >
      <Table>
        <TableHead>
          <TableRow
            style={{
              cursor: "pointer",
              backgroundColor: theme.palette.primary.light
            }}
          >
            {getColumnHeaders()}
          </TableRow>
        </TableHead>
        <TableBody>
          {openedProject.users.map((employee: User) => (
            <TableRow key={employee.name}>{getTableCells(employee)}</TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeesList;
