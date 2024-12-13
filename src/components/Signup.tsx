import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleButton from "./GoogleButton";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { signInWithPopup, auth, provider } from "../firebase";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../context/UserDetailsProvider";
import { GoogleJwtPayload, UserProfile } from "../interfaces/interface";
import { registerUser, persistUserData } from "../services/services";

const SignUpScreen: React.FC = () => {
  const navigate = useNavigate();
  const userProfile = persistUserData.loadUserData();

  const [localUserData, setLocalUserData] = useState<UserProfile>(() => {
    return persistUserData.loadUserData();
  });

  const context = useContext(UserContext);
  if (!context) {
    throw new Error("userContext must be used within a userContext.Provider");
  }
  const { setUser } = context;
  useEffect(() => {
    if (userProfile.user_id) {
      navigate("/home");
    }
  }, []);
  useEffect(() => {
    if (localUserData.user_id) {
      setUser(localUserData);
    }
  }, [localUserData, setUser]);

  const handleInputChange =
    (field: keyof UserProfile) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalUserData((prevData) => ({
        ...prevData,
        [field]: event.target.value,
      }));
    };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const updatedUserData: UserProfile = {
        user_id: result.user.uid,
        username: result.user.displayName || "",
        full_name: result.user.displayName || "",
        email: result.user.email || "",
        password: result.user.uid + result.user.email,
        profileImg: result.user.photoURL || "",
      };

      setLocalUserData(updatedUserData);
      persistUserData.saveUserData(updatedUserData);
      setUser(updatedUserData);
      await registerUser(updatedUserData);
      navigate("/home");
    } catch (error) {
      console.error("Error during Google sign-up:", error);
    }
  };

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      const token = String(credentialResponse.credential);
      const decoded: GoogleJwtPayload = jwtDecode<GoogleJwtPayload>(token);

      const updatedUserData: UserProfile = {
        user_id: decoded.sub || "",
        full_name: decoded.given_name,
        username: decoded.given_name || "",
        email: decoded.email || "",
        password: decoded.sub + decoded.email,
        profileImg: decoded.picture,
      };

      setLocalUserData(updatedUserData);
      persistUserData.saveUserData(updatedUserData);
      setUser(updatedUserData);
      await registerUser(updatedUserData);
      navigate("/home");
    },
    onError: () => {
      console.error("One Tap Login Failed");
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    localUserData.user_id = localUserData.email + localUserData.username;
    localUserData.profileImg =
      "https://static.vecteezy.com/system/resources/previews/036/885/313/non_2x/blue-profile-icon-free-png.png";
    persistUserData.saveUserData(localUserData);
    await registerUser(localUserData);
    navigate("/home");
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Sign Up for Blog Space
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        <TextField
          label="User Name"
          required
          fullWidth
          value={localUserData.username}
          onChange={handleInputChange("username")}
        />
        <TextField
          label="Full Name"
          required
          fullWidth
          value={localUserData.full_name}
          onChange={handleInputChange("full_name")}
        />
        <TextField
          label="Email"
          type="email"
          required
          fullWidth
          value={localUserData.email}
          onChange={handleInputChange("email")}
        />
        <TextField
          label="Password"
          type="password"
          value={localUserData.password}
          onChange={handleInputChange("password")}
          required
          fullWidth
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

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: 3,
    backgroundColor: "#e3f2fd",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: 300,
    gap: 2,
  },
  signUpButton: {
    backgroundColor: "#4caf50",
  },
  loginText: {
    marginTop: 2,
    textAlign: "center",
    cursor: "pointer",
    color: "#1976d2",
  },
};
