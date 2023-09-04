import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useCompany } from "../../hooks/contextHooks";
import BasicInfoAccordion from "./accordions/BasicInfoAccordion";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../common/LoadingComponent";
import { handleNotFound } from "../../routes/ErrorHandler";
import DeleteCompanyModal from "./modals/DeleteCompanyModal";
import VacantPositionsAccordion from "./accordions/vacant-positions/VacantPositionsAccordion";

const CompanyDashboard = () => {
  const [companyExists, setCompanyExists] = useState<boolean>(true);
  const [isDeleteCompanyClicked, setIsDeleteCompanyClicked] =
    useState<boolean>(false);
  const { companyId } = useParams();

  const { clickedCompany, handleCompanyDashboardClose, getCompanyById } =
    useCompany();

  useEffect(() => {
    getCompanyById(companyId).then((res: any) => {
      if (res?.data) {
        setCompanyExists(false);
      }
    });
  }, []);

  if (!companyExists) return handleNotFound();

  if (!clickedCompany) return <LoadingComponent />;

  return (
    <Container sx={{ marginTop: 8 }} className="employee-pic">
      <ToastContainer position="top-center" />
      <DeleteCompanyModal
        isOpen={isDeleteCompanyClicked}
        closeModal={() => setIsDeleteCompanyClicked(false)}
      />
      <Typography variant="h4" textAlign="center" marginBottom={3}>
        Company information
      </Typography>
      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item container direction="column" lg={12}>
          <Stack direction="row" justifyContent="center" spacing={2} mb={3}>
            <Button onClick={handleCompanyDashboardClose} variant="contained">
              Back
            </Button>
            <Button
              onClick={() => setIsDeleteCompanyClicked(true)}
              variant="contained"
            >
              Delete
            </Button>
          </Stack>
          <BasicInfoAccordion />
          <VacantPositionsAccordion />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyDashboard;
