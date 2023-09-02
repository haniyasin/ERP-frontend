import React from "react";
import { useEffect, useState } from "react";
import { usePosition } from "../../../hooks/contextHooks";
import { Container, Typography, Grid, Stack, Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import PositionInfoAccordion from "./PositionInfoAccordion";
import { useParams } from "react-router-dom";
import CandidatesAccordion from "./Candidates/CandidatetsAccordion";

const PositionDashboard = () => {
  const [isEditPositionClicked, setIsEditPositionClicked] =
    useState<boolean>(false);

  const { handlePositionDashboardClose, getPositionById } = usePosition();
  const { positionId } = useParams();

  useEffect(() => {
    getPositionById(positionId);
  }, []);

  return (
    <Container sx={{ marginTop: 8 }}>
      <ToastContainer position="top-center" />
      <Typography variant="h6" textAlign="center" marginBottom={2}>
        Position information
      </Typography>
      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item container direction="column" lg={12}>
          <Stack direction="row" justifyContent="center" spacing={2} mb={3}>
            <Button onClick={handlePositionDashboardClose} variant="contained">
              Back
            </Button>
            <Button
              onClick={() => setIsEditPositionClicked((prev) => !prev)}
              variant="contained"
            >
              Edit
            </Button>
          </Stack>
          <PositionInfoAccordion
            isEditPositionClicked={isEditPositionClicked}
            handleEditPositionClose={() => setIsEditPositionClicked(false)}
          />
          <CandidatesAccordion />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PositionDashboard;
