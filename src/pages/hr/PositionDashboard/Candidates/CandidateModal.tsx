import React from "react";
import { Button, Typography, Grid, Stack } from "@mui/material";
import InputField from "../../../../common/InputField";
import { useCandidate } from "../../../../hooks/contextHooks";
import Form from "../../../../common/Form";
import { Candidate } from "../../../../interfaces/Candidate";
import { candidateSchema } from "./CandidateSchema";
import ModalBox from "../../../../common/ModalBox";

interface CandidateModalProps {
  closeCandidateModal: () => void;
  isCandidateModalOpen: boolean;
}

const CandidateModal = ({
  closeCandidateModal,
  isCandidateModalOpen
}: CandidateModalProps) => {
  const { clickedCandidate, editCandidate } = useCandidate();

  const handleSubmit = (candidateData: Candidate) => {
    candidateData.id = clickedCandidate.id;
    editCandidate(candidateData);
  };

  return (
    <>
      <ModalBox
        open={isCandidateModalOpen}
        onClose={closeCandidateModal}
        width={600}
      >
        <Typography variant="h6" textAlign="center" marginBottom={2}>
          Candidate Information
        </Typography>
        <Form onSubmit={handleSubmit} validationSchema={candidateSchema}>
          <Grid container direction="row" spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Stack direction="column" spacing={2} alignItems="center">
                <InputField
                  name="name"
                  label="Name"
                  defaultValue={clickedCandidate?.name}
                />
                <InputField
                  name="appliedOn"
                  label="Applied On"
                  defaultValue={clickedCandidate?.appliedOn}
                />
                <InputField
                  name="acceptedOn"
                  label="Accepted On"
                  defaultValue={clickedCandidate?.acceptedOn}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack direction="column" spacing={2} alignItems="center">
                <InputField
                  name="status"
                  label="Status"
                  defaultValue={clickedCandidate?.status}
                />
                <InputField
                  name="cv"
                  label="CV"
                  defaultValue={clickedCandidate?.cv}
                  type="file"
                  variant="standard"
                  width="77%"
                />
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                  mt={3}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: "105px" }}
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={closeCandidateModal}
                    variant="contained"
                    sx={{ width: "105px" }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </ModalBox>
    </>
  );
};

export default CandidateModal;
