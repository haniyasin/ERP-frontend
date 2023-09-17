import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProjectsList from "../ProjectsList";

const ProjectsAccordion = () => {
  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Projects</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ProjectsList />
      </AccordionDetails>
    </Accordion>
  );
};

export default ProjectsAccordion;
