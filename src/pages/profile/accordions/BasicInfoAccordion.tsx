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
import styled from "styled-components"; // Import styled-components

// Styled components
const StyledText = styled(Typography)`
  margin-bottom: 8px;
  font-weight: bold !important; /* Ensure that the font-weight is applied */
`;

const StyledValueText = styled(Typography)`
  font-weight: normal !important; /* Ensure that the font-weight is applied */
`;

const Container = styled(Grid)`
  margin: 1116px;
`;

const ColumnContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const KeyValueContainer = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const KeyValueColumn = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

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
            <StyledText variant="h6" textAlign="center">
              Profile Picture
            </StyledText>
          </ColumnContainer>
          <Container
            item
            container
            direction="row"
            lg={8}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <KeyValueColumn item container direction="column" lg={5}>
              <KeyValueContainer>
                <StyledText variant="h6">Full Name:</StyledText>
                <StyledValueText variant="h6">
                  &nbsp;{user.fullName}
                </StyledValueText>
              </KeyValueContainer>
              <KeyValueContainer>
                <StyledText variant="h6">Email:</StyledText>
                <StyledValueText variant="h6">
                  &nbsp;{user.email}
                </StyledValueText>
              </KeyValueContainer>
              <KeyValueContainer>
                <StyledText variant="h6">Starting Date:</StyledText>
                <StyledValueText variant="h6">
                  &nbsp;{formatDateToLocaleTime(user.startDate)}
                </StyledValueText>
              </KeyValueContainer>
            </KeyValueColumn>
            <KeyValueColumn item container direction="column" lg={5}>
              <KeyValueContainer>
                <StyledText variant="h6">Title: </StyledText>
                <StyledValueText variant="h6">
                  &nbsp;{user.title}
                </StyledValueText>
              </KeyValueContainer>
              <KeyValueContainer>
                <StyledText variant="h6">Contractor?</StyledText>
                <StyledValueText variant="h6">
                  &nbsp;{user.isContractor ? " - Yes" : " - No"}
                </StyledValueText>
              </KeyValueContainer>
              <KeyValueContainer>
                <StyledText variant="h6">Departments:</StyledText>
                <StyledValueText variant="h6">
                  &nbsp;
                  {user?.departments.map((department: Department) => (
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
