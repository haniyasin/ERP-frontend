import React from 'react';
import { Button, Grid, Stack, Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import InputField from '../../common/InputField';
import { useAuth } from '../../hooks/contextHooks';
import { registerSchema } from './registerSchema';
import Form from '../../common/Form';

const RegisterForm = () => {
    const { registerAndLogin } = useAuth();

  return (
    <Form onSubmit={registerAndLogin} validationSchema={registerSchema}>
        <Grid container direction="row" spacing={5} justifyContent="center" marginTop={10} marginBottom={6}>
            <Grid item container direction="column" justifyContent="center" lg={4}>
                <Stack direction="column" spacing={0}>
                    <Typography variant="h6" textAlign="center">Register</Typography>
                    <InputField
                        name="fullName"
                        label="Full Name"
                    />
                    <InputField
                        name="email"
                        label="Email"
                    />
                    <InputField
                        name="password"
                        label="Password"
                        type="password"
                    />
                    <InputField
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                    />
                    <Button type="submit" variant="contained" color="secondary" sx={{marginTop: 1}}>Register</Button>
                </Stack>
            </Grid>
            <Grid item container direction="column" lg={4}>
                <img src={logo} alt="logo" />
            </Grid>
        </Grid>
    </Form>
  )
}

export default RegisterForm;