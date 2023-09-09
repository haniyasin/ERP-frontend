import React from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Department } from "../../../interfaces/Department";
import { useHttp } from "../../../hooks/useHttp";
import Form from "../../../common/Form";
import InputField from "../../../common/InputField";
import ModalBox from "../../../common/ModalBox";
import { createClientSchema } from "../form-schemas/CreateClientSchema";

interface NewDepartmentModalProps {
  closeNewDepartmentModal: () => void;
  isNewDepartmentModalOpen: boolean;
}

const NewDepartmentModal = ({
  closeNewDepartmentModal,
  isNewDepartmentModalOpen
}: NewDepartmentModalProps) => {
  const { post } = useHttp();

  const onSubmit = (inputData: Department) => {
    post("/departments", inputData).then((res) => {
      if (res) {
        toast.success("Successfully created new Department!");
        closeNewDepartmentModal();
      }
    });
  };

  return (
    <>
      <ModalBox
        open={isNewDepartmentModalOpen}
        onClose={closeNewDepartmentModal}
      >
        <Typography variant="h6" textAlign="center" marginBottom={2}>
          Create new Department
        </Typography>
        <Form onSubmit={onSubmit} validationSchema={createClientSchema}>
          <Grid container direction="row" justifyContent="center">
            <Grid item container direction="column" lg={9}>
              <Stack direction="column" spacing={0}>
                <InputField name="name" label="Department Name" />
              </Stack>
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
            <Button type="submit" variant="contained">
              Create
            </Button>
            <Button onClick={closeNewDepartmentModal} variant="contained">
              Cancel
            </Button>
          </Stack>
        </Form>
      </ModalBox>
    </>
  );
};

export default NewDepartmentModal;
