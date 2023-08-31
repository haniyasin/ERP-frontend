import React from "react";
import { toast } from "react-toastify";
import { useFinance } from "../../hooks/contextHooks";
import { useHttp } from "../../hooks/useHttp";
import ModalBox from "../../common/ModalBox";
import { Button, Stack, Typography } from "@mui/material";

interface DeleteFinanceModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const DeleteFinanceModal = ({
  isOpen,
  closeModal
}: DeleteFinanceModalProps) => {
  const { clickedFinance, deleteFinance } = useFinance();

  const onDelete = () => {
    deleteFinance(clickedFinance.invoiceNumber).then((res: any) => {
      if (res) {
        toast.success(res?.data?.message);
        closeModal();
      }
    });
  };

  return (
    <ModalBox open={isOpen} onClose={closeModal}>
      <Typography variant="h6">
        Are you sure you want to delete this finance?
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
export default DeleteFinanceModal;
