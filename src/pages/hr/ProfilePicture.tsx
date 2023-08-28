import React from "react";
import { Box, Typography } from "@mui/material";
import StyledProfilePicture from "../../styles/styled components/StyledProfilePicture";

interface ProfilePictureProps {
  isHovered: boolean;
  imageUrl: string;
  onHover: () => void;
  onClick: () => void;
}

const ProfilePicture = ({
  isHovered,
  imageUrl,
  onHover,
  onClick
}: ProfilePictureProps) => {
  return (
    <Box
      onMouseEnter={onHover}
      onMouseLeave={onHover}
      onClick={onClick}
      style={{
        position: "relative",
        display: "inline",
        margin: "0",
        padding: "0",
        cursor: "pointer"
      }}
    >
      <StyledProfilePicture src={imageUrl} />
      {isHovered && (
        <Box
          style={{
            position: "absolute",
            top: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            border: "2px solid #ccc",
            overflow: "hidden",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          }}
        >
          <Typography variant="subtitle2" color="whitesmoke">
            Change Picture
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProfilePicture;
