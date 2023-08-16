import { CircularProgress, Container } from '@mui/material';
import React from 'react';

interface LoadingComponentProps {
  modalStyle?: boolean;
}

const LoadingComponent = ({ modalStyle }: LoadingComponentProps) => {
  if (modalStyle) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '6vh',
          margin: '0'
        }}
      >
        <CircularProgress sx={{margin: 0}}/>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="sm"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <CircularProgress />
    </Container>
  );
};

export default LoadingComponent;
