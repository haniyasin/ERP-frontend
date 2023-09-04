import React from "react";
import ModalBox from "../../../common/ModalBox";
import { useHttp } from "../../../hooks/useHttp";
import { toast } from "react-toastify";
import { Button, Stack, Typography } from "@mui/material";
import { useCompany } from "../../../hooks/contextHooks";

interface DeleteCompanyModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const DeleteCompanyModal = ({
  isOpen,
  closeModal
}: DeleteCompanyModalProps) => {
  const { del } = useHttp();
  const { clickedCompany, handleCompanyDashboardClose, getCompanies } =
    useCompany();

  const deleteCompany = (name: string) => {
    del("/companies", { data: { name } }).then((res) => {
      if (res) {
        getCompanies();
        toast.success("Company deleted successfully!");
        handleCompanyDashboardClose();
        closeModal();
      }
    });
  };

  return (
    <ModalBox open={isOpen} onClose={closeModal}>
      <Typography variant="h6">
        Are you sure you want to delete this company?
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
        <Button
          onClick={() => deleteCompany(clickedCompany.name)}
          variant="contained"
        >
          Yes
        </Button>
        <Button onClick={closeModal} variant="contained">
          No
        </Button>
      </Stack>
    </ModalBox>
  );
};

export default DeleteCompanyModal;
