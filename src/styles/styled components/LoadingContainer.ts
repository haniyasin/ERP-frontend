import { Container } from "@mui/material";
import styled from "styled-components";

export const LoadingContainer = styled(Container)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const LoadingContainerModal = styled(LoadingContainer)`
  height: 6vh;
  margin: 0;
`;

export const LoadingContainerNormal = styled(LoadingContainer)`
  && {
    height:65vh;
  }
`;
