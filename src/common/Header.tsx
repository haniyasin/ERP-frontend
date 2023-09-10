import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Menu,
  MenuItem,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { getUserRoleFromToken } from "../utils/getDataFromToken";
import { filterUserRoutes } from "../utils/filterUserRoutes";
import { protectedRoutes } from "../routes/AllRoutes";
import { useAuth, useUser } from "../hooks/contextHooks";
import { HeaderImage } from "../styles/styled components/HeaderImage";
import { theme } from "../styles/Theme";

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
                    path !== "/" &&
                    path !== "/invoice-report" &&
                    path !== "/employee/:employeeId" &&
                    path !== "/position/:positionId" &&
                    path !== "/company/:companyId"
                )
                .map(({ path, Element }) => {
                  if (path === "/hr/positions") return null;
                  if (path === "/hr/employees")
                    return (
                      <Box key={path}>
                        <Button
                          aria-controls="hr-menu"
                          aria-haspopup="true"
                          onClick={(event: React.MouseEvent<HTMLElement>) => {
                            setAnchorEl(event.currentTarget as HTMLElement);
                          }}
                          color="inherit"
                          disableRipple
                          sx={{
                            "&:hover": {
                              backgroundColor: theme.palette.primary.main,
                              color: theme.palette.primary.dark
                            }
                          }}
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
                            onClick={() => {
                              navigate("/hr/employees");
                              setAnchorEl(null);
                            }}
                            sx={{
                              color: "white",
                              "&:hover": {
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.dark
                              }
                            }}
                          >
                            Employees
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              navigate("/hr/positions");
                              setAnchorEl(null);
                            }}
                            disableRipple
                            sx={{
                              color: "white",
                              "&:hover": {
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.dark
                              }
                            }}
                          >
                            Positions
                          </MenuItem>
                        </Menu>
                      </Box>
                    );
                  return (
                    <Button
                      key={path}
                      onClick={() => navigate(path)}
                      color="inherit"
                      disableRipple
                      sx={{
                        "&:hover": {
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.dark
                        }
                      }}
                    >
                      {Element.name}
                    </Button>
                  );
                })}

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
