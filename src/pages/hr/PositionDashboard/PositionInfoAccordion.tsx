import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Stack, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Form from '../../../common/Form'
import InputFields from "../../../common/InputField";
import { usePosition } from "../../../hooks/contextHooks";
import { Position } from "../../../interfaces/Position";
import { createPositionSchema } from "./createPositionSchema";

interface PositionInfoAccordion{
    isEditPostionClicked: boolean,
    handleEditPositionClose: () => void,
}

const PositionInfoAccordion = ({ isEditPostionClicked, handleEditPositionClose}: PositionInfoAccordion) => {
    const { clickedPosition, editPosition } = usePosition();

    const onSubmit = (positionData: Position) => {
        editPosition(positionData)
        .then((res: boolean) => {
          if(res) {
            handleEditPositionClose();
          }
        })
    };
    
    return (
        <Accordion elevation={0} defaultExpanded={false}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Basic Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Form onSubmit={onSubmit} validationSchema={createPositionSchema}>
                <Grid item container direction="column" lg={4} alignContent="flex-end">
                    <Stack direction="column" spacing={0} width={"80%"}>
                      <InputFields
                        name="name"
                        label="Name"
                        defaultValue={clickedPosition?.name}
                        readOnly={!isEditPostionClicked}
                      />
                      <InputFields
                        name="project"
                        label="Project"
                        defaultValue={clickedPosition?.project}
                        readOnly={!isEditPostionClicked}
                      />
                      <InputFields
                        name="description"
                        label="Description"
                        defaultValue={clickedPosition?.description}
                        readOnly={!isEditPostionClicked}
                      />
                    </Stack>
                  </Grid>
                  <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
                    <Button type="submit" variant='contained' disabled={!isEditPostionClicked}>Submit</Button>
                  </Stack>
                </Form>
            </AccordionDetails>
        </Accordion>
    )
}

export default PositionInfoAccordion