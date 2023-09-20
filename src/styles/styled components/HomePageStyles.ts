import { Container, Typography, Box } from "@mui/material";
import styled from "styled-components";

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

export const SubTitle = styled(Typography)`
  font-size: 14px;
  margin-top: 130px;
  text-align: center;
`;

export const CenteredContent = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const CompanyLogoImg = styled.img`
  width: 300px;
  height: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 60px;
`;
