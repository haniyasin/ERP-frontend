import React, { useState } from "react";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useCompany } from "../../hooks/contextHooks";
import BasicInfoAccordion from "./accordions/BasicInfoAccordion";
import { ToastContainer } from "react-toastify";
import DeleteEmployeeModal from "../hr/employees/modals/DeleteEmployeeModal";

const CompanyDashboard = () => {
  const [isDeleteCompanyClicked, setIsDeleteCompanyClicked] =
    useState<boolean>(false);
  const [isEditCompanyClicked, setIsEditCompanyClicked] =
    useState<boolean>(false);

  const { clickedCompany, handleCompanyDashboardClose, getCompanyById } =
    useCompany();

  return (
    <Container sx={{ marginTop: 8 }} className="employee-pic">
      <ToastContainer position="top-center" />
      <DeleteEmployeeModal
        isOpen={isDeleteCompanyClicked}
        closeModal={() => setIsDeleteCompanyClicked(false)}
      />
      <Typography variant="h6" textAlign="center" marginBottom={2}>
        Company information
      </Typography>
      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item container direction="column" lg={12}>
          <Stack direction="row" justifyContent="center" spacing={2} mb={3}>
            <Button onClick={handleCompanyDashboardClose} variant="contained">
              Back
            </Button>
            <Button
              onClick={() => setIsEditCompanyClicked((prev) => !prev)}
              variant="contained"
            >
              Edit
            </Button>
            <Button
              onClick={() => setIsDeleteCompanyClicked(true)}
              variant="contained"
            >
              Delete
            </Button>
          </Stack>
          <BasicInfoAccordion
            isEditCompanyClicked={isEditCompanyClicked}
            handleEditCompanyClose={() => setIsDeleteCompanyClicked(false)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyDashboard;
