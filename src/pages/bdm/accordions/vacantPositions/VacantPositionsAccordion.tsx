import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import { useState } from "react"
import { boolean } from "yup"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface VacantPositionsAccordionProps {
    isEditCompanyClicked: boolean
}


const VacantPositionsAccordion = ({ isEditCompanyClicked }: VacantPositionsAccordionProps) => {
    const [isNewVacantPositionModalOpen, setisNewVacantPositionModalOpen] = useState<boolean>(false);
    // const [companies]


    return (
        <Accordion elevation={0} defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">VacantPositions</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {/* how to list all vacant positions */}
        </AccordionDetails>
      </Accordion>
    )
}