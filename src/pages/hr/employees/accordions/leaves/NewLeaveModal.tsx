import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useHttp } from "../../../../../hooks/useHttp";
import ModalBox from "../../../../../common/ModalBox";
import Form from "../../../../../common/Form";
import InputField from "../../../../../common/InputField";
import { createLeaveSchema } from "./createLeaveSchema";
import { Leave, leaves } from "../../../../../interfaces/Leave";
import { useUser } from "../../../../../hooks/contextHooks";
import SelectField from "../../../../../common/SelectField";
import { getLeaveDaysCount } from "../../../../../utils/getLeaveDaysCount";

interface NewLeaveModalProps {
  closeModal: () => void;
  isModalOpen: boolean;
}

const NewLeaveModal = ({ closeModal, isModalOpen }: NewLeaveModalProps) => {
  const { post } = useHttp();
  const { openedEmployee, handleEmployeeDashboardOpen } = useUser();
  const today = new Date().toISOString().split("T")[0];

  const onSubmit = (data: Leave) => {
    const dataWithUserID = {
      ...data,
      user: { id: openedEmployee.id },
      document: data.document[0]
    };
    post("/leaves", dataWithUserID, "multipart/form-data").then((res) => {
      if (res) {
        handleEmployeeDashboardOpen({
          ...openedEmployee,
          leaves: [...openedEmployee.leaves, res.data],
          leaveDaysLeft:
            res.data.type === "Paid"
              ? parseFloat(
                (
                  openedEmployee.leaveDaysLeft - getLeaveDaysCount(res.data)
                ).toFixed(2)
              )
              : openedEmployee.leaveDaysLeft
        });
        toast.success("Successfully created new Leave!");
        closeModal();
      }
    });
  };

  return (
    <ModalBox open={isModalOpen} onClose={closeModal} width={400}>
      <Typography variant="h6" textAlign="center" marginBottom={2}>
        New Leave
      </Typography>
      <Form onSubmit={onSubmit} validationSchema={createLeaveSchema}>
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Grid item container direction="column" lg={6}>
            <Stack direction="column" spacing={0}>
              <InputField
                name="startDate"
                label="Start Date"
                type="date"
                defaultValue={today}
              />
              <SelectField
                name="type"
                label="Leave Type"
                defaultValue={"Sick"}
                arrayData={leaves}
              />
            </Stack>
          </Grid>
          <Grid item container direction="column" lg={6}>
            <Stack direction="column" spacing={0}>
              <InputField
                name="endDate"
                label="End Date"
                type="date"
                defaultValue={today}
              />
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

export default NewLeaveModal;
