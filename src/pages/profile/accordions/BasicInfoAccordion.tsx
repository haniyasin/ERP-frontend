import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Department } from "../../../interfaces/Department";
import { extractProfilePicture } from "../../../utils/extractProfilePicture";
import { formatDateToLocaleTime } from "../../../utils/formatDataToLocaleTime";
import { User } from "../../../interfaces/User";
import ProfilePicture from "../../hr/employees/ProfilePicture";
import {
  ColumnContainer,
  StyledKey,
  KeyValueColumn,
  KeyValueContainer,
  StyledValueText,
  Container
} from "../../../styles/styled components/StyledBasicInfo";

interface BasicInfoAccordionProps {
  user: User;
}

const BasicInfoAccordion = ({ user }: BasicInfoAccordionProps) => {
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
        <Grid container direction="row" spacing={3}>
          <ColumnContainer item container direction="column" lg={3}>
            <ProfilePicture imageUrl={imageUrl} />
            <StyledKey variant="h6" textAlign="center">
              Profile Picture
            </StyledKey>
          </ColumnContainer>
          <Container
            item
            container
            direction="row"
            lg={8}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <KeyValueColumn item container direction="column" lg={6}>
              <KeyValueContainer>
                <StyledKey variant="h6">Full Name:</StyledKey>
                <StyledValueText variant="h6">
                  &nbsp;{user.fullName}
                </StyledValueText>
              </KeyValueContainer>
              <KeyValueContainer>
                <StyledKey variant="h6">Email:</StyledKey>
                <StyledValueText variant="h6">
                  &nbsp;{user.email}
                </StyledValueText>
              </KeyValueContainer>
              <KeyValueContainer>
                <StyledKey variant="h6">Starting Date:</StyledKey>
                <StyledValueText variant="h6">
                  &nbsp;{formatDateToLocaleTime(user.startDate)}
                </StyledValueText>
              </KeyValueContainer>
            </KeyValueColumn>
            <KeyValueColumn item container direction="column" lg={6}>
              <KeyValueContainer>
                <StyledKey variant="h6">Title: </StyledKey>
                <StyledValueText variant="h6">
                  &nbsp;{user.title}
                </StyledValueText>
              </KeyValueContainer>
              <KeyValueContainer>
                <StyledKey variant="h6">Contractor?</StyledKey>
                <StyledValueText variant="h6">
                  &nbsp;{user.isContractor ? " - Yes" : " - No"}
                </StyledValueText>
              </KeyValueContainer>
              <KeyValueContainer>
                <StyledKey variant="h6">Departments:</StyledKey>
                <StyledValueText variant="h6">
                  &nbsp;
                  {user.departments &&
                    user?.departments.map((department: Department) => (
                      <span key={department.id}>{department.name}, </span>
                    ))}
                </StyledValueText>
              </KeyValueContainer>
            </KeyValueColumn>
          </Container>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default BasicInfoAccordion;
