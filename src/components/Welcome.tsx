import React, { useEffect } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../interfaces/interface";
import { persistUserData } from "../services/services";

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const userProfile: UserProfile = persistUserData.loadUserData();
  useEffect(() => {
    if (userProfile.user_id) {
      navigate("/home");
    }
  }, [userProfile, navigate]);

  return (
    <Box sx={styles.container}>
      <Typography variant="h3" fontWeight="bold" sx={styles.title}>
        Welcome to Blog Space
      </Typography>
      <Typography variant="h6" sx={styles.description}>
        Your gateway to discovering and sharing knowledge through blogs. Explore
        featured stories, write your own, and connect with a community of
        thinkers.
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            sx={styles.loginButton}
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            sx={styles.signupButton}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WelcomeScreen;

// Extracted styles for better organization
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: "50px",
    background: "linear-gradient(to right, #83a4d4, #b6fbff)",
  },
  title: {
    marginBottom: 3,
    color: "#fff",
  },
  description: {
    marginBottom: 5,
    color: "#f5f5f5",
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#4caf50",
  },
  signupButton: {
    color: "#fff",
    borderColor: "#fff",
  },
};
