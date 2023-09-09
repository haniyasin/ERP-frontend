import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import InputField from "../../../common/InputField";
import "react-toastify/dist/ReactToastify.css";
import { User } from "../../../interfaces/User";
import SelectField from "../../../common/SelectField";
import {
  useAuth,
  useDepartment,
  useRole,
  useUser
} from "../../../hooks/contextHooks";
import { createUserSchema } from "../form-schemas/createUserSchema";
import Form from "../../../common/Form";
import ModalBox from "../../../common/ModalBox";
import CustomRadioGroup from "../../../common/CustomRadioGroup";

interface NewUserModalProps {
  closeNewUserModal: () => void;
  isNewUserModalOpen: boolean;
}

const NewUserModal = ({
  closeNewUserModal,
  isNewUserModalOpen
}: NewUserModalProps) => {
  const { registerUser } = useAuth();
  const { roles, getRoles, isLoading } = useRole();
  const { departments, getDepartments, isDepartmentLoading } = useDepartment();
  const { getEmployees } = useUser();

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = (data: User) => {
    if (!data.departments) return;
    const inputData = {
      ...data,
      role: { id: data.role },
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
        closeNewUserModal();
      }
    });
  };

  return (
    <>
      <ModalBox
        open={isNewUserModalOpen}
        onClose={closeNewUserModal}
        width={600}
      >
        <Typography variant="h6" textAlign="center" marginBottom={2}>
          Create new User
        </Typography>
        <Form onSubmit={onSubmit} validationSchema={createUserSchema}>
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
                <SelectField
                  name="role"
                  label="Role"
                  defaultValue={"5"}
                  arrayData={roles}
                  getArrayData={getRoles}
                  isLoading={isLoading}
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
                  id="salary-document"
                  variant="standard"
                />
              </Stack>
            </Grid>
          </Stack>
          <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
            <Button type="submit" variant="contained">
              Create
            </Button>
            <Button onClick={closeNewUserModal} variant="contained">
              Cancel
            </Button>
          </Stack>
        </Form>
      </ModalBox>
    </>
  );
};

export default NewUserModal;
