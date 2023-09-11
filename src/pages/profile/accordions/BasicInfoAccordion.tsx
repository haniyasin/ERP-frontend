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
import { Department } from "../../../interfaces/Department";
import { extractProfilePicture } from "../../../utils/extractProfilePicture";
import { formatDateToLocaleTime } from "../../../utils/formatDataToLocaleTime";
import { User } from "../../../interfaces/User";
import ProfilePicture from "../../hr/employees/ProfilePicture";

interface BasicInfoAccordionProps {
  user: User;
}

const BasicInfoAccordion = ({ user }: BasicInfoAccordionProps) => {
  if (!user || user === null) return <LoadingComponent />;

  //   const joinedDepartmentIds = user?.departments?.map(
  //     (department: Department) => department.id
  //   );

  const imageUrl = extractProfilePicture(user?.picture?.data);

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
                defaultValue={user.fullName}
                disabled
              />
              <TextField
                name="email"
                label="Email"
                defaultValue={user.email}
                disabled
              />
              <TextField
                name="startingDate"
                label="Starting Date"
                type="date"
                defaultValue={formatDateToLocaleTime(user.startDate)}
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
                defaultValue={user.title}
                disabled
              />
              <TextField
                name="isContractor"
                label="Is User a Contractor?"
                value={
                  user.isContractor
                    ? "User is a contractor"
                    : "User is not a contractor"
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
