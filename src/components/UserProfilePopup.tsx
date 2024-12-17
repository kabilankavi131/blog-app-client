import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserDetailsProvider";
import { UserContextType } from "../interfaces/interface";
import toast, { Toaster } from "react-hot-toast";
import { persistUserData } from "../services/services";

// Styled Components
const PopupContainer = styled.div`
  position: absolute;
  top: 62px;
  right: 20px;
  width: 200px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 900;
`;

const PopupItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f0f0f0;
  }
`;

// Props Interface
interface UserProfilePopupProps {
  navigate: (path: string) => void;
  onClose: () => void;
}

// Component
const UserProfilePopup: React.FC<UserProfilePopupProps> = ({
  navigate,
  onClose,
}) => {
  const context = useContext(UserContext) as UserContextType | undefined;

  if (!context) {
    throw new Error("UserContext must be used within a UserContext.Provider");
  }

  const logOutUser = () => {
    persistUserData.clearUserData();
    const loadingToast = toast.loading("Logging Out...");
    setTimeout(() => {
      toast.dismiss(loadingToast);
      try {
        toast.success("Log Out Successful!");
      } catch (error) {
        toast.error("Could not Log Out.");
      }
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 3000);
  };

  const { user } = context;
  const notify = () =>
    toast(`Hello ${user.full_name}`, {
      icon: "👋",
    });

  const underBuild = () => toast.error("This is currently under development!");
  const popupItems = [
    {
      label: `Hi, ${user.full_name}`,
      icon: "https://blog-app-resources.vercel.app/Images/hi-gesture-hand-svg.svg",
      onClick: notify,
    },
    {
      label: "Favourites",
      icon: "https://blog-app-resources.vercel.app/Images/folder-favourites-svg.svg",
      onClick: underBuild,
    },
    {
      label: "Saved Items",
      icon: "https://blog-app-resources.vercel.app/Images/bookmark-empty-svg.svg",
      onClick: underBuild,
    },

    {
      label: "Settings",
      icon: "https://blog-app-resources.vercel.app/Images/settings-svg.svg",
      onClick: underBuild,
    },
    {
      label: "Log Out",
      icon: "https://www.svgrepo.com/show/489036/log-out-1.svg",
      onClick: logOutUser,
    },
  ];

  return (
    <PopupContainer>
      <div>
        <Toaster />
      </div>
      {popupItems.map((item, index) => (
        <PopupItem key={index} onClick={item.onClick || undefined}>
          <img
            style={{
              width: "25px",
              position: "relative",
              top: "5px",
              marginRight: "10px",
            }}
            src={item.icon}
            alt={item.label}
          />
          {item.label}
        </PopupItem>
      ))}
    </PopupContainer>
  );
};

export default UserProfilePopup;
