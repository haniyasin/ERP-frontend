import React from "react";
import { Button } from "@mui/material";
import { theme } from "../styles/Theme";

interface RouteButtonProps {
  Element: () => React.JSX.Element;
  onClick: () => void;
}

export const RouteButton = ({ Element, onClick }: RouteButtonProps) => (
  <Button
    onClick={onClick}
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
