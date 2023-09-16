import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { formatDateToLocaleTime } from "../../../utils/formatDataToLocaleTime";
import { User } from "../../../interfaces/User";
import SalariesList from "../SalariesList";

interface SalaryAccordionProps {
  user: User;
}

const SalaryAccordion = ({ user }: SalaryAccordionProps) => {
  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Typography variant="h6">Salary</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {user?.currentSalary && (
          <Container>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
            >
              Current Salary Details:
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: "0.5rem", fontWeight: "bold" }}
            >
              Net Salary: {user?.currentSalary?.net} BGN
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: "0.5rem", fontWeight: "bold" }}
            >
              Gross Salary: {user?.currentSalary?.gross} BGN
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Start Date: {formatDateToLocaleTime(user.currentSalary.startDate)}
            </Typography>
          </Container>
        )}
        <SalariesList user={user} />
      </AccordionDetails>
    </Accordion>
  );
};

export default SalaryAccordion;
