import React, { createContext, useState, ReactNode } from "react";
import { UserProfile } from "../interfaces/interface";

interface UserContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserDetailsProviderProps {
  children: ReactNode;
}

export const UserDetailsProvider: React.FC<UserDetailsProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile>({
    user_id: "",
    password: "",
    username: "",
    full_name: "",
    email: "",
    profileImg: "", // Changed to `null` as per type definition
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserDetailsProvider;
