import { useState } from "react";
import { useCompany } from "../../../hooks/contextHooks";
import { Company } from "../../../interfaces/Company";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LoadingComponent from "../../../common/LoadingComponent";
import DescriptionField from "../../../common/DescriptionField"
import InputField from "../../../common/InputField";
import Form from "../../../common/Form";
import { createCompanySchema } from "../form schemas/createCompanySchema";
import { Textarea } from "@mui/joy";

interface BasicInfoAccordionProps {
  isEditCompanyClicked: boolean;
  handleEditCompanyClose: () => void;
}

const BasicInfoAccordion = ({
  isEditCompanyClicked,
  handleEditCompanyClose,
}: BasicInfoAccordionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { clickedCompany, editCompany } = useCompany();

  if (!clickedCompany || clickedCompany === null) return <LoadingComponent />;

  const onSubmit = (data: Company) => {
    if (!data.departments) return;
    const inputData = { data };
    editCompany(inputData).then((res: boolean) => {
      if (res) {
        handleEditCompanyClose();
      }
    });
  };

  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Basic Info</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Form validationSchema={createCompanySchema} onSubmit={onSubmit}>
        <Grid item container direction="column" lg={4} alignContent="flex-end">
          <Stack direction="column" spacing={0} width={"80%"}>
            <InputField
              name="companyName"
              label="Company Name"
              defaultValue={clickedCompany.name}
              readOnly={!isEditCompanyClicked}
            />
            <InputField
              name="contacts"
              label="Contacts"
              defaultValue={clickedCompany.contacts}
              readOnly={!isEditCompanyClicked}
            />
            <InputField
              name="employeeSize"
              label="Employee Size"
              defaultValue={clickedCompany.employeeSize}
              readOnly={!isEditCompanyClicked}
            />
            {/* <DescriptionField
            name="Description"
            id="document"
            // placeholder="Add company info here..."
            // defaultValue={clickedCompany.description}
            />
            <Textarea/> */}
          </Stack>
        </Grid>
        <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
          <Button
            type="submit"
            variant="contained"
            disabled={!isEditCompanyClicked}
          >
            Submit
          </Button>
        </Stack>
        </Form>
      </AccordionDetails>
    </Accordion>
  );
};

export default BasicInfoAccordion;
