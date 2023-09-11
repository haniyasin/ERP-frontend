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
import ProjectsList from "../ProjectsList";

interface ProjectsAccordionProps {
  user: User;
}

const ProjectsAccordion = ({ user }: ProjectsAccordionProps) => {
  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Typography variant="h6">Projects</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {user?.currentProject && (
          <Container>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
            >
              Current Project Details:
            </Typography>
            <Typography variant="body1">
              <Typography
                variant="body1"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                Project Name:
              </Typography>{" "}
              {user?.currentProject?.name}
            </Typography>
          </Container>
        )}
        <Container
          sx={{ textAlign: "center", marginBottom: "0.5rem" }}
        ></Container>
        <ProjectsList user={user} />
      </AccordionDetails>
    </Accordion>
  );
};

export default ProjectsAccordion;
