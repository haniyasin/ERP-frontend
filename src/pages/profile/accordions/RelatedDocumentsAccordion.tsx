import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { User } from "../../../interfaces/User";
import RelatedDocumentsList from "../RelatedDocumentsList";

interface RelatedDocumentsAccordionProps {
  user: User;
}

const RelatedDocumentsAccordion = ({
  user
}: RelatedDocumentsAccordionProps) => {
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
          <RelatedDocumentsList user={user} />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default RelatedDocumentsAccordion;
