import React, { ReactElement } from 'react';
import { Box, BoxProps, Modal } from '@mui/material';

interface ModalBoxProps extends BoxProps {
  open: boolean;
  onClose: () => void;
  children?: ReactElement | ReactElement[];
  top?: string;
  left?: string;
  width?: number;
  transform?: string,
  bgcolor?: string,
}

const ModalBox = ({ open, onClose, children, top, left, width, transform, bgcolor, ...boxProps }: ModalBoxProps) => (
  <Modal
    open={open} 
    onClose={onClose}
    BackdropProps={{
      onClick: undefined,
    }}
    disableAutoFocus
  >
    <Box
      sx={{
        position: 'absolute',
        top: top || '40%',
        left: left || '50%',
        transform: transform || 'translate(-50%, -50%)',
        width: width || 300,
        bgcolor: bgcolor || 'background.paper',
        boxShadow: 24,
        p: 4,
      }}
      {...boxProps}
    >
      {children}
    </Box>
  </Modal>
);

export default ModalBox;
