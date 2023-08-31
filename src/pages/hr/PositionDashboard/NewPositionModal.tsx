import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { usePosition } from "../../../hooks/contextHooks";
import Form from "../../../common/Form";
import ModalBox from "../../../common/ModalBox";
import { createPositionSchema } from "./createPositionSchema";
import { Position } from "../../../interfaces/Position";
import InputField from "../../../common/InputField";

interface NewPositionModalProps {
  closeNewPositionModal: () => void;
  isNewPositionModalOpen: boolean;
}

const NewPositionModal = ({
  closeNewPositionModal,
  isNewPositionModalOpen
}: NewPositionModalProps) => {
  const { getPositions, createPosition } = usePosition();

  const onSubmit = (data: Position) => {
    createPosition(data).then((res: boolean) => {
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
                <InputField name="project" label="Project" />
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
