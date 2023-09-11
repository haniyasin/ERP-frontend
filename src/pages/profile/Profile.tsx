import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Stack } from "@mui/material";
import { useHttp } from "../../hooks/useHttp";
import { User } from "../../interfaces/User";
import LoadingComponent from "../../common/LoadingComponent";
import { ToastContainer } from "react-toastify";
import BasicInfoAccordion from "./accordions/BasicInfoAccordion";
import ProjectsAccordion from "./accordions/ProjectsAccordion";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const { get } = useHttp();

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
        Profile information
      </Typography>
      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item container direction="column" lg={12}>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            mb={3}
          ></Stack>
          <BasicInfoAccordion user={user} />
          <ProjectsAccordion user={user} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
