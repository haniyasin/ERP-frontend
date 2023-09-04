import React, { useCallback } from "react";
import { useInvoice } from "../../hooks/contextHooks";

import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

import { Invoice, InvoiceSummary } from "../../interfaces/Invoice";
import { theme } from "../../styles/Theme";
import { CenteredTableCell } from "../../styles/styled components/CenteredTableCell";

const InvoiceList = () => {
  const { handleInvoiceModalOpen, invoices } = useInvoice();

  const getColumnHeaders = useCallback(() => {
    if (invoices.length === 0) return null;

    return (
      <>
        <CenteredTableCell>Client</CenteredTableCell>
        <CenteredTableCell>Amount</CenteredTableCell>
        <CenteredTableCell>Due Date</CenteredTableCell>
        <CenteredTableCell>Payment Type</CenteredTableCell>
      </>
    );
  }, [invoices]);

  const getTableCells = useCallback((invoice: InvoiceSummary) => {
    const { client, amountWithVat, dueDate, paymentType } = invoice;
    return (
      <>
        <CenteredTableCell>{client?.name}</CenteredTableCell>
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
          {invoices.map((invoice: Invoice) => (
            <TableRow
              key={invoice.id}
              hover
              onClick={() => handleInvoiceModalOpen(invoice)}
              style={{ cursor: "pointer" }}
            >
              {getTableCells(invoice)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceList;
