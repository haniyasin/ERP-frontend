import React, { useState } from "react";
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
import Form from "../../../common/Form";
import InputField from "../../../common/InputField";
import {
  useCompany,
  usePosition,
  useProject
} from "../../../hooks/contextHooks";
import { Position } from "../../../interfaces/Position";
import { createPositionSchema } from "../positions/form-schemas/createPositionSchema";
import SelectField from "../../../common/SelectField";

const PositionInfoAccordion = () => {
  const [isEditPositionClicked, setIsEditPositionClicked] =
    useState<boolean>(false);

  const { clickedPosition, editPosition } = usePosition();
  const { projects, getProjects, isLoading } = useProject();
  const {
    companies,
    getCompanies,
    isLoading: isCompaniesLoading
  } = useCompany();

  const onSubmit = (positionData: Position) => {
    editPosition({
      ...positionData,
      company: { id: positionData.company },
      project: { id: positionData.project }
    }).then((res: boolean) => {
      if (res) {
        setIsEditPositionClicked(false);
      }
    });
  };

  return (
    <Accordion elevation={0} defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Basic Information</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Form onSubmit={onSubmit} validationSchema={createPositionSchema}>
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
                  label="Name"
                  defaultValue={clickedPosition?.name}
                  readOnly={!isEditPositionClicked}
                />
                <SelectField
                  name="project"
                  label="Project"
                  defaultValue={clickedPosition?.project?.id}
                  arrayData={projects}
                  getArrayData={getProjects}
                  isLoading={isLoading}
                  readOnly={!isEditPositionClicked}
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
                  defaultValue={clickedPosition?.description}
                  readOnly={!isEditPositionClicked}
                />
                <SelectField
                  name="company"
                  label="Company"
                  defaultValue={clickedPosition?.company?.id}
                  arrayData={companies}
                  getArrayData={getCompanies}
                  isLoading={isCompaniesLoading}
                  readOnly={!isEditPositionClicked}
                />
              </Stack>
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
            <Button
              onClick={() => setIsEditPositionClicked((prev) => !prev)}
              variant="contained"
            >
              Edit
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!isEditPositionClicked}
            >
              Submit
            </Button>
          </Stack>
        </Form>
      </AccordionDetails>
    </Accordion>
  );
};

export default PositionInfoAccordion;
