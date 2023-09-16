import React, { useEffect } from "react";
import FinancialSummaryTable from "./FinancialSummaryTable";
import { Box, Button } from "@mui/material";
import {
  MainTitle,
  TableTitle
} from "../../../styles/styled components/StyledTypographies";
import { ToastContainer, toast } from "react-toastify";
import { usePDF } from "react-to-pdf";
import { useHttp } from "../../../hooks/useHttp";
import ProfitChart from "./charts/ProfitChart";
import ExpensesChart from "./charts/ExpensesChart";
import RevenueChart from "./charts/RevenueChart";
import { useReport } from "../../../hooks/useReport";
import { useInvoice } from "../../../hooks/contextHooks";

const FinancialReport = () => {
  const { post } = useHttp();
  const { startDate, endDate } = useReport();
  const { applyFilters } = useInvoice();

  const formattedStartDate =
    startDate instanceof Date ? startDate.toLocaleDateString("en-GB") : "";
  const formattedEndDate =
    endDate instanceof Date ? endDate.toLocaleDateString("en-GB") : "";

  const handleDownloadPDF = async () => {
    const pdfContent = targetRef.current;
    const pdfBlob = new Blob([pdfContent], { type: "application/pdf" });

    const file = new File(
      [pdfBlob],
      `Report: ${formattedStartDate}-${formattedEndDate}.pdf`,
      {
        type: "application/pdf"
      }
    );

    const formData = new FormData();
    formData.append("document", file);
    formData.append(
      "name",
      `Report: ${formattedStartDate}-${formattedEndDate}.pdf`
    );

    post("reports", formData).then((res) => {
      if (res) toast.success("Report saved successfully");
    });
    toPDF();
  };

  const { toPDF, targetRef } = usePDF({
    filename: `Report: ${formattedStartDate}-${formattedEndDate}.pdf`
  });

  useEffect(() => {
    if (startDate !== "" && endDate !== "") {
      applyFilters(startDate, endDate);
    }
  }, [startDate, endDate]);

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
          Save & Download as PDF
        </Button>
      </Box>
    </Box>
  );
};

export default FinancialReport;
