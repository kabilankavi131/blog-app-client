// SignUpScreen.tsx
import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleButton from "./GoogleButton";
import { useGoogleSignIn, useGoogleOneTap } from "../hooks/useGoogleAuth";
import { UserContext } from "../context/UserDetailsProvider";
import { useForm } from "../hooks/useForm";
import { persistUserData, registerUser } from "../services/services";
import toast, { Toaster } from "react-hot-toast";
import styles from "../styles/SignUpStyles";

const SignUpScreen: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext must be used within a UserContext.Provider");
  }

  const { setUser } = context;
  const { formData, handleInputChange } = useForm({
    user_id: "",
    username: "",
    full_name: "",
    email: "",
    profileImg: "", // Change to string to store URL instead of Blob
    password: "",
  });

  useEffect(() => {
    const userProfile = persistUserData.loadUserData();
    if (userProfile?.user_id) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    const userId = formData.email + formData.username;
    const profileImg =
      "https://static.vecteezy.com/system/resources/previews/036/885/313/non_2x/blue-profile-icon-free-png.png";
    formData.user_id = userId;
    formData.profileImg = profileImg;
    // console.log("Form Data: ", formData);
    try {
      const loader = toast.loading("Signing Up");
      const response: any = await registerUser(formData);
      toast.dismiss(loader);
      if (response.status === 201) {
        toast.success("Signed Up Successfully");
        persistUserData.saveUserData(formData);
        setTimeout(() => {
          setUser(response.data);
          navigate("/home"); // Navigate to home page after successful sign up
        }, 2000);
      } else {
        toast.error("Try a different email or username!");
      }
    } catch (error) {
      toast.error("Server Error Occurred!");
    }
  };

  const handleGoogleSignUp = useGoogleSignIn({ setUser, navigate });
  useGoogleOneTap({ setUser, navigate });

  return (
    <Box sx={styles.container}>
      <Toaster />
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Sign Up for Blog Space
      </Typography>
      <Box component="form" onSubmit={handleSignUp} sx={styles.form}>
        <TextField
          label="User Name"
          required
          fullWidth
          value={formData.username}
          onChange={handleInputChange("username")}
        />
        <TextField
          label="Full Name"
          required
          fullWidth
          value={formData.full_name}
          onChange={handleInputChange("full_name")}
        />
        <TextField
          label="Email"
          type="email"
          required
          fullWidth
          value={formData.email}
          onChange={handleInputChange("email")}
        />
        <TextField
          label="Password"
          type="password"
          required
          fullWidth
          value={formData.password}
          onChange={handleInputChange("password")}
        />
        <Button variant="contained" type="submit" sx={styles.signUpButton}>
          Sign Up
        </Button>
        <Divider sx={{ my: 2 }}>OR</Divider>
        <GoogleButton onClick={handleGoogleSignUp} />
        <Typography sx={styles.loginText} onClick={() => navigate("/login")}>
          Already have an account? <b>Log In</b>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpScreen;
