import { Button, Grid, Stack, Typography } from "@mui/material";
import ModalBox from "../../../../common/ModalBox";
import { useCandidate, usePosition } from "../../../../hooks/contextHooks";
import  Form from "../../../../common/Form";
import InputField from "../../../../common/InputField";
import { candidateSchema } from "./CandidateSchema";
import { Candidate } from "../../../../interfaces/Candidate";
import { useEffect } from "react";


interface NewCandidateModalProps {
    closeNewCandidateModal: () => void,
    isNewCandidateModalOpen: boolean,
}

const NewCandidateModal = ({ closeNewCandidateModal, isNewCandidateModalOpen }: NewCandidateModalProps) => {
    const { createCandidate, getCandidates } = useCandidate();
    const { clickedPosition } = usePosition();

    useEffect(() => {
        getCandidates();
    }, []);

    const onSubmit = (candidate: Candidate) => {
        candidate.position = clickedPosition;
        console.log(candidate);
        createCandidate(candidate)
            .then((res: boolean) => {
                if(res) {
                    closeNewCandidateModal();
                }
            })
    }

    return (
        <>
            <ModalBox open={isNewCandidateModalOpen} onClose={closeNewCandidateModal} width={600}>
                <Typography variant="h6" textAlign="center" marginBottom={2}>Candidate Information</Typography>
                <Form onSubmit={onSubmit} validationSchema={candidateSchema}>
                    <Grid container direction="row" spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={6}>
                            <Stack direction="column" spacing={2} alignItems="center">
                            <InputField name="name" label="Name" />
                            <InputField name="appliedOn" label="Applied On" />
                            <InputField name="acceptedOn" label="Accepted On" />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack direction="column" spacing={2} alignItems="center">
                            <InputField name="status" label="Status" />
                            <InputField name="cv" label="CV" type="file" variant="standard" width="77%"/>
                            <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
                                <Button type="submit" variant='contained' sx={{width: "105px"}}>Create</Button>
                                <Button onClick={closeNewCandidateModal} variant='contained' sx={{width: "105px"}}>Cancel</Button>
                            </Stack>
                            </Stack>
                        </Grid>
                    </Grid> 
                </Form>
            </ModalBox>
        </>
    )
}

export default NewCandidateModal;