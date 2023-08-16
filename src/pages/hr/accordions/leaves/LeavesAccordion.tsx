import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useUser } from '../../../../hooks/contextHooks';
import LeavesList from './LeavesList';
import NewLeaveModal from './NewLeaveModal';

interface LeavesAccordionProps {
  employeeLeft: boolean,
}

const LeavesAccordion = ({ employeeLeft }: LeavesAccordionProps) => {
  const [isNewLeaveModalOpen, setIsNewLeaveModalOpen] = useState<boolean>(false);
  const { openedEmployee } = useUser();

  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Typography variant="h6">Leaves</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Container>
          <Typography variant="subtitle1" display="inline" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Paid Leave Days Left:
          </Typography>
          &nbsp;
          <Typography variant="body1" display="inline">
            {openedEmployee?.leaveDaysLeft}
          </Typography>
        </Container>
        <Container sx={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Button onClick={() => setIsNewLeaveModalOpen(true)} variant="contained" disabled={employeeLeft}>
            New Leave
          </Button>
        </Container>
        <NewLeaveModal isModalOpen={isNewLeaveModalOpen} closeModal={() => setIsNewLeaveModalOpen(false)} />
        <LeavesList />
      </AccordionDetails>
    </Accordion>
  );
};

export default LeavesAccordion;
