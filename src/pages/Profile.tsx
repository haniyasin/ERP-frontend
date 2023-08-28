import React, { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import { useHttp } from "../hooks/useHttp";
import { User } from "../interfaces/User";
import LoadingComponent from "../common/LoadingComponent";

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
    <Container maxWidth="sm" sx={{ paddingTop: "2rem" }}>
      <Typography variant="h4" margin={6} textAlign="center">
        Profile Page
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6" fontWeight="bold">
            Full Name
          </Typography>
          <Typography variant="body1">{user.fullName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" fontWeight="bold">
            Email
          </Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" fontWeight="bold">
            Title
          </Typography>
          <Typography variant="body1">{user.title}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" fontWeight="bold">
            Starting Date
          </Typography>
          <Typography variant="body1">
            {new Date(user.startingDate).toISOString().split("T")[0]}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
