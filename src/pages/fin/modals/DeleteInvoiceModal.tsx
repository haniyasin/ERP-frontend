import React from "react";
import { toast } from "react-toastify";
import { useInvoice } from "../../../hooks/contextHooks";
import ModalBox from "../../../common/ModalBox";
import { Button, Stack, Typography } from "@mui/material";

interface DeleteInvoiceModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const DeleteInvoiceModal = ({
  isOpen,
  closeModal
}: DeleteInvoiceModalProps) => {
  const { clickedInvoice, deleteInvoice } = useInvoice();

  const onDelete = () => {
    deleteInvoice(clickedInvoice.invoiceNumber).then((res: any) => {
      if (res) {
        toast.success(res?.data?.message);
        closeModal();
      }
    });
  };

  return (
    <ModalBox open={isOpen} onClose={closeModal}>
      <Typography variant="h6">
        Are you sure you want to delete this invoice?
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
        <Button onClick={onDelete} variant="contained">
          Yes
        </Button>
        <Button onClick={closeModal} variant="contained">
          No
        </Button>
      </Stack>
    </ModalBox>
  );
};
export default DeleteInvoiceModal;
