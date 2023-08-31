import React, { useCallback } from "react";
import { useFinance } from "../../hooks/contextHooks";
import TableCell from "@mui/material/TableCell/TableCell";

import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

import { Finance, FinanceSummary } from "../../interfaces/Finance";

const FinanceList = () => {
  const { handleFinanceModalOpen, finances } = useFinance();

  const basicFinances = finances.map((finance: Finance) => {
    return {
      id: finance.id,
      client: finance.client,
      amountWithVat: finance.amountWithVat,
      dueDate: finance.dueDate
    };
  });

  const getColumnHeaders = useCallback(() => {
    if (finances.length === 0) return null;

    const finance = basicFinances[0];

    return (
      <>
        <TableCell align="left">Client</TableCell>
        <TableCell align="left">Amount</TableCell>
        <TableCell align="right">Due Date</TableCell>
        <TableCell align="right">Payment Type</TableCell>
      </>
    );
  }, [finances]);

  const getTableCells = useCallback((finance: FinanceSummary) => {
    const { client, amountWithVat, dueDate, paymentType } = finance;
    return (
      <>
        <TableCell>{client}</TableCell>
        <TableCell>{amountWithVat}</TableCell>
        <TableCell align="right">{dueDate}</TableCell>
        <TableCell align="right">{paymentType}</TableCell>
      </>
    );
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>{getColumnHeaders()}</TableRow>
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
