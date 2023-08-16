import { Button, Container, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import NewUserModal from './NewUserModal';
import { ToastContainer } from 'react-toastify';
import NewRoleModal from './NewRoleModal';

const Admin = () => {
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState<boolean>(false);
  const [isNewRoleModalOpen, setIsNewRoleModalOpen] = useState<boolean>(false);

  return (
    <Container>
        <ToastContainer
            position='top-center'
        />
        <Typography variant="h3" textAlign="center" margin={8}>Admin Dashboard</Typography>
        <Stack direction="row" spacing={1}>
          <Button onClick={() => setIsNewUserModalOpen(true)} variant='contained'>New User</Button>
          <Button onClick={() => setIsNewRoleModalOpen(true)} variant='contained'>New Role</Button>
        </Stack>
        {isNewUserModalOpen && <NewUserModal closeNewUserModal={() => setIsNewUserModalOpen(false)} isNewUserModalOpen={isNewUserModalOpen}/>}
        {isNewRoleModalOpen && <NewRoleModal closeNewRoleModal={() => setIsNewRoleModalOpen(false)} isNewRoleModalOpen={isNewRoleModalOpen}/>}
    </Container>
  )
}

export default Admin;