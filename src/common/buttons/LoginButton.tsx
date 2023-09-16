import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/contextHooks";

const LoginButton = () => {
  const navigate = useNavigate();
  const { userExists } = useUser();

  const handleClick = () => {
    if (userExists) navigate("/login");
  };

  return (
    <>
      {userExists && (
        <Button onClick={handleClick} color="inherit" disableRipple>
          Login
        </Button>
      )}
    </>
  );
};

export default LoginButton;
