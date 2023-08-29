import React from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import InputField from "../../common/InputField";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../hooks/contextHooks";
import { loginSchema } from "./loginSchema";
import Form from "../../common/Form";

const LoginForm = () => {
  const { login } = useAuth();

  return (
    <Form onSubmit={login} validationSchema={loginSchema}>
      <ToastContainer position="top-center" />
      <Grid
        container
        direction="row"
        spacing={5}
        justifyContent="center"
        alignSelf="center"
        marginTop={10}
        marginBottom={6}
      >
        <Grid
          item
          container
          direction="column"
          lg={4}
          sx={{ justifyContent: "center" }}
        >
          <Stack direction="column" spacing={0}>
            <Typography variant="h6" textAlign="center">
              Login
            </Typography>
            <InputField name="email" label="Email" />
            <InputField name="password" label="Password" type="password" />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ marginTop: 1 }}
            >
              Login
            </Button>
          </Stack>
        </Grid>
        <Grid item container direction="column" lg={4}>
          <img
            src={logo}
            alt="logo"
            style={{
              width: "80%",
              borderRadius: "200px",
              margin: "auto"
            }}
          />
        </Grid>
      </Grid>
    </Form>
  );
};

export default LoginForm;
