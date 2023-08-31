import { Box, Typography } from "@mui/material";
import React from "react";

interface StyledProfilePictureProps {
  src: string;
  width?: string;
  height?: string;
  margin?: string;
}

const StyledProfilePicture = ({
  src,
  width,
  height,
  margin
}: StyledProfilePictureProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={width || "150px"}
      height={height || "150px"}
      borderRadius="50%"
      border="2px solid #ccc"
      overflow="hidden"
      margin={margin || "20px auto"}
      position="relative"
    >
      {src !== "" ? (
        <img
          src={src}
          alt="Employee"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            margin: "auto"
          }}
        />
      ) : (
        <Typography>Employee</Typography>
      )}
    </Box>
  );
};

export default StyledProfilePicture;
