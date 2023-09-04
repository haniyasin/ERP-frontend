import React, { useState } from "react";
import ModalBox from "../../../common/ModalBox";
import { Button, Grid, Stack, Typography } from "@mui/material";
import Form from "../../../common/Form";
import { useClient, useInvoice } from "../../../hooks/contextHooks";
import DeleteInvoiceModal from "./DeleteInvoiceModal";
import { ToastContainer } from "react-toastify";
import { editInvoiceSchema } from "../form schemas/editInvoiceSchema";
import InputField from "../../../common/InputField";
import SelectField from "../../../common/SelectField";
import {
  invoiceCurrencies,
  invoicePaymentTypes
} from "../../../utils/constants";
import { Invoice } from "../../../interfaces/Invoice";

interface NewInvoiceModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const InvoiceModal = ({ isOpen, closeModal }: NewInvoiceModalProps) => {
  const [isDeleteInvoiceClicked, setIsDeleteInvoiceClicked] =
    useState<boolean>(false);

  const [isEditInvoiceClicked, setIsEditInvoiceClicked] =
    useState<boolean>(false);

  const { clickedInvoice, handleInvoiceModalClose, editInvoice } = useInvoice();
  const { clients, getClients, isLoading } = useClient();

  const onSubmit = (data: Invoice) => {
    if (data.paymentMadeOn === "") data.paymentMadeOn = null;
    editInvoice(data).then((res: boolean) => {
      if (res) {
        setIsEditInvoiceClicked(false);
      }
    });
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <DeleteInvoiceModal
        isOpen={isDeleteInvoiceClicked}
        closeModal={() => setIsDeleteInvoiceClicked(false)}
      />
      <ModalBox open={isOpen} onClose={closeModal} width={800}>
        <Typography variant="h6" textAlign="center" marginBottom={2}>
          Invoice information
        </Typography>
        <Stack direction="row" justifyContent="center" spacing={2} mb={3}>
          <Button
            onClick={() => setIsEditInvoiceClicked((prev) => !prev)}
            variant="contained"
          >
            Edit
          </Button>
          <Button
            onClick={() => setIsDeleteInvoiceClicked(true)}
            variant="contained"
          >
            Delete
          </Button>
        </Stack>
        <Form onSubmit={onSubmit} validationSchema={editInvoiceSchema}>
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
                  defaultValue={clickedInvoice.invoiceNumber}
                  readOnly={!isEditInvoiceClicked}
                />
                <InputField
                  name="createdAt"
                  label="Created at"
                  type="date"
                  defaultValue={clickedInvoice.createdAt}
                  readOnly={!isEditInvoiceClicked}
                />
                <SelectField
                  name="paymentType"
                  label="Payment type"
                  arrayData={invoicePaymentTypes}
                  defaultValue={clickedInvoice.paymentType}
                  readOnly={!isEditInvoiceClicked}
                />
                <InputField
                  name="category"
                  label="Category"
                  defaultValue={clickedInvoice.category}
                  readOnly={!isEditInvoiceClicked}
                />
                <SelectField
                  name="client"
                  label="Client"
                  arrayData={clients}
                  getArrayData={getClients}
                  defaultValue={clickedInvoice.client.id}
                  isLoading={isLoading}
                  readOnly={!isEditInvoiceClicked}
                />
                <InputField
                  name="notes"
                  label="Notes"
                  defaultValue={clickedInvoice.notes}
                  readOnly={!isEditInvoiceClicked}
                />
                <SelectField
                  name="currency"
                  label="Currency"
                  arrayData={invoiceCurrencies}
                  defaultValue={clickedInvoice.currency}
                  readOnly={!isEditInvoiceClicked}
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
                <InputField
                  name="amountWithVat"
                  label="Amount"
                  type="number"
                  defaultValue={clickedInvoice.amountWithVat}
                  readOnly={!isEditInvoiceClicked}
                />
                <InputField
                  name="amountWithoutVat"
                  label="Amount without vat"
                  type="number"
                  defaultValue={clickedInvoice.amountWithoutVat}
                  readOnly={!isEditInvoiceClicked}
                />
                <InputField
                  name="vat"
                  label="Vat percentage"
                  type="number"
                  defaultValue={clickedInvoice.vat}
                  readOnly={!isEditInvoiceClicked}
                />
                <InputField
                  name="dueDate"
                  label="Due date"
                  type="date"
                  defaultValue={clickedInvoice.dueDate}
                  readOnly={!isEditInvoiceClicked}
                />
                <InputField
                  name="paymentMadeOn"
                  label="Payment made on"
                  type="date"
                  defaultValue={clickedInvoice.paymentMadeOn}
                  readOnly={!isEditInvoiceClicked}
                />
                <SelectField
                  name="paymentMethod"
                  label="Payment Method"
                  arrayData={["Cash", "Bank"]}
                  defaultValue={clickedInvoice.paymentMethod}
                  readOnly={!isEditInvoiceClicked}
                />
              </Stack>
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
            <Button onClick={handleInvoiceModalClose} variant="contained">
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!isEditInvoiceClicked}
            >
              Submit
            </Button>
          </Stack>
        </Form>
      </ModalBox>
    </>
  );
};

export default InvoiceModal;
