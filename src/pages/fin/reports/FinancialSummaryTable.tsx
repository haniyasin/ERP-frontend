import React, { useEffect } from "react";
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
import { useInvoice } from "../../../hooks/contextHooks";

const FinancialSummaryTable = () => {
  const { startDate, endDate, totalRevenue, totalExpenses, totalProfit } =
    useReport();

  const { applyFilters } = useInvoice();

  useEffect(() => {
    applyFilters(startDate, endDate);
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ margin: "0 auto", marginBottom: 10, width: 600 }}
    >
      <Table>
        <TableHead>
          <TableRow
            style={{
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
          <TableRow>
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
