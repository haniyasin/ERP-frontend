import React, { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { useFinance } from "../../hooks/contextHooks";
import { ToastContainer } from "react-toastify";
import FinanceList from "./FinanceList";
import FinanceModal from "./FinanceModal";
import NewFinanceModal from "./CreateFinanceModal";
import {
  MainTitle,
  TableTitle
} from "../../styles/styled components/StyledTypographies";

const Finance = () => {
  const [isNewFinanceModalOpened, setIsNewFinanceModalOpened] =
    useState<boolean>(false);
  const { clickedFinance, handleFinanceModalClose, getFinances } = useFinance();

  const openNewFinanceModal = () => {
    setIsNewFinanceModalOpened(true);
  };

  const closeNewFinanceModal = () => {
    setIsNewFinanceModalOpened(false);
  };

  useEffect(() => {
    getFinances();
  }, []); // eslint-disable-line

  return (
    <Container>
      <ToastContainer position="top-center" />
      <MainTitle variant="h4">Finance Dashboard</MainTitle>
      <TableTitle variant="h5">Invoices</TableTitle>
      <Box display="flex" justifyContent="center" marginBottom={3}>
        <Button onClick={openNewFinanceModal} variant="contained">
          Add Invoice
        </Button>
        {isNewFinanceModalOpened && (
          <NewFinanceModal
            isNewFinanceModalOpen={isNewFinanceModalOpened}
            closeNewFinanceModal={closeNewFinanceModal}
          />
        )}
      </Box>
      <FinanceList />
      {clickedFinance !== null && (
        <FinanceModal
          isOpen={clickedFinance !== null}
          closeModal={handleFinanceModalClose}
        />
      )}
    </Container>
  );
};

export default Finance;
