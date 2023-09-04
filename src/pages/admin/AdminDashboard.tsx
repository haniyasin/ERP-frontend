import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import NewUserModal from "./NewUserModal";
import { ToastContainer } from "react-toastify";
import NewRoleModal from "./NewRoleModal";
import NewClientModal from "./NewClientModal";
import NewDepartmentModal from "./NewDepartmentModal";
import { MainTitle } from "../../styles/styled components/StyledTypographies";

const Admin = () => {
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState<boolean>(false);
  const [isNewRoleModalOpen, setIsNewRoleModalOpen] = useState<boolean>(false);
  const [isNewDepartmentModalOpen, setIsNewDepartmentModalOpen] =
    useState<boolean>(false);
  const [isNewClientModalOpen, setIsNewClientModalOpen] =
    useState<boolean>(false);

  return (
    <Container>
      <ToastContainer position="top-center" />
      <MainTitle variant="h4" style={{ margin: 30 }}>
        Admin Dashboard
      </MainTitle>
      <Stack direction="row" spacing={1} justifyContent="center">
        <Button onClick={() => setIsNewUserModalOpen(true)} variant="contained">
          New User
        </Button>
        <Button onClick={() => setIsNewRoleModalOpen(true)} variant="contained">
          New Role
        </Button>
        <Button
          onClick={() => setIsNewDepartmentModalOpen(true)}
          variant="contained"
        >
          New Department
        </Button>
        <Button
          onClick={() => setIsNewClientModalOpen(true)}
          variant="contained"
        >
          New Client
        </Button>
      </Stack>
      {isNewUserModalOpen && (
        <NewUserModal
          closeNewUserModal={() => setIsNewUserModalOpen(false)}
          isNewUserModalOpen={isNewUserModalOpen}
        />
      )}
      {isNewRoleModalOpen && (
        <NewRoleModal
          closeNewRoleModal={() => setIsNewRoleModalOpen(false)}
          isNewRoleModalOpen={isNewRoleModalOpen}
        />
      )}
      {isNewDepartmentModalOpen && (
        <NewDepartmentModal
          closeNewDepartmentModal={() => setIsNewDepartmentModalOpen(false)}
          isNewDepartmentModalOpen={isNewDepartmentModalOpen}
        />
      )}
      {isNewClientModalOpen && (
        <NewClientModal
          closeNewClientModal={() => setIsNewClientModalOpen(false)}
          isNewClientModalOpen={isNewClientModalOpen}
        />
      )}
    </Container>
  );
};

export default Admin;
