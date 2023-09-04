import React from "react";
import { useEffect, useState } from "react";
import { usePosition } from "../../../hooks/contextHooks";
import { Container, Typography, Grid, Stack, Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import PositionInfoAccordion from "./PositionInfoAccordion";
import { useParams } from "react-router-dom";
import CandidatesAccordion from "./Candidates/CandidatesAccordion";
import LoadingComponent from "../../../common/LoadingComponent";
import { handleNotFound } from "../../../routes/ErrorHandler";
import DeletePositionModal from "./DeletePositionModal";

const PositionDashboard = () => {
  const [positionExists, setPositionExists] = useState<boolean>(true);
  const [isDeletePositionClicked, setIsDeletePositionClicked] =
    useState<boolean>(false);

  const { clickedPosition, handlePositionDashboardClose, getPositionById } =
    usePosition();
  const { positionId } = useParams();

  useEffect(() => {
    getPositionById(positionId).then((res: any) => {
      if (res?.data) {
        setPositionExists(false);
      }
    });
  }, []);

  if (!positionExists) return handleNotFound();

  if (!clickedPosition) return <LoadingComponent />;

  return (
    <Container sx={{ marginTop: 8 }}>
      <ToastContainer position="top-center" />
      <Typography variant="h4" textAlign="center" marginBottom={3}>
        Position information
      </Typography>
      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item container direction="column" lg={12}>
          <Stack direction="row" justifyContent="center" spacing={2} mb={3}>
            <Button onClick={handlePositionDashboardClose} variant="contained">
              Back
            </Button>
            <Button
              onClick={() => setIsDeletePositionClicked(true)}
              variant="contained"
            >
              Delete
            </Button>
          </Stack>
          <PositionInfoAccordion />
          <CandidatesAccordion />
        </Grid>
      </Grid>
      <DeletePositionModal
        isOpen={isDeletePositionClicked}
        closeModal={() => setIsDeletePositionClicked(false)}
      />
    </Container>
  );
};

export default PositionDashboard;
