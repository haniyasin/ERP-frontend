import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import InputField from "../../../../common/InputField";
import ModalBox from "../../../../common/ModalBox";
import SelectField from "../../../../common/SelectField";
import {
  useAuth,
  useUser,
  useDepartment
} from "../../../../hooks/contextHooks";
import { User } from "../../../../interfaces/User";
import CustomRadioGroup from "../../../admin/CustomRadioGroup";
import { createEmployeeSchema } from "../form-schemas/createEmployeeSchema";
import Form from "../../../../common/Form";

interface NewEmployeeModalProps {
  isNewEmployeeModalOpen: boolean;
  closeNewEmployeeModal: () => void;
}

const NewEmployeeModal = ({
  isNewEmployeeModalOpen,
  closeNewEmployeeModal
}: NewEmployeeModalProps) => {
  const { registerUser } = useAuth();
  const { getEmployees } = useUser();
  const { departments, getDepartments, isDepartmentLoading } = useDepartment();

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = (data: User) => {
    if (!data.departments) return;
    const inputData = {
      ...data,
      role: { id: 5 },
      departments: data.departments.map((dep) => {
        return { id: dep };
      }),
      picture: data.picture[0],
      document: data.document[0],
      salary: { net: data.net, gross: data.gross, startDate: data.startDate }
    };
    registerUser(inputData).then((res: boolean) => {
      if (res) {
        getEmployees();
        closeNewEmployeeModal();
      }
    });
  };

  return (
    <>
      <ModalBox
        open={isNewEmployeeModalOpen}
        onClose={closeNewEmployeeModal}
        width={600}
      >
        <Typography variant="h6" textAlign="center" marginBottom={2}>
          Add new Employee
        </Typography>
        <Form onSubmit={onSubmit} validationSchema={createEmployeeSchema}>
          <Typography textAlign="center" variant="subtitle1" mt={2}>
            Basic info
          </Typography>
          <Grid container direction="row" spacing={2} justifyContent="center">
            <Grid
              item
              container
              direction="column"
              xs={6}
              alignContent="flex-end"
            >
              <Stack direction="column" spacing={0} width={"85%"}>
                <InputField name="fullName" label="Full Name" />
                <InputField name="email" label="Email" />
                <InputField
                  name="startingDate"
                  label="Start Date"
                  type="date"
                  defaultValue={today}
                />
                <InputField
                  name="picture"
                  label=""
                  type="file"
                  accept=".jpg,.png,.gif"
                  id="profile-picture"
                  variant="standard"
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
                <InputField name="title" label="Title" />
                <SelectField
                  name="departments"
                  label="Departments"
                  defaultValue={[1]}
                  arrayData={departments}
                  getArrayData={getDepartments}
                  isLoading={isDepartmentLoading}
                  multiple={true}
                />
                <CustomRadioGroup
                  name="isContractor"
                  label="Is Employee a Contractor?"
                />
              </Stack>
            </Grid>
          </Grid>
          <Typography textAlign="center" variant="subtitle1" mt={2}>
            Salary info
          </Typography>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <Grid
              item
              container
              direction="column"
              lg={6}
              alignContent="flex-end"
            >
              <Stack direction="column" spacing={0} width={"85%"}>
                <InputField name="net" label="Salary NET" type="number" />
                <InputField name="gross" label="Salary Gross" type="number" />
              </Stack>
            </Grid>
            <Grid
              item
              container
              direction="column"
              lg={6}
              alignContent="flex-start"
            >
              <Stack direction="column" spacing={0} width={"85%"}>
                <InputField
                  name="startDate"
                  label="Start Date"
                  type="date"
                  defaultValue={today}
                />
                <InputField
                  name="document"
                  label=""
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.csv,.zip"
                  id="document"
                  variant="standard"
                />
              </Stack>
            </Grid>
          </Stack>
          <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
            <Button type="submit" variant="contained">
              Create
            </Button>
            <Button onClick={closeNewEmployeeModal} variant="contained">
              Cancel
            </Button>
          </Stack>
        </Form>
      </ModalBox>
    </>
  );
};

export default NewEmployeeModal;
