import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { User } from "../../../interfaces/User";
import BonusesList from "../BonusesList";

interface BonusesAccordionProps {
  user: User;
}

const BonusesAccordion = ({ user }: BonusesAccordionProps) => {
  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Typography variant="h6">Bonuses</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <BonusesList user={user} />
      </AccordionDetails>
    </Accordion>
  );
};

export default BonusesAccordion;
