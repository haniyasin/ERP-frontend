import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LoadingComponent from "../../../common/LoadingComponent";
import { useDepartment } from "../../../hooks/contextHooks";
import { Department } from "../../../interfaces/Department";
import { extractProfilePicture } from "../../../utils/extractProfilePicture";
import { formatDateToLocaleTime } from "../../../utils/formatDataToLocaleTime";
import ProfilePicture from "../../hr/employees/ProfilePicture";
import { User } from "../../../interfaces/User";

interface BasicInfoAccordionProps {
  employee: User;
}

const BasicInfoAccordion = ({ employee }: BasicInfoAccordionProps) => {
  const { departments } = useDepartment();

  if (!employee || employee === null) return <LoadingComponent />;

  const joinedDepartmentIds = employee?.departments?.map(
    (department: Department) => department.id
  );

  const imageUrl = extractProfilePicture(employee?.picture?.data);

  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Typography variant="h6">Basic Info</Typography>
      </AccordionSummary>
      <AccordionDetails>
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
            <ProfilePicture imageUrl={imageUrl} />
            <Typography textAlign="center">Profile Picture</Typography>
          </Grid>
          <Grid
            item
            container
            direction="column"
            lg={4}
            alignContent="flex-end"
          >
            <Stack direction="column" spacing={1} width={"80%"}>
              <TextField
                name="fullName"
                label="Full Name"
                defaultValue={employee.fullName}
                disabled
              />
              <TextField
                name="email"
                label="Email"
                defaultValue={employee.email}
                disabled
              />
              <TextField
                name="startingDate"
                label="Starting Date"
                type="date"
                defaultValue={formatDateToLocaleTime(employee.startDate)}
                disabled
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
            <Stack direction="column" spacing={1} width={"80%"}>
              <TextField
                name="title"
                label="Title"
                defaultValue={employee.title}
                disabled
              />
              <TextField
                name="isContractor"
                label="Is Employee a Contractor?"
                value={
                  employee.isContractor
                    ? "Employee is a contractor"
                    : "Employee is not a contractor"
                }
                disabled
              />
              {/* <TextField
                name="departments"
                label="Departments"
                select={true}
                defaultValue={joinedDepartmentIds || ""}
                value={departments}
                InputProps={{
                  readOnly: true
                }}
              /> */}
            </Stack>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default BasicInfoAccordion;
