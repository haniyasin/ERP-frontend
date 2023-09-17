import { Box } from "@mui/material";
import styled from "styled-components";

interface StyledModalBoxProps {
  top?: string;
  left?: string;
  width?: number;
  bgcolor?: string;
  transform?: string;
}

export const StyledModalBox = styled(Box)<StyledModalBoxProps>`
  position: absolute;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 32px;
  top: ${(props) => props?.top || "40%"};
  left: ${(props) => props?.left || "50%"};
  width: ${(props) => props?.width || "300px"};
  background-color: ${(props) => props?.bgcolor || "whitesmoke"};
  transform: ${(props) => props?.transform || "translate(-50%, -40%)"};
`;
