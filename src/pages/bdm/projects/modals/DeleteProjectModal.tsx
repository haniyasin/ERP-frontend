import React from "react";
import ModalBox from "../../../../common/ModalBox";
import { toast } from "react-toastify";
import { Button, Stack, Typography } from "@mui/material";
import { useProject } from "../../../../hooks/contextHooks";

interface DeleteProjectModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const DeleteProjectModal = ({
  isOpen,
  closeModal
}: DeleteProjectModalProps) => {
  const { openedProject, deleteProject } = useProject();

  const handleDeleteProject = () => {
    deleteProject(openedProject.id).then((res: any) => {
      if (res) {
        closeModal();
        toast.success("Project deleted successfully!");
      }
    });
  };

  return (
    <ModalBox open={isOpen} onClose={closeModal}>
      <Typography variant="h6">
        Are you sure you want to delete this project?
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
        <Button onClick={handleDeleteProject} variant="contained">
          Yes
        </Button>
        <Button onClick={closeModal} variant="contained">
          No
        </Button>
      </Stack>
    </ModalBox>
  );
};

export default DeleteProjectModal;
