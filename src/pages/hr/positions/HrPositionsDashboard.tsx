import React, { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { usePosition, useUser } from "../../../hooks/contextHooks";
import { ToastContainer } from "react-toastify";
import PositionList from "./PositionList";
import NewPositionModal from "./modals/NewPositionModal";
import {
  MainTitle,
  TableTitle
} from "../../../styles/styled components/StyledTypographies";

const HrPosition = () => {
  const [isNewPositionModalOpen, setIsNewPositionModalOpen] =
    useState<boolean>(false);
  const { getEmployees } = useUser();
  const { getPositions } = usePosition();

  useEffect(() => {
    getEmployees();
    getPositions();
  }, []); // eslint-disable-line

  return (
    <Container>
      <ToastContainer position="top-center" />
      <MainTitle variant="h4">Human Resources</MainTitle>
      <TableTitle variant="h5">Vacant Positions</TableTitle>
      <Box display="flex" justifyContent="center" marginBottom={3}>
        <Button
          onClick={() => setIsNewPositionModalOpen(true)}
          variant="contained"
        >
          New Position
        </Button>
      </Box>
      <PositionList />
      {isNewPositionModalOpen && (
        <NewPositionModal
          closeNewPositionModal={() => setIsNewPositionModalOpen(false)}
          isNewPositionModalOpen={isNewPositionModalOpen}
        />
      )}
    </Container>
  );
};

export default HrPosition;
