import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useHttp } from "../../../../../hooks/useHttp";
import ModalBox from "../../../../../common/ModalBox";
import Form from "../../../../../common/Form";
import InputField from "../../../../../common/InputField";
import { createBonusSchema } from "./createBonusSchema";
import { useUser } from "../../../../../hooks/contextHooks";
import { Bonus, bonuses } from "../../../../../interfaces/Bonus";
import SelectField from "../../../../../common/SelectField";

interface NewBonusModalProps {
  closeModal: () => void;
  isModalOpen: boolean;
}

const NewBonusModal = ({ closeModal, isModalOpen }: NewBonusModalProps) => {
  const { post } = useHttp();
  const { openedEmployee, handleEmployeeDashboardOpen } = useUser();
  const today = new Date().toISOString().split("T")[0];

  const onSubmit = (data: Bonus) => {
    const dataWithUserID = {
      ...data,
      user: { id: openedEmployee.id },
      document: data.document[0]
    };
    post("/bonuses", dataWithUserID, "multipart/form-data").then((res) => {
      if (res) {
        handleEmployeeDashboardOpen({
          ...openedEmployee,
          bonuses: [...openedEmployee.bonuses, res.data]
        });
        toast.success("Successfully created new Leave!");
        closeModal();
      }
    });
  };

  return (
    <ModalBox open={isModalOpen} onClose={closeModal} width={400}>
      <Typography variant="h6" textAlign="center" marginBottom={2}>
        New Bonus
      </Typography>
      <Form onSubmit={onSubmit} validationSchema={createBonusSchema}>
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Grid item container direction="column" lg={6}>
            <Stack direction="column" spacing={0}>
              <InputField
                name="date"
                label="Date"
                type="date"
                defaultValue={today}
              />
              <SelectField
                name="type"
                label="Bonus Type"
                defaultValue={"Performance"}
                arrayData={bonuses}
              />
            </Stack>
          </Grid>
          <Grid item container direction="column" lg={6}>
            <Stack direction="column" spacing={0}>
              <InputField name="amount" label="Bonus Amount" type="number" />
              <InputField
                name="document"
                label=""
                type="file"
                accept=".pdf,.doc,.docx,.txt,.csv,.zip"
                variant="standard"
              />
            </Stack>
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
          <Button type="submit" variant="contained">
            Create
          </Button>
          <Button onClick={closeModal} variant="contained">
            Cancel
          </Button>
        </Stack>
      </Form>
    </ModalBox>
  );
};

export default NewBonusModal;
