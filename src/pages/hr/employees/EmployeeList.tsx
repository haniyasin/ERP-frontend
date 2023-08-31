import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React, { useCallback } from "react";
import { useUser } from "../../../hooks/contextHooks";
import { User } from "../../../interfaces/User";
import { theme } from "../../../styles/Theme";
import StyledProfilePicture from "../../../styles/styled components/StyledProfilePicture";
import { extractProfilePicture } from "../../../utils/extractProfilePicture";
import { formatDateToLocaleTime } from "../../../utils/formatDataToLocaleTime";
import { formatHeaders } from "../../../utils/formatHeaders";
import joinArrayItemNames from "../../../utils/joinArrayItemNames";

const EmployeeList = () => {
  const { employees, handleEmployeeDashboardOpen } = useUser();

  const getColumnHeaders = useCallback(() => {
    if (employees.length === 0) return null;

    const user = employees[0];

    const userOrder = {
      picture: {}
    };
    const orderedUser = Object.assign(userOrder, user);

    const formattedHeaders = formatHeaders(Object.keys(orderedUser));

    const displayHeaders = [
      "Picture",
      "Full Name",
      "Is Contractor",
      "Starting Date",
      "Departments",
      "Has Left"
    ];

    return formattedHeaders.map((key) => {
      if (displayHeaders.includes(key)) {
        return (
          <TableCell key={key} align="center">
            {key}
          </TableCell>
        );
      }
      return null;
    });
  }, [employees]);

  const getTableCells = useCallback((user: User) => {
    const userOrder = {
      picture: {}
    };
    const orderedUser = Object.assign(userOrder, user);
    const displayProperties = [
      "picture",
      "fullName",
      "isContractor",
      "startingDate",
      "departments",
      "hasLeft"
    ];

    return Object.entries(orderedUser).map(([key, value], index) => {
      if (displayProperties.includes(key)) {
        if (key === "startingDate") {
          return (
            <TableCell key={index} align="center">
              {formatDateToLocaleTime(value)}
            </TableCell>
          );
        }
        if (key === "picture" && typeof value === "object") {
          const imgSrc = extractProfilePicture(value?.data);
          return (
            <TableCell key={index} align="center">
              <StyledProfilePicture
                src={imgSrc || ""}
                width="40px"
                height="40px"
                margin="0 auto"
              />
            </TableCell>
          );
        }
        if (typeof value === "boolean") {
          return (
            <TableCell key={index} align="center">
              {value ? "Yes" : "No"}
            </TableCell>
          );
        } else if (Array.isArray(value)) {
          const joinedDepartments = joinArrayItemNames(value, "name");
          return (
            <TableCell key={index} align="center">
              {joinedDepartments}
            </TableCell>
          );
        } else {
          return (
            <TableCell key={index} align="center">
              {value}
            </TableCell>
          );
        }
      }
      return null;
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
          {employees.map((employee: User) => (
            <TableRow
              key={employee.email}
              hover
              onClick={() => handleEmployeeDashboardOpen(employee)}
              style={{ cursor: "pointer" }}
            >
              {getTableCells(employee)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeList;
