import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody
} from "@mui/material";
import { theme } from "../../../styles/Theme";
import { CenteredTableCell } from "../../../styles/styled components/CenteredTableCell";
import { useReport } from "../../../hooks/useReport";

const FinancialSummaryTable = () => {
  const { startDate, endDate, totalRevenue, totalExpenses, totalProfit } =
    useReport();

  return (
    <TableContainer
      component={Paper}
      sx={{ margin: "0 auto", marginBottom: 10, width: 600 }}
    >
      <Table>
        <TableHead>
          <TableRow
            style={{
              cursor: "pointer",
              backgroundColor: theme.palette.primary.light
            }}
          >
            <CenteredTableCell>Start Date</CenteredTableCell>
            <CenteredTableCell>End Date</CenteredTableCell>
            <CenteredTableCell>Total Revenue</CenteredTableCell>
            <CenteredTableCell>Total Expenses</CenteredTableCell>
            <CenteredTableCell>Total Profit</CenteredTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover style={{ cursor: "pointer" }}>
            <CenteredTableCell>
              {startDate?.toLocaleDateString() || ""}
            </CenteredTableCell>
            <CenteredTableCell>
              {endDate?.toLocaleDateString() || ""}
            </CenteredTableCell>
            <CenteredTableCell>{totalRevenue}</CenteredTableCell>
            <CenteredTableCell>{totalExpenses}</CenteredTableCell>
            <CenteredTableCell>{totalProfit}</CenteredTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FinancialSummaryTable;
