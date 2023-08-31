import React, { useState } from "react";
import ModalBox from "../../common/ModalBox";
import { Button, Grid, Stack, Typography } from "@mui/material";
import Form from "../../common/Form";
import { useFinance, useUser } from "../../hooks/contextHooks";
import DeleteFinanceModal from "./DeleteFinanceModal";
import { ToastContainer } from "react-toastify";

interface NewFinanceModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const FinanceModal = ({ isOpen, closeModal }: NewFinanceModalProps) => {
  const [isDeleteFinanceClicked, setIsDeleteFinanceClicked] =
    useState<boolean>(false);

  const { clickedFinance, handleFinanceModalClose } = useFinance();

  return (
    <>
      <ToastContainer position="top-center" />
      <DeleteFinanceModal
        isOpen={isDeleteFinanceClicked}
        closeModal={() => setIsDeleteFinanceClicked(false)}
      />
      <ModalBox open={isOpen} onClose={closeModal} width={800}>
        <Typography variant="h6" textAlign="center" marginBottom={2}>
          Finances information
        </Typography>
        <Stack direction="row" justifyContent="center" spacing={2} mb={3}>
          <Button onClick={() => alert("Edit Invoice")} variant="contained">
            Edit Finance
          </Button>
          <Button
            onClick={() => setIsDeleteFinanceClicked(true)}
            variant="contained"
          >
            Delete
          </Button>
        </Stack>
        <Grid container direction="row" justifyContent="center">
          <Grid
            item
            container
            direction="column"
            lg={6}
            alignContent="flex-end"
          >
            <Stack direction="column" spacing={0} width={"75%"}>
              <Typography variant="h6">
                Invoice Number: {clickedFinance.invoiceNumber}
              </Typography>
              <Typography variant="h6">
                Amount: {clickedFinance.amountWithVat}
              </Typography>
              <Typography variant="h6">
                Payment Type: {clickedFinance.paymentType}
              </Typography>
              <Typography variant="h6">
                Payment Made On: {clickedFinance.paymentMadeOn}
              </Typography>
              <Typography variant="h6">
                Created At: {clickedFinance.createdAt}
              </Typography>
              <Typography variant="h6">
                Category: {clickedFinance.category}
              </Typography>
              <Typography variant="h6">
                Subcategory: {clickedFinance.subcategory}
              </Typography>
            </Stack>
          </Grid>
          <Grid
            item
            container
            direction="column"
            lg={6}
            alignContent="flex-end"
          >
            <Stack direction="column" spacing={0} width={"75%"}>
              <Typography variant="h6">
                Client: {clickedFinance.client}
              </Typography>
              <Typography variant="h6">
                Notes: {clickedFinance.notes}
              </Typography>
              <Typography variant="h6">
                Currency: {clickedFinance.currency}
              </Typography>
              <Typography variant="h6">
                Amount Without Vat: {clickedFinance.amountWithoutVat}
              </Typography>
              <Typography variant="h6">Vat: {clickedFinance.vat}</Typography>
              <Typography variant="h6">
                Due Date: {clickedFinance.dueDate}
              </Typography>
              <Typography variant="h6">
                Payment Method: {clickedFinance.paymentMethod}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
          <Button onClick={handleFinanceModalClose} variant="contained">
            Close
          </Button>
        </Stack>
      </ModalBox>
    </>
  );
};

export default FinanceModal;
