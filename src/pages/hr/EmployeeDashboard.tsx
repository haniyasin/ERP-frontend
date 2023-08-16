import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Stack, Typography} from '@mui/material';
import { useUser } from '../../hooks/contextHooks';
import DeleteEmployeeModal from './modals/DeleteEmployeeModal';
import BasicInfoAccordion from './accordions/BasicInfoAccordion';
import SalaryAccordion from './accordions/salaries/SalaryAccordion';
import { ToastContainer } from 'react-toastify';
import LeavesAccordion from './accordions/leaves/LeavesAccordion';
import RelatedDocumentsAccordion from './accordions/documents/RelatedDocumentsAccordion';
import BonusesAccordion from './accordions/bonuses/BonusesAccordion';
import LoadingComponent from '../../common/LoadingComponent';
import { useParams } from 'react-router-dom';
import ProjectsAccordion from './accordions/projects/ProjectsAccordion';
import { handleNotFound } from '../../routes/ErrorHandler';

const EmployeeDashboard = () => {
  const [isDeleteEmployeeClicked, setIsDeleteEmployeeClicked] = useState<boolean>(false);
  const[employeeExists, setEmployeeExists] = useState<boolean>(true);

  const { openedEmployee, handleEmployeeDashboardClose, getEmployeeById } = useUser();
  const { employeeId } = useParams();

  useEffect(() => {
    getEmployeeById(employeeId)
      .then((res: any) => {
        if(res.data === "") {
          setEmployeeExists(false);
        }
      })
      // eslint-disable-next-line
  },[])

  if(!employeeExists) return handleNotFound();

  if (!openedEmployee) 
    return <LoadingComponent />;

  return (
    <Container sx={{ marginTop: 8 }} className='employee-pic'>
      <ToastContainer position='top-center' />
      <DeleteEmployeeModal isOpen={isDeleteEmployeeClicked} closeModal={() => setIsDeleteEmployeeClicked(false)} />
      <Typography variant='h4' textAlign="center" marginBottom={4}>Employee information</Typography>
      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item container direction="column" lg={12}>
          <Stack direction="row" justifyContent="center" spacing={2} mb={3}>
            <Button onClick={handleEmployeeDashboardClose} variant='contained'>Back</Button>
            <Button onClick={() => setIsDeleteEmployeeClicked(true)} variant='contained' disabled={openedEmployee.hasLeft}>Delete</Button>
          </Stack>
          {openedEmployee?.hasLeft && (
              <Typography variant="h6" align="center" sx={{ color: 'red', fontWeight: 'bold', marginBottom: 3 }}>
                This employee is no longer with the company.
              </Typography>
          )}
          <BasicInfoAccordion employeeLeft={openedEmployee.hasLeft}/>
          <ProjectsAccordion employeeLeft={openedEmployee.hasLeft}/>
          <SalaryAccordion employeeLeft={openedEmployee.hasLeft}/>
          <BonusesAccordion employeeLeft={openedEmployee.hasLeft}/>
          <LeavesAccordion employeeLeft={openedEmployee.hasLeft}/>
          <RelatedDocumentsAccordion employeeLeft={openedEmployee.hasLeft}/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default EmployeeDashboard;
