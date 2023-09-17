import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmployeesList from "../EmployeesList";

const VacantPositionsAccordion = () => {
  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Employees</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <EmployeesList />
      </AccordionDetails>
    </Accordion>
  );
};

export default VacantPositionsAccordion;
