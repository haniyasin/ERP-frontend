import React, { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import EmployeeList from "./EmployeeList";
import { useUser } from "../../../hooks/contextHooks";
import { ToastContainer } from "react-toastify";
import NewEmployeeModal from "./modals/NewEmployeeModal";
import {
  MainTitle,
  TableTitle
} from "../../../styles/styled components/StyledTypographies";

const HrEmployee = () => {
  const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] =
    useState<boolean>(false);
  const { getEmployees } = useUser();

  useEffect(() => {
    getEmployees();
  }, []); // eslint-disable-line

  return (
    <Container>
      <ToastContainer position="top-center" />
      <MainTitle variant="h4">Human Resources</MainTitle>
      <TableTitle variant="h5">Employees</TableTitle>
      <Box display="flex" justifyContent="center" marginBottom={3}>
        <Button
          onClick={() => setIsNewEmployeeModalOpen(true)}
          variant="contained"
        >
          New Employee
        </Button>
      </Box>
      <EmployeeList />
      {isNewEmployeeModalOpen && (
        <NewEmployeeModal
          closeNewEmployeeModal={() => setIsNewEmployeeModalOpen(false)}
          isNewEmployeeModalOpen={isNewEmployeeModalOpen}
        />
      )}
    </Container>
  );
};

export default HrEmployee;
