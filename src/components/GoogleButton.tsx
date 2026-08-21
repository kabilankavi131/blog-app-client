import React from "react";
import { Button } from "@mui/material";
import { GoogleButtonProps } from "../interfaces/interface";

const GoogleButton: React.FC<GoogleButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        width: "100%",
        padding: 1,
        borderColor: "gray",
        color: "black",
        textTransform: "none",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: "",
        },
      }}
    >
      <img
        style={{ width: "30px" }}
        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        alt=""
      />
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
