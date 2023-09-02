import React, { useCallback } from "react";
import { useFinance } from "../../hooks/contextHooks";

import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

import { Finance, FinanceSummary } from "../../interfaces/Finance";
import { theme } from "../../styles/Theme";
import { CenteredTableCell } from "../../styles/styled components/CenteredTableCell";

const FinanceList = () => {
  const { handleFinanceModalOpen, finances } = useFinance();

  const getColumnHeaders = useCallback(() => {
    if (finances.length === 0) return null;

    return (
      <>
        <CenteredTableCell>Client</CenteredTableCell>
        <CenteredTableCell>Amount</CenteredTableCell>
        <CenteredTableCell>Due Date</CenteredTableCell>
        <CenteredTableCell>Payment Type</CenteredTableCell>
      </>
    );
  }, [finances]);

  const getTableCells = useCallback((finance: FinanceSummary) => {
    const { client, amountWithVat, dueDate, paymentType } = finance;
    return (
      <>
        <CenteredTableCell>{client}</CenteredTableCell>
        <CenteredTableCell>{amountWithVat}</CenteredTableCell>
        <CenteredTableCell>{dueDate}</CenteredTableCell>
        <CenteredTableCell>{paymentType}</CenteredTableCell>
      </>
    );
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
          {finances.map((finance: Finance) => (
            <TableRow
              key={finance.id}
              hover
              onClick={() => handleFinanceModalOpen(finance)}
              style={{ cursor: "pointer" }}
            >
              {getTableCells(finance)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FinanceList;
