import React, { useState } from "react";
import { useCompany, useProject } from "../../../../hooks/contextHooks";
import { Project } from "../../../../interfaces/Project";
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
import LoadingComponent from "../../../../common/LoadingComponent";
import InputField from "../../../../common/InputField";
import Form from "../../../../common/Form";
import { createProjectSchema } from "../form-schemas/createProjectSchema";
import SelectField from "../../../../common/SelectField";

const BasicInfoAccordion = () => {
  const [isEditProjectClicked, setIsEditProjectClicked] =
    useState<boolean>(false);

  const { openedProject, editProject } = useProject();
  const { companies, getCompanies, isLoading } = useCompany();

  if (!openedProject || openedProject === null) return <LoadingComponent />;

  const onSubmit = (data: Project) => {
    const inputData = { data };
    editProject(inputData).then((res: boolean) => {
      if (res) {
        setIsEditProjectClicked(false);
      }
    });
  };

  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Basic Information</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Form onSubmit={onSubmit} validationSchema={createProjectSchema}>
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
                  label="Project Name"
                  defaultValue={openedProject.name}
                  readOnly={!isEditProjectClicked}
                />
                <SelectField
                  name="company"
                  label="Company"
                  defaultValue={openedProject.company.id}
                  arrayData={companies}
                  getArrayData={getCompanies}
                  isLoading={isLoading}
                  readOnly={!isEditProjectClicked}
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
                  defaultValue={openedProject.description}
                  readOnly={!isEditProjectClicked}
                />
                <InputField
                  name="openPositions"
                  label="Open Positions"
                  defaultValue={openedProject.openPositions}
                  readOnly
                />
              </Stack>
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
            <Button
              onClick={() => setIsEditProjectClicked((prev) => !prev)}
              variant="contained"
            >
              Edit
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!isEditProjectClicked}
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
