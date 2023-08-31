import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import EmployeeList from "./employees/EmployeeList";
import { useUser } from "../../hooks/contextHooks";
import { ToastContainer } from "react-toastify";
import NewEmployeeModal from "./employees/modals/NewEmployeeModal";
import PositionList from "./PositionDashboard/PositionList";

const HR = () => {
  const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] =
    useState<boolean>(false);
  const { getEmployees } = useUser();

  useEffect(() => {
    getEmployees();
  }, []); // eslint-disable-line

  return (
    <Container>
      <ToastContainer position="top-center" />
      <Typography variant="h4" textAlign="center" margin={5}>
        Human Resources
      </Typography>
      <Typography variant="h5" textAlign="center" margin={4}>
        Employees
      </Typography>
      <Box display="flex" justifyContent="center" marginBottom={3}>
        <Button
          onClick={() => setIsNewEmployeeModalOpen(true)}
          variant="contained"
        >
          New Employee
        </Button>
      </Box>
      <EmployeeList />

      <Typography variant="h5" textAlign="center" margin={4}>
        Positions
      </Typography>
      <Box display="flex" justifyContent="center" marginBottom={3}>
        <Button
          onClick={() => setIsNewEmployeeModalOpen(true)}
          variant="contained"
        >
          New Employee
        </Button>
      </Box>
      <PositionList />
      {isNewEmployeeModalOpen && (
        <NewEmployeeModal
          closeNewEmployeeModal={() => setIsNewEmployeeModalOpen(false)}
          isNewEmployeeModalOpen={isNewEmployeeModalOpen}
        />
      )}
    </Container>
  );
};

export default HR;
