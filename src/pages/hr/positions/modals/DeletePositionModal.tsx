import React from "react";
import { toast } from "react-toastify";
import { Button, Stack, Typography } from "@mui/material";
import { usePosition } from "../../../../hooks/contextHooks";
import ModalBox from "../../../../common/ModalBox";
import { useNavigate } from "react-router-dom";

interface DeleteInvoiceModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const DeletePositionModal = ({
  isOpen,
  closeModal
}: DeleteInvoiceModalProps) => {
  const { deletePosition } = usePosition();
  const navigate = useNavigate();

  const onDelete = () => {
    deletePosition().then((res: any) => {
      if (res) {
        toast.success(res?.data?.message);
        closeModal();
        navigate("/hr");
      }
    });
  };

  return (
    <ModalBox open={isOpen} onClose={closeModal}>
      <Typography variant="h6">
        Are you sure you want to delete this position?
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
export default DeletePositionModal;
