import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NewBonusModal from './NewBonusModal';
import BonusesList from './BonusesList';

interface BonusesAccordionProps {
  employeeLeft: boolean,
}

const BonusesAccordion = ({ employeeLeft }: BonusesAccordionProps) => {
  const [isNewBonusModalOpen, setIsNewBonusModalOpen] = useState<boolean>(false);

  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Typography variant="h6">Bonuses</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Container sx={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <Button onClick={() => setIsNewBonusModalOpen(true)} variant="contained" sx={{ marginTop: '1rem' }} disabled={employeeLeft}>
            New Bonus
          </Button>
        </Container>
        <NewBonusModal isModalOpen={isNewBonusModalOpen} closeModal={() => setIsNewBonusModalOpen(false)} />
        <BonusesList />
      </AccordionDetails>
    </Accordion>
  );
};

export default BonusesAccordion;
