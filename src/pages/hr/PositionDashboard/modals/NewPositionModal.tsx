import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  useCompany,
  usePosition,
  useProject
} from "../../../../hooks/contextHooks";
import Form from "../../../../common/Form";
import ModalBox from "../../../../common/ModalBox";
import { createPositionSchema } from "../form-schemas/createPositionSchema";
import { Position } from "../../../../interfaces/Position";
import InputField from "../../../../common/InputField";
import SelectField from "../../../../common/SelectField";

interface NewPositionModalProps {
  closeNewPositionModal: () => void;
  isNewPositionModalOpen: boolean;
}

const NewPositionModal = ({
  closeNewPositionModal,
  isNewPositionModalOpen
}: NewPositionModalProps) => {
  const { getPositions, createPosition } = usePosition();
  const { projects, getProjects, isLoading } = useProject();
  const { companies, getCompanies, isLoading: isCompanyLoading } = useCompany();

  const onSubmit = (data: Position) => {
    createPosition({
      ...data,
      company: { id: data.company },
      project: { id: data.project }
    }).then((res: boolean) => {
      if (res) {
        getPositions();
        closeNewPositionModal();
      }
    });
  };

  return (
    <>
      <ModalBox
        open={isNewPositionModalOpen}
        onClose={closeNewPositionModal}
        width={600}
      >
        <Typography variant="h6" textAlign="center" marginBottom={2}>
          Create new Position
        </Typography>
        <Form onSubmit={onSubmit} validationSchema={createPositionSchema}>
          <Grid container direction="row" spacing={2} justifyContent="center">
            <Grid
              item
              container
              direction="column"
              lg={6}
              alignContent="flex-end"
            >
              <Stack direction="column" spacing={0} width={"85%"}>
                <InputField name="name" label="Name" />
                <SelectField
                  name="project"
                  label="Project"
                  defaultValue={projects[0]?.id || ""}
                  arrayData={projects}
                  getArrayData={getProjects}
                  isLoading={isLoading}
                />
              </Stack>
            </Grid>
            <Grid
              item
              container
              direction="column"
              xs={6}
              alignContent="flex-start"
            >
              <Stack direction="column" spacing={0} width={"85%"}>
                <InputField name="description" label="Description" />
                <SelectField
                  name="company"
                  label="Company"
                  defaultValue={companies[0]?.id || ""}
                  arrayData={companies}
                  getArrayData={getCompanies}
                  isLoading={isCompanyLoading}
                />
              </Stack>
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
            <Button type="submit" variant="contained">
              Create
            </Button>
            <Button onClick={closeNewPositionModal} variant="contained">
              Cancel
            </Button>
          </Stack>
        </Form>
      </ModalBox>
    </>
  );
};

export default NewPositionModal;
