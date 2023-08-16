import { Button, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Role } from '../../interfaces/Role';
import { useHttp } from '../../hooks/useHttp';
import { createRoleSchema } from './form schemas/createRoleSchema';
import Form from '../../common/Form';
import InputField from '../../common/InputField';
import ModalBox from '../../common/ModalBox';

interface NewRoleModalProps {
    closeNewRoleModal: () => void,
    isNewRoleModalOpen: boolean,
}

const NewRoleModal = ({ closeNewRoleModal, isNewRoleModalOpen }: NewRoleModalProps) => {
    const { post } = useHttp();

    const onSubmit = (inputData: Role) => {
        post("/roles/createRole", inputData)
            .then((res) => {
                if(res) {
                    toast.success("Successfully created new Role!");
                    closeNewRoleModal();
                }
            })
    };

    return (
    <>
        <ModalBox open={isNewRoleModalOpen} onClose={closeNewRoleModal}>
            <Typography variant="h6" textAlign="center" marginBottom={2}>Create new Role</Typography>
            <Form onSubmit={onSubmit} validationSchema={createRoleSchema}>
                <Grid container direction="row" justifyContent="center">
                    <Grid item container direction="column" lg={9}>
                        <Stack direction="column" spacing={0}>
                            <InputField
                                name="name"
                                label="Role Name"
                            />
                        </Stack>
                    </Grid>
                </Grid>
                <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
                    <Button type="submit" variant='contained'>Create</Button>
                    <Button onClick={closeNewRoleModal} variant='contained'>Cancel</Button>
                </Stack>
            </Form>
        </ModalBox>
    </>
)
}

export default NewRoleModal;