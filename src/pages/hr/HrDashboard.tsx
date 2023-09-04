import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import EmployeeList from "./employees/EmployeeList";
import { usePosition, useUser } from "../../hooks/contextHooks";
import { ToastContainer } from "react-toastify";
import NewEmployeeModal from "./employees/modals/NewEmployeeModal";
import PositionList from "./PositionDashboard/PositionList";
import NewPositionModal from "./PositionDashboard/NewPositionModal";
import {
  MainTitle,
  TableTitle
} from "../../styles/styled components/StyledTypographies";

const HR = () => {
  const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] =
    useState<boolean>(false);
  const [isNewPositionModalOpen, setIsNewPositionModalOpen] =
    useState<boolean>(false);
  const { getEmployees } = useUser();
  const { getPositions } = usePosition();

  useEffect(() => {
    getEmployees();
    getPositions();
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

      <TableTitle variant="h5">Vacant Positions</TableTitle>
      <Box display="flex" justifyContent="center" marginBottom={3}>
        <Button
          onClick={() => setIsNewPositionModalOpen(true)}
          variant="contained"
        >
          New Position
        </Button>
      </Box>
      <PositionList />
      {isNewEmployeeModalOpen && (
        <NewEmployeeModal
          closeNewEmployeeModal={() => setIsNewEmployeeModalOpen(false)}
          isNewEmployeeModalOpen={isNewEmployeeModalOpen}
        />
      )}
      {isNewPositionModalOpen && (
        <NewPositionModal
          closeNewPositionModal={() => setIsNewPositionModalOpen(false)}
          isNewPositionModalOpen={isNewPositionModalOpen}
        />
      )}
    </Container>
  );
};

export default HR;
