import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Button, Stack } from "@mui/material";
import { useHttp } from "../../hooks/useHttp";
import { User } from "../../interfaces/User";
import LoadingComponent from "../../common/LoadingComponent";
import { ToastContainer } from "react-toastify";
import BasicInfoAccordion from "./accordions/BasicInfoAccordion";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const { get } = useHttp();
  const navigate = useNavigate();

  useEffect(() => {
    get("users/loggedInUser").then((res) => {
      if (res) setUser(res.data);
    });
    // eslint-disable-next-line
  }, []);

  if (user === null) return <LoadingComponent />;

  return (
    <Container sx={{ marginTop: 8 }} className="employee-pic">
      <ToastContainer position="top-center" />
      <Typography variant="h4" textAlign="center" marginBottom={3}>
        User information
      </Typography>
      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item container direction="column" lg={12}>
          <Stack direction="row" justifyContent="center" spacing={2} mb={3}>
            {/* <Button onClick={() => navigate(-1)} variant="contained">
              Back
            </Button> */}
          </Stack>
          {user?.hasLeft && (
            <Typography
              variant="h6"
              align="center"
              sx={{ color: "red", fontWeight: "bold", marginBottom: 3 }}
            >
              This employee is no longer with the company.
            </Typography>
          )}
          <BasicInfoAccordion employee={user} />
          {/* <ProjectsAccordion employee={user} /> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
