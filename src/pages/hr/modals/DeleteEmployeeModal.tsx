import React, { useState } from "react";
import ModalBox from "../../../common/ModalBox";
import {
  Button,
  Stack,
  Typography,
  FormControl,
  SelectChangeEvent
} from "@mui/material";
import { useUser } from "../../../hooks/contextHooks";
import { toast } from "react-toastify";
import SelectField from "../../../common/SelectField";
import Form from "../../../common/Form";
import { deleteEmployeeSchema } from "../form schemas/deleteEmployeeSchema";
import InputField from "../../../common/InputField";

interface DeleteEmployeeModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const DeleteEmployeeModal = ({
  isOpen,
  closeModal
}: DeleteEmployeeModalProps) => {
  const { openedEmployee, deleteEmployee } = useUser();
  const [reason, setReason] = useState<string>("1");
  const [document, setDocument] = useState<File | null>(null);

  const handleReasonChange = (event: SelectChangeEvent<string>) => {
    setReason(event.target.value);
  };

  const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setDocument(event.target.files[0]);
  };

  const handleDeleteEmployee = () => {
    if (reason === "1") return toast.error("Please select a valid reason");
    if (reason === "3" && !document)
      return toast.error("Document for leaving employee must be uploaded!");

    deleteEmployee({ email: openedEmployee.email, reason, document }).then(
      (res: any) => {
        if (res) {
          toast.success("Successfully deleted Employee");
          closeModal();
        }
      }
    );
  };

  const reasons = [
    { name: "Please Select a Reason", id: "1" },
    { name: "Mistakenly created employee", id: "2" },
    { name: "Employee left the company", id: "3" }
  ];

  return (
    <ModalBox open={isOpen} onClose={closeModal}>
      <Typography variant="h6" textAlign="center">
        Are you sure you want to delete this user?
      </Typography>
      <Form
        onSubmit={handleDeleteEmployee}
        validationSchema={deleteEmployeeSchema}
      >
        <FormControl fullWidth>
          <SelectField
            name="reason"
            label="Reason for Delete"
            defaultValue={"1"}
            onChange={(e) => handleReasonChange(e)}
            value={reason}
            arrayData={reasons}
          />
        </FormControl>
        {reason === "3" && (
          <InputField
            name="document"
            label=""
            type="file"
            accept=".pdf,.doc,.docx,.txt,.csv,.zip"
            variant="standard"
            onChange={handleDocumentChange}
            required
          />
        )}
        <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
          <Button type="submit" variant="contained">
            Yes
          </Button>
          <Button onClick={closeModal} variant="contained">
            No
          </Button>
        </Stack>
      </Form>
    </ModalBox>
  );
};

export default DeleteEmployeeModal;
