import React from "react";
import { AppBar, Toolbar, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/contextHooks";
import { LogoAndTitle } from "./LogoAndTitle";
import AuthenticatedButtons from "./buttons/AuthenticatedButtons";
import LoginButton from "./buttons/LoginButton";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const onImageClick = () => {
    if (isAuthenticated) navigate("/");
  };

  return (
    <AppBar className="nav" style={{ position: "absolute", top: 0 }}>
      <Toolbar>
        <LogoAndTitle onImageClick={onImageClick} />
        <Stack direction="row" spacing={2}>
          {isAuthenticated ? <AuthenticatedButtons /> : <LoginButton />}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
