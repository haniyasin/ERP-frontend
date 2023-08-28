import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import EmployeeDocumentList from "./EmployeeDocumentList";
import NewEmployeeDocumentModal from "./NewEmployeeDocumentModal";

interface RelatedDocumentsAccordionProps {
  employeeLeft: boolean;
}

const RelatedDocumentsAccordion = ({
  employeeLeft
}: RelatedDocumentsAccordionProps) => {
  const [isNewEmployeeDocumentModalOpen, setIsNewEmployeeDocumentModalOpen] =
    useState<boolean>(false);

  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Typography variant="h6">Related Documents</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack
          direction="column"
          alignItems="center"
          spacing={2}
          sx={{ width: "100%" }}
        >
          <Button
            onClick={() => setIsNewEmployeeDocumentModalOpen(true)}
            variant="contained"
            disabled={employeeLeft}
          >
            New Document
          </Button>
          <NewEmployeeDocumentModal
            isModalOpen={isNewEmployeeDocumentModalOpen}
            closeModal={() => setIsNewEmployeeDocumentModalOpen(false)}
          />
          <EmployeeDocumentList />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default RelatedDocumentsAccordion;
