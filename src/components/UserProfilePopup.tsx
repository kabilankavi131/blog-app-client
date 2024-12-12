import React, { useContext } from "react";
import styled from "styled-components";
import { UserContextType } from "../interfaces/interface";
import { UserContext } from "../context/UserDetailsProvider";

const PopupContainer = styled.div`
  position: absolute;
  top: 50px;
  right:20px;
  width: 200px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 1000;
  padding: 10px;
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

interface UserProfilePopupProps {
  navigate: (path: string) => void;
  onClose: () => void;
}

const UserProfilePopup: React.FC<UserProfilePopupProps> = ({
  navigate,
  onClose,
}) => {
  const context = useContext(UserContext) as UserContextType | undefined;

  if (!context) {
    throw new Error("UserContext must be used within a UserContext.Provider");
  }

  const { user } = context;

  return (
    <PopupContainer>
      <PopupItem>Hi, {user.full_name}</PopupItem>

      <PopupItem
        onClick={() => {
          onClose();
        }}
      >
        Favourites
      </PopupItem>
      <PopupItem
        onClick={() => {
          onClose();
        }}
      >
        Saved Items
      </PopupItem>
      <PopupItem
        onClick={() => {
          onClose();
        }}
      >
        Settings
      </PopupItem>
    </PopupContainer>
  );
};

export default UserProfilePopup;
