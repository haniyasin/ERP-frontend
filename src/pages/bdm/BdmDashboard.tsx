import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useCompany } from "../../hooks/contextHooks";
import CompanyList from "./CompaniesList";
import { ToastContainer } from "react-toastify";
import NewCompanyModal from "./NewCompanyModal";

const BDM = () => {
  const [isNewCompanyModalOpen, setIsNewCompanyModalOpen] =
    useState<boolean>(false);
  const { getCompanies } = useCompany();

  useEffect(() => {
    getCompanies();
  }, []);
  return (
    <Container>
      <ToastContainer position="top-center" />
      <Typography variant="h4" textAlign="center" margin={5}>
        Business Development Management
      </Typography>
      <Typography variant="h5" textAlign="center" margin={4}>
        Companies
      </Typography>
      <Box display="flex" justifyContent="center" marginBottom={3}>
        <Button
          onClick={() => setIsNewCompanyModalOpen(true)}
          variant="contained"
        >
          New Company
        </Button>
      </Box>
      <CompanyList />
      {isNewCompanyModalOpen && (
        <NewCompanyModal
          closeNewCompanyModal={() => setIsNewCompanyModalOpen(false)}
          isNewCompanyModalOpen={isNewCompanyModalOpen}
        />
      )}
    </Container>
  );
};

export default BDM;
