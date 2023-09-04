import React, { useState } from "react";
import { useCompany } from "../../../hooks/contextHooks";
import { Company } from "../../../interfaces/Company";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LoadingComponent from "../../../common/LoadingComponent";
import InputField from "../../../common/InputField";
import Form from "../../../common/Form";
import { createCompanySchema } from "../form schemas/createCompanySchema";

const BasicInfoAccordion = () => {
  const [isEditCompanyClicked, setIsEditCompanyClicked] =
    useState<boolean>(false);

  const { clickedCompany, editCompany } = useCompany();

  if (!clickedCompany || clickedCompany === null) return <LoadingComponent />;

  const onSubmit = (data: Company) => {
    const inputData = { data };
    editCompany(inputData).then((res: boolean) => {
      if (res) {
        setIsEditCompanyClicked(false);
      }
    });
  };

  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Basic Information</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Form onSubmit={onSubmit} validationSchema={createCompanySchema}>
          <Grid container direction="row" spacing={1} marginLeft={6}>
            <Grid
              item
              container
              direction="column"
              lg={5}
              alignContent="flex-end"
            >
              <Stack direction="column" spacing={0} width={"60%"}>
                <InputField
                  name="name"
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
              </Stack>
            </Grid>
            <Grid
              item
              container
              direction="column"
              lg={5}
              alignContent="flex-start"
            >
              <Stack direction="column" spacing={0} width={"60%"}>
                <InputField
                  name="description"
                  label="Description"
                  defaultValue={clickedCompany.description}
                  readOnly={!isEditCompanyClicked}
                />
                <InputField
                  name="employeeSize"
                  label="Employee Size"
                  defaultValue={clickedCompany.employeeSize}
                  readOnly={!isEditCompanyClicked}
                />
              </Stack>
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
            <Button
              onClick={() => setIsEditCompanyClicked((prev) => !prev)}
              variant="contained"
            >
              Edit
            </Button>
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
