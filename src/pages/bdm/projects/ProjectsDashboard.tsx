import React, { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import {
  MainTitle,
  TableTitle
} from "../../../styles/styled components/StyledTypographies";
import NewProjectModal from "./modals/NewProjectModal";
import ProjectsList from "./ProjectsList";
import { useProject } from "../../../hooks/contextHooks";

const BdmProjects = () => {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] =
    useState<boolean>(false);
  const { getProjects } = useProject();

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Container>
      <ToastContainer position="top-center" />
      <MainTitle variant="h4">Business Development Management</MainTitle>
      <TableTitle variant="h5">Projects</TableTitle>
      <Box display="flex" justifyContent="center" marginBottom={3}>
        <Button
          onClick={() => setIsNewProjectModalOpen(true)}
          variant="contained"
        >
          New Project
        </Button>
      </Box>
      <ProjectsList />
      {isNewProjectModalOpen && (
        <NewProjectModal
          closeNewProjectModal={() => setIsNewProjectModalOpen(false)}
          isNewProjectModalOpen={isNewProjectModalOpen}
        />
      )}
    </Container>
  );
};

export default BdmProjects;
