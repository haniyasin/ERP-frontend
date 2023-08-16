import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useUser } from '../../../../hooks/contextHooks';
import ProjectsList from './ProjectsList';
import NewProjectModal from './NewProjectModal';

interface ProjectsAccordionProps {
  employeeLeft: boolean,
}

const ProjectsAccordion = ({ employeeLeft }: ProjectsAccordionProps) => {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState<boolean>(false);
  const { openedEmployee } = useUser();

  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Typography variant="h6">Projects</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {openedEmployee?.currentProject && (
          <Container>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Current Project Details:
            </Typography>
            <Typography variant="body1">
              <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
                Project Name:
              </Typography>{' '}
              {openedEmployee?.currentProject?.name}
            </Typography>
          </Container>
        )}
        <Container sx={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <Button onClick={() => setIsNewProjectModalOpen(true)} variant="contained" sx={{ marginTop: '1rem' }} disabled={employeeLeft}>
            Add Project
          </Button>
        </Container>
        <NewProjectModal isModalOpen={isNewProjectModalOpen} closeModal={() => setIsNewProjectModalOpen(false)} />
        <ProjectsList />
      </AccordionDetails>
    </Accordion>
  );
};

export default ProjectsAccordion;
