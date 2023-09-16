import React, { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { useCompany } from "../../../hooks/contextHooks";
import CompanyList from "./CompaniesList";
import { ToastContainer } from "react-toastify";
import NewCompanyModal from "./modals/NewCompanyModal";
import {
  MainTitle,
  TableTitle
} from "../../../styles/styled components/StyledTypographies";

const BdmCompanies = () => {
  const [isNewCompanyModalOpen, setIsNewCompanyModalOpen] =
    useState<boolean>(false);
  const { getCompanies } = useCompany();

  useEffect(() => {
    getCompanies();
  }, []);
  
  return (
    <Container>
      <ToastContainer position="top-center" />
      <MainTitle variant="h4">Business Development Management</MainTitle>
      <TableTitle variant="h5">Companies</TableTitle>
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

export default BdmCompanies;
