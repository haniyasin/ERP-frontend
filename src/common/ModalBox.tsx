import React, { ReactElement } from "react";
import { BoxProps, Modal } from "@mui/material";
import { StyledModalBox } from "../styles/styled components/StyledModalBox";

interface ModalBoxProps extends BoxProps {
  open: boolean;
  onClose: () => void;
  children?: ReactElement | ReactElement[];
  top?: string;
  left?: string;
  width?: number;
  transform?: string;
  bgcolor?: string;
}

const ModalBox = ({
  open,
  onClose,
  children,
  top,
  left,
  width,
  transform,
  bgcolor,
  ...boxProps
}: ModalBoxProps) => (
  <Modal
    open={open}
    onClose={onClose}
    BackdropProps={{
      onClick: undefined
    }}
    disableAutoFocus
  >
    <StyledModalBox
      top={top}
      left={left}
      width={width}
      bgcolor={bgcolor}
      transform={transform}
      {...boxProps}
    >
      {children}
    </StyledModalBox>
  </Modal>
);

export default ModalBox;
