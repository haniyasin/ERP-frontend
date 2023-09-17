import { Typography, Grid } from "@mui/material";
import styled from "styled-components";

export const StyledKey = styled(Typography)`
  margin-bottom: 8px;
  font-weight: bold !important; /* Ensure that the font-weight is applied */
`;

export const StyledValueText = styled(Typography)`
  font-weight: normal !important; /* Ensure that the font-weight is applied */
`;

export const Container = styled(Grid)`
  margin: 1116px;
`;

export const ColumnContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const KeyValueContainer = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const KeyValueColumn = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
