import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useProject } from "../../../hooks/contextHooks";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../common/LoadingComponent";
import { handleNotFound } from "../../../routes/ErrorHandler";
import DeleteProjectModal from "./modals/DeleteProjectModal";
import BasicInfoAccordion from "./accordions/BasicInfoAccordion";
import VacantPositionsAccordion from "./accordions/VacantPositionsAccordion";
import EmployeesAccordion from "./accordions/EmployeesAccordion";

const ProjectInformation = () => {
  const [projectExists, setProjectExists] = useState<boolean>(true);
  const [isDeleteProjectClicked, setIsDeleteProjectClicked] =
    useState<boolean>(false);
  const { projectId } = useParams();

  const { openedProject, handleProjectDashboardClose, getProjectById } =
    useProject();

  useEffect(() => {
    getProjectById(projectId).then((res: any) => {
      if (res?.data) {
        setProjectExists(false);
      }
    });
  }, []);

  if (!projectExists) return handleNotFound();

  if (!openedProject) return <LoadingComponent />;

  return (
    <Container sx={{ marginTop: 8 }} className="employee-pic">
      <ToastContainer position="top-center" />
      <DeleteProjectModal
        isOpen={isDeleteProjectClicked}
        closeModal={() => setIsDeleteProjectClicked(false)}
      />
      <Typography variant="h4" textAlign="center" marginBottom={3}>
        Project information
      </Typography>
      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item container direction="column" lg={12}>
          <Stack direction="row" justifyContent="center" spacing={2} mb={3}>
            <Button onClick={handleProjectDashboardClose} variant="contained">
              Back
            </Button>
            <Button
              onClick={() => setIsDeleteProjectClicked(true)}
              variant="contained"
            >
              Delete
            </Button>
          </Stack>
          <BasicInfoAccordion />
          <VacantPositionsAccordion />
          <EmployeesAccordion />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProjectInformation;
