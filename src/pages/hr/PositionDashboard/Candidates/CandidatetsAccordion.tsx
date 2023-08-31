import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import CandidatesList from "./CandidatesList";
import NewCandidateModal from "./NewCandidateModal";

const CandidatesAccordion = () => {
  const [isNewCandidateModalOpen, setIsNewCandidateModalOpen] =
    useState<boolean>(false);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Candidates</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Button
          variant="contained"
          onClick={() => setIsNewCandidateModalOpen(true)}
        >
          New Candidate
        </Button>
        <CandidatesList />
        {isNewCandidateModalOpen && (
          <NewCandidateModal
            isNewCandidateModalOpen={isNewCandidateModalOpen}
            closeNewCandidateModal={() => setIsNewCandidateModalOpen(false)}
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CandidatesAccordion;
