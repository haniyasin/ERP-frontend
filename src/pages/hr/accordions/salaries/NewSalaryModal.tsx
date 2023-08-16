import { Button, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useHttp } from '../../../../hooks/useHttp';
import ModalBox from '../../../../common/ModalBox';
import Form from '../../../../common/Form';
import InputField from '../../../../common/InputField';
import { createSalarySchema } from './createSalarySchema';
import { Leave } from '../../../../interfaces/Leave';
import { useUser } from '../../../../hooks/contextHooks';

interface NewSalaryModalProps {
    closeModal: () => void,
    isModalOpen: boolean,
}

const NewSalaryModal = ({ closeModal, isModalOpen }: NewSalaryModalProps) => {
    const { post } = useHttp();
    const { openedEmployee, handleEmployeeDashboardOpen } = useUser();
    const today = new Date().toISOString().split('T')[0];

    const onSubmit = (data: Leave) => {
      const dataWithUserID = {
        ...data,
        user: {id: openedEmployee.id},
        document: data.document[0],
      }
      console.log(data.document[0]);
      post("/salaries", dataWithUserID, 'multipart/form-data')
          .then((res) => {
              if(res) {
                handleEmployeeDashboardOpen({
                  ...openedEmployee,
                  salaries: [...openedEmployee.salaries, res.data],
                  currentSalary: res.data,
                });
                toast.success("Successfully created new Salary!");
                closeModal();
              }
          })
    };

    return (
        <ModalBox open={isModalOpen} onClose={closeModal} width={400}>
            <Typography variant="h6" textAlign="center" marginBottom={2}>New Salary</Typography>
            <Form onSubmit={onSubmit} validationSchema={createSalarySchema}>
                <Grid container direction="row" justifyContent="center" spacing={2}>
                    <Grid item container direction="column" lg={6}>
                        <Stack direction="column" spacing={0}>
                          <InputField
                            name="net"
                            label="Salary NET"
                            type="number"
                          />
                          <InputField
                            name="gross"
                            label="Salary Gross"
                            type="number"
                          />
                        </Stack>
                    </Grid>
                    <Grid item container direction="column" lg={6}>
                      <Stack direction="column" spacing={0}>
                        <InputField
                          name="startDate"
                          label="Start Date"
                          type="date"
                          defaultValue={today}
                        />
                        <InputField
                          name="document"
                          label=""
                          type="file"
                          accept=".pdf,.doc,.docx,.txt,.csv,.zip"
                          variant='standard'
                        />
                      </Stack>
                    </Grid>
                </Grid>
                <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
                    <Button type="submit" variant='contained'>Create</Button>
                    <Button onClick={closeModal} variant='contained'>Cancel</Button>
                </Stack>
            </Form>
        </ModalBox>
)
}

export default NewSalaryModal;