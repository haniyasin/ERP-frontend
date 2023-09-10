import React, { useEffect } from "react";
import FinancialSummaryTable from "./FinancialSummaryTable";
import { Box, Button } from "@mui/material";
import {
  MainTitle,
  TableTitle
} from "../../../styles/styled components/StyledTypographies";
import { ToastContainer } from "react-toastify";
import { usePDF } from "react-to-pdf";
import { useHttp } from "../../../hooks/useHttp";
import { useInvoice } from "../../../hooks/contextHooks";
import ProfitChart from "./charts/ProfitChart";
import ExpensesChart from "./charts/ExpensesChart";
import RevenueChart from "./charts/RevenueChart";
import { useReport } from "../../../hooks/useReport";

const FinancialReport = () => {
  const { filters, handleChangeFilters, applyFilters, getInvoices } =
    useInvoice();
  const { post } = useHttp();
  const { startDate, endDate } = useReport();

  useEffect(() => {
    getInvoices();
    if (filters?.startDate === null || filters?.endDate === null)
      handleChangeFilters({ startDate, endDate });
  }, []);

  useEffect(() => {
    if (filters?.startDate || filters?.endDate)
      applyFilters({ startDate, endDate });
  }, [filters]);

  const handleDownloadPDF = async () => {
    const pdfContent = targetRef.current;
    const pdfBlob = new Blob([pdfContent], { type: "application/pdf" });

    const file = new File([pdfBlob], "financial_report.pdf", {
      type: "application/pdf"
    });

    const formData = new FormData();
    formData.append("document", file);
    formData.append("name", "new_report_toPDF");

    post("reports", formData);
    toPDF();
  };

  const { toPDF, targetRef } = usePDF({ filename: "toPDF_report.pdf" });

  return (
    <Box>
      <ToastContainer position="top-center" />
      <Box ref={targetRef}>
        <MainTitle variant="h4" sx={{ marginTop: 20 }}>
          Financial Report
        </MainTitle>
        <TableTitle>
          Period: {startDate?.toLocaleDateString() || ""} -{" "}
          {endDate?.toLocaleDateString() || ""}
        </TableTitle>

        <FinancialSummaryTable />
        <Box display="flex" flexDirection="column" gap={8}>
          <RevenueChart />
          <ExpensesChart />
          <ProfitChart />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" margin={4}>
        <Button variant="contained" onClick={handleDownloadPDF}>
          Download as PDF
        </Button>
      </Box>
    </Box>
  );
};

export default FinancialReport;
