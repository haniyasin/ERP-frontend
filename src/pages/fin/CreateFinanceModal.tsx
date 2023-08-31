import React from "react";
import { Typography, Grid, Stack, Button } from "@mui/material";
import InputField from "../../common/InputField";
import ModalBox from "../../common/ModalBox";
import { useFinance } from "../../hooks/contextHooks";
import Form from "../../common/Form";
import { Finance } from "../../interfaces/Finance";
import { createFinanceSchema } from "./form schemas/createFinanceSchema";

interface NewFinanceModalProps {
  closeNewFinanceModal: () => void;
  isNewFinanceModalOpen: boolean;
}

const NewFinanceModal = ({
  closeNewFinanceModal,
  isNewFinanceModalOpen
}: NewFinanceModalProps) => {
  const { createInvoice } = useFinance();

  const onSubmit = (data: Finance) => {
    createInvoice(data).then((res: boolean) => {
      if (res) {
        closeNewFinanceModal();
      }
    });
  };

  return (
    <>
      <ModalBox
        open={isNewFinanceModalOpen}
        onClose={closeNewFinanceModal}
        width={600}
      >
        <Typography variant="h6" textAlign="center" marginBottom={2}>
          Add new Invoice
        </Typography>
        <Form onSubmit={onSubmit} validationSchema={createFinanceSchema}>
          <Grid container direction="row" spacing={2} justifyContent="center">
            <Grid
              item
              container
              direction="column"
              lg={6}
              alignContent="flex-end"
            >
              <Stack direction="column" spacing={0} width={"85%"}>
                <InputField
                  name="invoiceNumber"
                  label="Invoice number"
                  type="number"
                  // defaultValue={0}
                />
                <InputField name="createdAt" label="Created at" />
                <InputField name="paymentType" label="Payment type" />
                <InputField name="category" label="Category" />
                <InputField name="subcategory" label="Subcategory" />
                <InputField name="client" label="Client" />
                <InputField name="notes" label="Notes" />
              </Stack>
            </Grid>
            <Grid
              item
              container
              direction="column"
              xs={6}
              alignContent="flex-start"
            >
              <Stack direction="column" spacing={0} width={"85%"}>
                <InputField name="currency" label="Currency" />
                <InputField
                  name="amountWithVat"
                  label="Amount"
                  // size='small'
                />
                <InputField
                  name="amountWithoutVat"
                  label="Amount without vat"
                />
                <InputField name="vat" label="Vat percentage" />
                <InputField name="dueDate" label="Due date" />
                <InputField name="paymentMadeOn" label="Payment made on" />
                <InputField name="paymentMethod" label="Payment Method" />
              </Stack>
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
            <Button type="submit" variant="contained">
              Create
            </Button>
            <Button onClick={closeNewFinanceModal} variant="contained">
              Cancel
            </Button>
          </Stack>
        </Form>
      </ModalBox>
    </>
  );
};

export default NewFinanceModal;
