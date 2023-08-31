import { CircularProgress } from "@mui/material";
import React from "react";
import {
  LoadingContainerModal,
  LoadingContainerNormal
} from "../styles/styled components/LoadingContainer";

interface LoadingComponentProps {
  modalStyle?: boolean;
}

const LoadingComponent = ({ modalStyle }: LoadingComponentProps) => {
  if (modalStyle) {
    return (
      <LoadingContainerModal maxWidth="sm">
        <CircularProgress sx={{ margin: 0 }} />
      </LoadingContainerModal>
    );
  }

  return (
    <LoadingContainerNormal maxWidth="sm">
      <CircularProgress />
    </LoadingContainerNormal>
  );
};

export default LoadingComponent;
