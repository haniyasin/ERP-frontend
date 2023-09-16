import React, { useState } from "react";
import { Button, Menu, MenuItem, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { protectedRoutes } from "../../routes/AllRoutes";
import { theme } from "../../styles/Theme";
import { filterUserRoutes } from "../../utils/filterUserRoutes";
import { getUserRoleFromToken } from "../../utils/getDataFromToken";
import { RouteButton } from "../RouteButton";
import { useAuth } from "../../hooks/contextHooks";

const AuthenticatedButtons = () => {
  const [hrMenuAnchorEl, setHrMenuAnchorEl] = useState(null);
  const [bdmMenuAnchorEl, setBdmMenuAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const currentUserRole = getUserRoleFromToken();
  const accessibleRoutes = filterUserRoutes(currentUserRole, protectedRoutes);

  const hrRoutes = accessibleRoutes.filter(({ path }) => {
    return ![
      "/",
      "/position/:positionId",
      "/employee/:employeeId",
      "/invoice-report",
      "/company/:companyId",
      "/project/:projectId",
      "/hr/positions",
      "/bdm/companies",
      "/bdm/projects",
      "/profile"
    ].includes(path);
  });

  const bdmRoutes = accessibleRoutes.filter(({ path }) => {
    return ["/profile", "/bdm/projects"].includes(path);
  });

  const handleHrMenuItemClick = (path: string) => {
    navigate(path);
    setHrMenuAnchorEl(null);
  };

  const handleBdmMenuItemClick = (path: string) => {
    navigate(path);
    setBdmMenuAnchorEl(null);
  };

  return (
    <>
      {hrRoutes.map(({ path, Element }) => {
        if (path === "/hr/employees") {
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
                  setHrMenuAnchorEl(event.currentTarget);
                }}
                color="inherit"
                disableRipple
              >
                HR
              </Button>
              <Menu
                id="hr-menu"
                anchorEl={hrMenuAnchorEl}
                open={Boolean(hrMenuAnchorEl)}
                onClose={() => setHrMenuAnchorEl(null)}
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
                  onClick={() => handleHrMenuItemClick("/hr/employees")}
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
                  onClick={() => handleHrMenuItemClick("/hr/positions")}
                  disableRipple
                >
                  Positions
                </MenuItem>
              </Menu>
            </Box>
          );
        }
        return (
          <RouteButton
            key={path}
            Element={Element}
            onClick={() => navigate(path)}
          />
        );
      })}

      {bdmRoutes.map(({ path, Element }) => {
        if (path === "/bdm/projects") {
          return (
            <Box key={path}>
              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.dark
                  }
                }}
                aria-controls="bdm-menu"
                aria-haspopup="true"
                onClick={(event) => {
                  setBdmMenuAnchorEl(event.currentTarget);
                }}
                color="inherit"
                disableRipple
              >
                BDM
              </Button>
              <Menu
                id="bdm-menu"
                anchorEl={bdmMenuAnchorEl}
                open={Boolean(bdmMenuAnchorEl)}
                onClose={() => setBdmMenuAnchorEl(null)}
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
                  onClick={() => handleBdmMenuItemClick("/bdm/companies")}
                >
                  Companies
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
                  onClick={() => handleBdmMenuItemClick("/bdm/projects")}
                  disableRipple
                >
                  Projects
                </MenuItem>
              </Menu>
            </Box>
          );
        }
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
};

export default AuthenticatedButtons;
