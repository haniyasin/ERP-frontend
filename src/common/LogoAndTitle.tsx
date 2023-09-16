import { Typography } from "@mui/material";
import React from "react";
import { HeaderImage } from "../styles/styled components/HeaderImage";
import logo from "../assets/logo.png";

interface LogoAndTitleProps {
  onImageClick: () => void;
}

export const LogoAndTitle = ({ onImageClick }: LogoAndTitleProps) => (
  <>
    <HeaderImage onClick={onImageClick} src={logo} alt="logo" />
    <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
      DEAFOR
    </Typography>
  </>
);
