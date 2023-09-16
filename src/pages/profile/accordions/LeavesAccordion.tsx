import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { User } from "../../../interfaces/User";
import LeavesList from "../LeavesList";

interface LeavesAccordionProps {
  user: User;
}

const LeavesAccordion = ({ user }: LeavesAccordionProps) => {
  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Typography variant="h6">Leaves</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Container>
          <Typography
            variant="subtitle1"
            display="inline"
            sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
          >
            Paid Leave Days Left:
          </Typography>
          &nbsp;
          <Typography variant="body1" display="inline">
            {user?.leaveDaysLeft}
          </Typography>
        </Container>
        <LeavesList user={user} />
      </AccordionDetails>
    </Accordion>
  );
};

export default LeavesAccordion;
