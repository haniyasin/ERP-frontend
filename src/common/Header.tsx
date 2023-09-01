import React from "react";
import { AppBar, Toolbar, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { getUserRoleFromToken } from "../utils/getDataFromToken";
import { filterUserRoutes } from "../utils/filterUserRoutes";
import { protectedRoutes } from "../routes/AllRoutes";
import { useAuth, useUser } from "../hooks/contextHooks";
import { HeaderImage } from "../styles/styled components/HeaderImage";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { userExists } = useUser();
  const navigate = useNavigate();

  const currentUserRole = getUserRoleFromToken();
  const accessibleRoutes = filterUserRoutes(currentUserRole, protectedRoutes);

  const onImageClick = () => {
    if (isAuthenticated) navigate("/");
  };

  return (
    <AppBar className="nav" style={{ position: "absolute", top: 0 }}>
      <Toolbar>
        <HeaderImage onClick={onImageClick} src={logo} alt="logo" />
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          DEAFOR
        </Typography>
        <Stack direction="row" spacing={2}>
          {isAuthenticated ? (
            <>
              {accessibleRoutes
                .filter(
                  ({ path }) =>
                    path !== "/employee-dashboard/:employeeId" &&
                    path !== "/position-dashboard/:positionId" &&
                    path !== "/company-dashboard/:companyId"
                )
                .map(({ path, Element }) => (
                  <Button
                    key={path}
                    onClick={() => navigate(path)}
                    color="inherit"
                    disableRipple
                  >
                    {Element.name}
                  </Button>
                ))}

              <Button onClick={logout} color="inherit" disableRipple>
                Logout
              </Button>
            </>
          ) : (
            userExists && (
              <Button
                onClick={() => navigate("/login")}
                color="inherit"
                disableRipple
              >
                Login
              </Button>
            )
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
