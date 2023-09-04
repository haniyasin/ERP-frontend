import React, { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { useInvoice } from "../../hooks/contextHooks";
import { ToastContainer } from "react-toastify";
import InvoiceList from "./InvoiceList";
import InvoiceModal from "./modals/InvoiceModal";
import NewInvoiceModal from "./modals/CreateInvoiceModal";
import {
  MainTitle,
  TableTitle
} from "../../styles/styled components/StyledTypographies";

const FIN = () => {
  const [isNewInvoiceModalOpened, setIsNewInvoiceModalOpened] =
    useState<boolean>(false);
  const { clickedInvoice, handleInvoiceModalClose, getInvoices } = useInvoice();

  const openNewInvoiceModal = () => {
    setIsNewInvoiceModalOpened(true);
  };

  const closeNewInvoiceModal = () => {
    setIsNewInvoiceModalOpened(false);
  };

  useEffect(() => {
    getInvoices();
  }, []); // eslint-disable-line

  return (
    <Container>
      <ToastContainer position="top-center" />
      <MainTitle variant="h4">Invoice Dashboard</MainTitle>
      <TableTitle variant="h5">Invoices</TableTitle>
      <Box display="flex" justifyContent="center" marginBottom={3}>
        <Button onClick={openNewInvoiceModal} variant="contained">
          New Invoice
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
