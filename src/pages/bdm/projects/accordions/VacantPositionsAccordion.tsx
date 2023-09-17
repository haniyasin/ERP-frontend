import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VacantPositionList from "../VacantPositionsList";

const VacantPositionsAccordion = () => {
  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Vacant Positions</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <VacantPositionList />
      </AccordionDetails>
    </Accordion>
  );
};

export default VacantPositionsAccordion;
