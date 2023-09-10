import React from "react";
import { Typography, Grid, Stack, Button } from "@mui/material";
import InputField from "../../../common/InputField";
import ModalBox from "../../../common/ModalBox";
import { useClient, useInvoice } from "../../../hooks/contextHooks";
import Form from "../../../common/Form";
import { Invoice } from "../../../interfaces/Invoice";
import { createInvoiceSchema } from "../form-schemas/createInvoiceSchema";
import SelectField from "../../../common/SelectField";
import {
  invoiceCurrencies,
  invoicePaymentTypes
} from "../../../utils/constants";

interface NewInvoiceModalProps {
  closeNewInvoiceModal: () => void;
  isNewInvoiceModalOpen: boolean;
}

const NewInvoiceModal = ({
  closeNewInvoiceModal,
  isNewInvoiceModalOpen
}: NewInvoiceModalProps) => {
  const { createInvoice } = useInvoice();
  const { clients, getClients, isLoading } = useClient();

  const onSubmit = (data: Invoice) => {
    if (data.paymentMadeOn === "") data.paymentMadeOn = null;
    createInvoice(data).then((res: boolean) => {
      if (res) {
        closeNewInvoiceModal();
      }
    });
  };

  return (
    <>
      <ModalBox
        open={isNewInvoiceModalOpen}
        onClose={closeNewInvoiceModal}
        width={600}
      >
        <Typography variant="h6" textAlign="center" marginBottom={2}>
          Add new Invoice
        </Typography>
        <Form onSubmit={onSubmit} validationSchema={createInvoiceSchema}>
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
                <InputField
                  name="createdAt"
                  label="Created at"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <SelectField
                  name="paymentType"
                  label="Payment type"
                  arrayData={invoicePaymentTypes}
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
                <SelectField
                  name="currency"
                  label="Currency"
                  arrayData={invoiceCurrencies}
                  defaultValue="BGN"
                />
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
                <InputField name="amountWithVat" label="Amount" type="number" />
                <InputField
                  name="amountWithoutVat"
                  label="Amount without vat"
                  type="number"
                />
                <InputField name="vat" label="Vat percentage" type="number" />
                <InputField
                  name="dueDate"
                  label="Due date"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <InputField
                  name="paymentMadeOn"
                  label="Payment made on"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
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
            <Button onClick={closeNewInvoiceModal} variant="contained">
              Cancel
            </Button>
          </Stack>
        </Form>
      </ModalBox>
    </>
  );
};

export default NewInvoiceModal;
