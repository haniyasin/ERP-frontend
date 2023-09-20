import React from "react";
import { Box } from "@mui/material";
import { MainTitle } from "../styles/styled components/StyledTypographies";
import companyLogo from "../assets/logo.png";
import { ToastContainer } from "react-toastify";
import {
  StyledContainer,
  CenteredContent,
  CompanyLogoImg,
  SubTitle
} from "../styles/styled components/HomePageStyles";

const Home = () => {
  return (
    <StyledContainer>
      <ToastContainer position="top-center" />
      <MainTitle variant="h4" textAlign="center">
        Welcome to Deafor`s ERP System
      </MainTitle>
      <CenteredContent>
        <CompanyLogoImg src={companyLogo} alt="Company Logo" />
      </CenteredContent>
      <Box marginTop={2}>
        <SubTitle>
          Explore our powerful tools and features to streamline your business
          operations.
        </SubTitle>
        <SubTitle>You have a question or require other assistance?</SubTitle>
        <SubTitle>Contact your Administrator.</SubTitle>
      </Box>
    </StyledContainer>
  );
};

export default Home;
