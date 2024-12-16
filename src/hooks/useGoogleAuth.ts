import { signInWithPopup, auth, provider } from "../firebase";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { GoogleJwtPayload, UserProfile } from "../interfaces/interface";
import { persistUserData, registerUser } from "../services/services";
import { jwtDecode } from "jwt-decode";

export const useGoogleSignIn = ({ setUser, navigate }: any) => {
  return async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData: UserProfile = {
        user_id: result.user.uid,
        username: result.user.email?.slice(0, 6) || "",
        full_name: result.user.displayName || "",
        email: result.user.email || "",
        password: result.user.uid + result.user.email,
        profileImg: result.user.photoURL || "",
      };

      persistUserData.saveUserData(userData);
      setUser(userData);
      await registerUser(userData);
      navigate("/home");
    } catch (error) {
      console.error("Error during Google sign-up:", error);
    }
  };
};

export const useGoogleOneTap = ({ setUser, navigate }: any) => {
  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      const token = String(credentialResponse.credential);
      const decoded: GoogleJwtPayload = jwtDecode<GoogleJwtPayload>(token);
      const userData: UserProfile = {
        user_id: decoded.sub || "",
        username: decoded.email.slice(0, 6) || "",
        full_name: decoded.given_name,
        email: decoded.email || "",
        password: decoded.sub + decoded.email,
        profileImg: decoded.picture,
      };

      persistUserData.saveUserData(userData);
      setUser(userData);
      await registerUser(userData);
      navigate("/home");
    },
    onError: () => console.error("One Tap Login Failed"),
  });
};
