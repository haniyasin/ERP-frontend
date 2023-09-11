import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { MainTitle } from "../styles/styled components/StyledTypographies";
import styled from "styled-components";
import companyLogo from "../assets/logo.png";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const SubTitle = styled(Typography)`
  font-size: 14px;
  margin-top: 130px;
  text-align: center;
`;

const CenteredContent = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const CompanyLogoImg = styled.img`
  width: 300px;
  height: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 60px;
`;

const Home = () => {
  return (
    <StyledContainer>
      <MainTitle variant="h4" textAlign="center">
        Welcome to Deafor's ERP System
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
