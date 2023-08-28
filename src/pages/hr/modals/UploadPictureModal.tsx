import React from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useUser } from "../../../hooks/contextHooks";
import Form from "../../../common/Form";
import { uploadPictureSchema } from "../form schemas/uploadPictureSchema";
import InputField from "../../../common/InputField";
import ModalBox from "../../../common/ModalBox";

interface UploadPictureModalProps {
  open: boolean;
  onClose: () => void;
}

const UploadPictureModal = ({ open, onClose }: UploadPictureModalProps) => {
  const { changeUserPicture, openedEmployee, handleEmployeeDashboardOpen } =
    useUser();

  const handleUpload = (data: any) => {
    changeUserPicture({ picture: data.picture[0] }).then((res: any) => {
      if (res) {
        handleEmployeeDashboardOpen({
          ...openedEmployee,
          picture: res.data.picture
        });
        onClose();
      }
    });
  };

  return (
    <ModalBox open={open} onClose={onClose} width={300}>
      <Typography variant="h6" textAlign="center">
        Upload Profile Picture
      </Typography>
      <Form onSubmit={handleUpload} validationSchema={uploadPictureSchema}>
        <Grid container direction="row" spacing={0}>
          <Stack justifyContent="center" alignItems="center" spacing={2} m={1}>
            <InputField
              name="picture"
              label=""
              type="file"
              id="profile-picture"
              variant="standard"
            />
            <Stack direction="row" spacing={1}>
              <Button type="submit" variant="contained" color="primary">
                Upload
              </Button>
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Form>
    </ModalBox>
  );
};

export default UploadPictureModal;
