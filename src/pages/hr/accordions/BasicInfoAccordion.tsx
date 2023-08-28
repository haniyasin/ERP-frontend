import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { editEmployeeSchema } from "../form schemas/editEmployeeSchema";
import Form from "../../../common/Form";
import ProfilePicture from "../ProfilePicture";
import InputField from "../../../common/InputField";
import SelectField from "../../../common/SelectField";
import CustomRadioGroup from "../../admin/CustomRadioGroup";
import { Department } from "../../../interfaces/Department";
import { useDepartment, useUser } from "../../../hooks/contextHooks";
import { extractProfilePicture } from "../../../utils/extractProfilePicture";
import { User } from "../../../interfaces/User";
import UploadPictureModal from "../modals/UploadPictureModal";
import LoadingComponent from "../../../common/LoadingComponent";
import { formatDateToLocaleTime } from "../../../utils/formatDataToLocaleTime";

interface BasicInfoAccordionProps {
  employeeLeft: boolean;
}

const BasicInfoAccordion = ({ employeeLeft }: BasicInfoAccordionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditEmployeeClicked, setIsEditEmployeeClicked] =
    useState<boolean>(false);

  const { openedEmployee, editEmployee } = useUser();
  const { departments, getDepartments, isDepartmentLoading } = useDepartment();

  if (!openedEmployee || openedEmployee === null) return <LoadingComponent />;

  const joinedDepartmentIds = openedEmployee?.departments.map(
    (department: Department) => department.id
  );
  const imageUrl = extractProfilePicture(openedEmployee?.picture?.data);

  const onSubmit = (data: User) => {
    if (!data.departments) return;
    const inputData = {
      ...data,
      departments: data.departments.map((dep) => {
        return { id: dep };
      })
    };
    editEmployee(inputData).then((res: boolean) => {
      if (res) {
        setIsEditEmployeeClicked(false);
      }
    });
  };

  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Typography variant="h6">Basic Info</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <UploadPictureModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <Form onSubmit={onSubmit} validationSchema={editEmployeeSchema}>
          <Grid
            container
            direction="row"
            spacing={1}
            marginLeft={6}
            marginTop={4}
          >
            <Grid
              item
              container
              direction="column"
              lg={2}
              alignContent="flex-start"
            >
              <ProfilePicture
                isHovered={!openedEmployee.hasLeft && isHovered}
                imageUrl={imageUrl}
                onHover={() =>
                  !openedEmployee.hasLeft && setIsHovered((prev) => !prev)
                }
                onClick={() => !openedEmployee.hasLeft && setIsModalOpen(true)}
              />
              <Typography textAlign="center">Profile Picture</Typography>
            </Grid>
            <Grid
              item
              container
              direction="column"
              lg={4}
              alignContent="flex-end"
            >
              <Stack direction="column" spacing={0} width={"80%"}>
                <InputField
                  name="fullName"
                  label="Full Name"
                  defaultValue={openedEmployee.fullName}
                  readOnly={!isEditEmployeeClicked}
                />
                <InputField
                  name="email"
                  label="Email"
                  defaultValue={openedEmployee.email}
                  readOnly={!isEditEmployeeClicked}
                />
                <InputField
                  name="startingDate"
                  label="Starting Date"
                  type="date"
                  defaultValue={formatDateToLocaleTime(
                    openedEmployee.startingDate
                  )}
                  readOnly={!isEditEmployeeClicked}
                />
              </Stack>
            </Grid>
            <Grid
              item
              container
              direction="column"
              lg={4}
              alignContent="flex-start"
            >
              <Stack direction="column" spacing={0} width={"80%"}>
                <InputField
                  name="title"
                  label="Title"
                  defaultValue={openedEmployee.title}
                  readOnly={!isEditEmployeeClicked}
                />
                <SelectField
                  name="departments"
                  label="Departments"
                  defaultValue={joinedDepartmentIds}
                  arrayData={departments}
                  getArrayData={getDepartments}
                  isLoading={isDepartmentLoading}
                  multiple={true}
                  readOnly={!isEditEmployeeClicked}
                />
                <CustomRadioGroup
                  name="isContractor"
                  label="Is Employee a Contractor?"
                  defaultValue={`${openedEmployee.isContractor}`}
                  disabled={!isEditEmployeeClicked}
                />
              </Stack>
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
            <Button
              onClick={() => setIsEditEmployeeClicked((prev) => !prev)}
              variant="contained"
              disabled={employeeLeft}
            >
              Edit
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!isEditEmployeeClicked || employeeLeft}
            >
              Submit
            </Button>
          </Stack>
        </Form>
      </AccordionDetails>
    </Accordion>
  );
};

export default BasicInfoAccordion;
