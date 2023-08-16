import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import EmployeeList from './EmployeeList';
import { useUser } from '../../hooks/contextHooks';
import { ToastContainer } from 'react-toastify';
import NewEmployeeModal from './modals/NewEmployeeModal';

const HR = () => {
    const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] = useState<boolean>(false);
    const { getEmployees } = useUser();

    useEffect(() => {
        getEmployees();
    },[]) // eslint-disable-line

    return (
        <Container>
            <ToastContainer position='top-center'/>
            <Typography variant='h4' textAlign="center" margin={5}>Human Resources</Typography>
            <Typography variant='h5' textAlign="center" margin={4}>Employees</Typography>
            <Box display="flex" justifyContent="center" marginBottom={3}>
                <Button onClick={() => setIsNewEmployeeModalOpen(true)} variant='contained'>New Employee</Button>
            </Box>
            <EmployeeList />
            {isNewEmployeeModalOpen && <NewEmployeeModal closeNewEmployeeModal={() => setIsNewEmployeeModalOpen(false)} isNewEmployeeModalOpen={isNewEmployeeModalOpen}/>}
        </Container>
    )
}

export default HR;