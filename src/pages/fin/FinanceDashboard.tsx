import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useFinance } from "../../hooks/contextHooks";
import NewUserModal from "../admin/NewUserModal";
import { ToastContainer } from "react-toastify";
import EmployeeList from "../hr/employees/EmployeeList";
import FinanceList from "./FinanceList";
import FinanceModal from "./FinanceModal";
import NewFinanceModal from "./CreateFinanceModal";

const Finance = () => {
  //const [isNewFinanceModalOpened, setIsNewFinanceModalOpened] = useState<boolean>(false);
  const { clickedFinance, handleFinanceModalClose, getFinances } = useFinance();
  const [isNewFinanceModalOpened, setIsNewFinanceModalOpened] =
    useState<boolean>(false);

  const [isNewFinModalOpen, setNewFinModalOpen] = useState(false);

  const openNewFinanceModal = () => {
    setNewFinModalOpen(true);
  };

  const closeNewFinanceModal = () => {
    setNewFinModalOpen(false);
  };

  useEffect(() => {
    getFinances();
  }, []); // eslint-disable-line

  return (
    <Container>
      <ToastContainer position="top-center" />
      <Typography variant="h4" textAlign="center" margin={5}>
        Finance Dashboard
      </Typography>
      <Typography variant="h5" textAlign="center" margin={4}>
        Invoices
      </Typography>
      <Box display="flex" justifyContent="center" marginBottom={3}>
        <Button onClick={openNewFinanceModal} variant="contained">
          Add Invoice
        </Button>
        {isNewFinModalOpen && (
          <NewFinanceModal
            isNewFinanceModalOpen={isNewFinModalOpen}
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
