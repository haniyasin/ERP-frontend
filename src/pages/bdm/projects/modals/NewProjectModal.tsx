import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import InputField from "../../../../common/InputField";
import "react-toastify/dist/ReactToastify.css";
import { useCompany, useProject } from "../../../../hooks/contextHooks";
import Form from "../../../../common/Form";
import ModalBox from "../../../../common/ModalBox";
import { createProjectSchema } from "../form-schemas/createProjectSchema";
import SelectField from "../../../../common/SelectField";
import { Project } from "../../../../interfaces/Project";

interface NewProjectModalProps {
  closeNewProjectModal: () => void;
  isNewProjectModalOpen: boolean;
}

const NewProjectModal = ({
  closeNewProjectModal,
  isNewProjectModalOpen
}: NewProjectModalProps) => {
  const { createProject } = useProject();
  const { companies, getCompanies, isLoading } = useCompany();

  const onSubmit = (data: Project) => {
    createProject(data).then((res: boolean) => {
      if (res) closeNewProjectModal();
    });
  };

  return (
    <>
      <ModalBox
        open={isNewProjectModalOpen}
        onClose={closeNewProjectModal}
        width={400}
      >
        <Typography variant="h6" textAlign="center" marginBottom={2}>
          Add new Project
        </Typography>
        <Form onSubmit={onSubmit} validationSchema={createProjectSchema}>
          <Grid container direction="row" spacing={2} justifyContent="center">
            <Grid
              item
              container
              direction="column"
              lg={9}
              alignContent="flex-end"
            >
              <Stack direction="column" spacing={0} width={"100%"}>
                <InputField name="name" label="Project Name" />
                <InputField
                  name="description"
                  label="Description"
                  size="small"
                />
                <SelectField
                  name="company"
                  label="Company"
                  defaultValue={companies[0]?.id || ""}
                  arrayData={companies}
                  getArrayData={getCompanies}
                  isLoading={isLoading}
                />
              </Stack>
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
            <Button type="submit" variant="contained">
              Create
            </Button>
            <Button onClick={closeNewProjectModal} variant="contained">
              Cancel
            </Button>
          </Stack>
        </Form>
      </ModalBox>
    </>
  );
};

export default NewProjectModal;
