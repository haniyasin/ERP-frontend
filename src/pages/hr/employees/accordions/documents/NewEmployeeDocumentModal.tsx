import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useHttp } from "../../../../../hooks/useHttp";
import ModalBox from "../../../../../common/ModalBox";
import Form from "../../../../../common/Form";
import InputField from "../../../../../common/InputField";
import { createEmployeeDocumentSchema } from "./createEmployeeDocumentSchema";
import { useUser } from "../../../../../hooks/contextHooks";
import { EmployeeDocument } from "../../../../../interfaces/User";

interface NewBonusModalProps {
  closeModal: () => void;
  isModalOpen: boolean;
}

const NewEmployeeDocumentModal = ({
  closeModal,
  isModalOpen
}: NewBonusModalProps) => {
  const { post } = useHttp();
  const { openedEmployee, handleEmployeeDashboardOpen } = useUser();

  const onSubmit = (data: EmployeeDocument) => {
    const dataWithUserID = {
      ...data,
      user: { id: openedEmployee.id },
      document: data.document[0]
    };
    post("/employee/documents", dataWithUserID, "multipart/form-data").then(
      (res) => {
        if (res) {
          handleEmployeeDashboardOpen({
            ...openedEmployee,
            documents: [...openedEmployee.documents, res.data]
          });
          toast.success("Successfully created new Document!");
          closeModal();
        }
      }
    );
  };

  return (
    <ModalBox open={isModalOpen} onClose={closeModal} width={300}>
      <Typography variant="h6" textAlign="center" marginBottom={2}>
        New Document
      </Typography>
      <Form onSubmit={onSubmit} validationSchema={createEmployeeDocumentSchema}>
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Grid item container direction="column" lg={9}>
            <Stack direction="column" spacing={0}>
              <InputField name="name" label="Document Name" />
              <InputField name="document" label="" type="file" />
            </Stack>
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
          <Button type="submit" variant="contained">
            Create
          </Button>
          <Button onClick={closeModal} variant="contained">
            Cancel
          </Button>
        </Stack>
      </Form>
    </ModalBox>
  );
};

export default NewEmployeeDocumentModal;
