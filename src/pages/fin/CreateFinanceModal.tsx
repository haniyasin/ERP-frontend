import React from "react";
import { Typography, Grid, Stack, Button } from "@mui/material";
import InputField from "../../common/InputField";
import ModalBox from "../../common/ModalBox";
import { useClient, useFinance } from "../../hooks/contextHooks";
import Form from "../../common/Form";
import { Finance } from "../../interfaces/Finance";
import { createFinanceSchema } from "./form schemas/createFinanceSchema";
import SelectField from "../../common/SelectField";

interface NewFinanceModalProps {
  closeNewFinanceModal: () => void;
  isNewFinanceModalOpen: boolean;
}

const NewFinanceModal = ({
  closeNewFinanceModal,
  isNewFinanceModalOpen
}: NewFinanceModalProps) => {
  const { createInvoice } = useFinance();
  const { clients, getClients, isLoading } = useClient();

  const onSubmit = (data: Finance) => {
    if (data.paymentMadeOn === "") data.paymentMadeOn = null;
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
                <InputField name="invoiceNumber" label="Invoice number" />
                <InputField name="createdAt" label="Created at" type="date" />
                <SelectField
                  name="paymentType"
                  label="Payment type"
                  arrayData={["Payable", "Receivable"]}
                  defaultValue="Payable"
                />
                <InputField name="category" label="Category" />
                <SelectField
                  name="client"
                  label="Client"
                  arrayData={clients}
                  getArrayData={getClients}
                  defaultValue={clients[0]?.id || ""}
                  isLoading={isLoading}
                />
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
                <SelectField
                  name="currency"
                  label="Currency"
                  arrayData={["BGN", "USD", "EUR"]}
                  defaultValue="BGN"
                />
                <InputField name="amountWithVat" label="Amount" type="number" />
                <InputField
                  name="amountWithoutVat"
                  label="Amount without vat"
                  type="number"
                />
                <InputField name="vat" label="Vat percentage" type="number" />
                <InputField name="dueDate" label="Due date" type="date" />
                <InputField
                  name="paymentMadeOn"
                  label="Payment made on"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
                <SelectField
                  name="paymentMethod"
                  label="Payment Method"
                  arrayData={["Cash", "Bank"]}
                  defaultValue="Bank"
                />
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
