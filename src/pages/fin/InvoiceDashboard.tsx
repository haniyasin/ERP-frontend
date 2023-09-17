import React, { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { useInvoice } from "../../hooks/contextHooks";
import { ToastContainer, toast } from "react-toastify";
import InvoiceList from "./InvoiceList";
import InvoiceModal from "./modals/InvoiceModal";
import NewInvoiceModal from "./modals/CreateInvoiceModal";
import {
  MainTitle,
  TableTitle
} from "../../styles/styled components/StyledTypographies";
import { useNavigate } from "react-router-dom";

const FIN = () => {
  const [isNewInvoiceModalOpened, setIsNewInvoiceModalOpened] =
    useState<boolean>(false);
  const { filters, clickedInvoice, handleInvoiceModalClose, clearFilters } =
    useInvoice();

  const navigate = useNavigate();

  const openNewInvoiceModal = () => {
    setIsNewInvoiceModalOpened(true);
  };

  const closeNewInvoiceModal = () => {
    setIsNewInvoiceModalOpened(false);
  };

  useEffect(() => {
    clearFilters();
  }, []); // eslint-disable-line

  const handleGenerateReport = () => {
    if (filters) navigate("/invoice-report");
    else toast.error("Please select dates for report");
  };

  return (
    <Container>
      <ToastContainer position="top-center" />
      <MainTitle variant="h4">Invoice Dashboard</MainTitle>
      <TableTitle variant="h5">Invoices</TableTitle>
      <Box display="flex" justifyContent="center" marginBottom={3} gap={2}>
        <Button onClick={openNewInvoiceModal} variant="contained">
          New Invoice
        </Button>
        <Button
          onClick={handleGenerateReport}
          sx={{ alignSelf: "center" }}
          variant="contained"
        >
          Generate Report
        </Button>

        {isNewInvoiceModalOpened && (
          <NewInvoiceModal
            isNewInvoiceModalOpen={isNewInvoiceModalOpened}
            closeNewInvoiceModal={closeNewInvoiceModal}
          />
        )}
      </Box>
      <InvoiceList />

      {clickedInvoice !== null && (
        <InvoiceModal
          isOpen={clickedInvoice !== null}
          closeModal={handleInvoiceModalClose}
        />
      )}
    </Container>
  );
};

export default FIN;
