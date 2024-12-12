import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleButton from "./GoogleButton";
import { signInWithPopup, auth, provider } from "../firebase";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { UserContext } from "../context/UserDetailsProvider";
import { GoogleJwtPayload, UserProfile } from "../interfaces/interface";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../services/services";
import { useContext, useState } from "react";

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("userContext must be used within a userContext.Provider");
  }

  const { setUser } = context;

  const handleGoogleLogin = async () => {
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

      setUser(updatedUserData);
      navigate("/home");
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      const token = String(credentialResponse.credential);
      const decoded: GoogleJwtPayload = jwtDecode<GoogleJwtPayload>(token);

      const updatedUserData: UserProfile = {
        user_id: decoded.sub || "",
        username: decoded.given_name || "",
        full_name: decoded.given_name,
        email: decoded.email || "",
        password: "",
        profileImg: decoded.picture,
      };

      setUser(updatedUserData);
      loginUser(updatedUserData.email, updatedUserData.password);
      navigate("/home");
    },
    onError: () => {
      console.error("One Tap Login Failed");
    },
  });

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    loginUser(email, password);
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Log In to Blog Space
      </Typography>
      <Box component="form" onSubmit={handleLogin} sx={styles.form}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="contained" type="submit" sx={styles.loginButton}>
          Log In
        </Button>
        <Divider sx={{ my: 2 }}>OR</Divider>
        <GoogleButton onClick={handleGoogleLogin} />
        <Typography sx={styles.signupText} onClick={() => navigate("/signup")}>
          Don’t have an account? <b>Sign Up</b>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginScreen;

// Extracted styles for better organization
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
  loginButton: {
    backgroundColor: "#1976d2",
  },
  signupText: {
    marginTop: 2,
    textAlign: "center",
    cursor: "pointer",
    color: "#1976d2",
  },
};
