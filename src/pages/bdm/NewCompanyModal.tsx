import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import InputField from "../../common/InputField";
import "react-toastify/dist/ReactToastify.css";
import { useCompany } from "../../hooks/contextHooks";
import Form from "../../common/Form";
import ModalBox from "../../common/ModalBox";
import { CompanyContextType } from "../../providers/CompanyProvider";
import { createCompanySchema } from "./form schemas/createCompanySchema";

interface NewCompanyModalProps {
  closeNewCompanyModal: () => void;
  isNewCompanyModalOpen: boolean;
}

const NewCompanyModal = ({
  closeNewCompanyModal,
  isNewCompanyModalOpen
}: NewCompanyModalProps) => {
  const { addCompany } = useCompany();

  const onSubmit = (data: CompanyContextType) => {
    console.log(data);
    addCompany(data).then((res: boolean) => {
      if (res) closeNewCompanyModal();
    });
  };

  return (
    <>
      <ModalBox
        open={isNewCompanyModalOpen}
        onClose={closeNewCompanyModal}
        width={600}
      >
        <Typography variant="h6" textAlign="center" marginBottom={2}>
          Add new Company
        </Typography>
        <Form onSubmit={onSubmit} validationSchema={createCompanySchema}>
          <Grid container direction="row" spacing={2} justifyContent="center">
            <Grid
              item
              container
              direction="column"
              lg={6}
              alignContent="flex-end"
            >
              <Stack direction="column" spacing={0} width={"85%"}>
                <InputField name="name" label="Company Name" />
                <InputField
                  name="employeeSize"
                  label="Employee Size"
                  defaultValue={0}
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
                <InputField
                  name="description"
                  label="Description"
                  size="small"
                />
                <InputField name="contacts" label="Contacts" type="string" />
              </Stack>
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
            <Button type="submit" variant="contained">
              Create
            </Button>
            <Button onClick={closeNewCompanyModal} variant="contained">
              Cancel
            </Button>
          </Stack>
        </Form>
      </ModalBox>
    </>
  );
};

export default NewCompanyModal;
