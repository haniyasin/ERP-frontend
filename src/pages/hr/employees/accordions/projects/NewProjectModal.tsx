import { Button, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useHttp } from "../../../../../hooks/useHttp";
import ModalBox from "../../../../../common/ModalBox";
import Form from "../../../../../common/Form";
import { useUser } from "../../../../../hooks/contextHooks";
import SelectField from "../../../../../common/SelectField";
import { Project } from "../../../../../interfaces/Project";
import { createProjectSchema } from "./createProjectSchema";
import { toast } from "react-toastify";

interface NewProjectModalProps {
  closeModal: () => void;
  isModalOpen: boolean;
}

const NewProjectModal = ({ closeModal, isModalOpen }: NewProjectModalProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { get, put } = useHttp();
  const { openedEmployee, handleEmployeeDashboardOpen } = useUser();

  const getProjects = () => {
    get("projects").then((res) => {
      if (res) {
        setProjects(res.data);
      }
    });
  };

  const onSubmit = (data: Project) => {
    put(`projects/${data.id}`, { userId: openedEmployee.id }).then((res) => {
      if (res) {
        handleEmployeeDashboardOpen({
          ...openedEmployee,
          projects: [...openedEmployee.projects, res.data],
          currentProject: res.data
        });
        closeModal();
        toast.success("Successfully added Project to Employee");
      }
    });
  };

  return (
    <ModalBox open={isModalOpen} onClose={closeModal} width={400}>
      <Typography variant="h6" textAlign="center" marginBottom={2}>
        Add Project to Employee
      </Typography>
      <Form onSubmit={onSubmit} validationSchema={createProjectSchema}>
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Grid item container direction="column" lg={6}>
            <Stack direction="column" spacing={0}>
              <SelectField
                name="id"
                label="Project"
                defaultValue={[1]}
                arrayData={projects}
                getArrayData={getProjects}
                isLoading={projects.length === 0}
              />
            </Stack>
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
          <Button type="submit" variant="contained">
            Add
          </Button>
          <Button onClick={closeModal} variant="contained">
            Cancel
          </Button>
        </Stack>
      </Form>
    </ModalBox>
  );
};

export default NewProjectModal;
