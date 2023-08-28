import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUser } from "../../../../hooks/contextHooks";
import SalariesList from "./SalariesList";
import NewSalaryModal from "./NewSalaryModal";
import { formatDateToLocaleTime } from "../../../../utils/formatDataToLocaleTime";

interface SalaryAccordionProps {
  employeeLeft: boolean;
}

const SalaryAccordion = ({ employeeLeft }: SalaryAccordionProps) => {
  const [isNewSalaryModalOpen, setIsNewSalaryModalOpen] =
    useState<boolean>(false);
  const { openedEmployee } = useUser();

  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Typography variant="h6">Salary</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {openedEmployee?.currentSalary && (
          <Container>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
            >
              Current Salary Details:
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: "0.5rem", fontWeight: "bold" }}
            >
              Net Salary: {openedEmployee?.currentSalary?.net} BGN
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: "0.5rem", fontWeight: "bold" }}
            >
              Gross Salary: {openedEmployee?.currentSalary?.gross} BGN
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Start Date:{" "}
              {formatDateToLocaleTime(openedEmployee.currentSalary.startDate)}
            </Typography>
          </Container>
        )}
        <Container sx={{ textAlign: "center", marginBottom: "0.5rem" }}>
          <Button
            onClick={() => setIsNewSalaryModalOpen(true)}
            variant="contained"
            sx={{ marginTop: "1rem" }}
            disabled={employeeLeft}
          >
            New Salary
          </Button>
        </Container>
        <NewSalaryModal
          isModalOpen={isNewSalaryModalOpen}
          closeModal={() => setIsNewSalaryModalOpen(false)}
        />
        <SalariesList />
      </AccordionDetails>
    </Accordion>
  );
};

export default SalaryAccordion;
