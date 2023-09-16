import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Stack,
  Button,
  Menu,
  MenuItem,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserRoleFromToken } from "../utils/getDataFromToken";
import { filterUserRoutes } from "../utils/filterUserRoutes";
import { protectedRoutes } from "../routes/AllRoutes";
import { useAuth, useUser } from "../hooks/contextHooks";
import { theme } from "../styles/Theme";
import { LogoAndTitle } from "./LogoAndTitle";
import { RouteButton } from "./RouteButton";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { isAuthenticated, logout } = useAuth();
  const { userExists } = useUser();
  const navigate = useNavigate();

  const currentUserRole = getUserRoleFromToken();
  const accessibleRoutes = filterUserRoutes(currentUserRole, protectedRoutes);

  const onImageClick = () => {
    if (isAuthenticated) navigate("/");
  };

  const renderAuthenticatedButtons = () => (
    <>
      {accessibleRoutes
        .filter(
          ({ path }) =>
            ![
              "/",
              "/invoice-report",
              "/employee/:employeeId",
              "/position/:positionId",
              "/company/:companyId"
            ].includes(path)
        )
        .map(({ path, Element }) => {
          if (path === "/hr/positions") return null;
          if (path === "/hr/employees")
            return (
              <Box key={path}>
                <Button
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.dark
                    }
                  }}
                  aria-controls="hr-menu"
                  aria-haspopup="true"
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget as HTMLElement);
                  }}
                  color="inherit"
                  disableRipple
                >
                  HR
                </Button>
                <Menu
                  id="hr-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  PaperProps={{
                    style: {
                      backgroundColor: theme.palette.primary.main,
                      boxShadow: "none",
                      border: "none"
                    }
                  }}
                >
                  <MenuItem
                    sx={{
                      fontSize: 15,
                      color: "white",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.dark
                      }
                    }}
                    onClick={() => {
                      navigate("/hr/employees");
                      setAnchorEl(null);
                    }}
                  >
                    Employees
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: 15,
                      color: "white",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.dark
                      }
                    }}
                    onClick={() => {
                      navigate("/hr/positions");
                      setAnchorEl(null);
                    }}
                    disableRipple
                  >
                    Positions
                  </MenuItem>
                </Menu>
              </Box>
            );
          return (
            <RouteButton
              key={path}
              Element={Element}
              onClick={() => navigate(path)}
            />
          );
        })}

      <Button onClick={logout} color="inherit" disableRipple>
        Logout
      </Button>
    </>
  );

  const renderLoginButton = () =>
    userExists && (
      <Button onClick={() => navigate("/login")} color="inherit" disableRipple>
        Login
      </Button>
    );

  return (
    <AppBar className="nav" style={{ position: "absolute", top: 0 }}>
      <Toolbar>
        <LogoAndTitle onImageClick={onImageClick} />
        <Stack direction="row" spacing={2}>
          {isAuthenticated ? renderAuthenticatedButtons() : renderLoginButton()}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
