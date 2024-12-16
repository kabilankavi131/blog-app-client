import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserDetailsProvider";
import { UserContextType, UserProfile } from "../interfaces/interface";
import UserProfilePopup from "./UserProfilePopup";
import { persistUserData } from "../services/services";
import toast, { Toaster } from "react-hot-toast";

const AppHeader: React.FC = () => {
  const navigateTo = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Refs to track the sidebar and popup
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const userProfile: UserProfile = persistUserData.loadUserData();
  const context = useContext(UserContext) as UserContextType | undefined;

  if (!context) {
    throw new Error("UserContext must be used within a UserContext.Provider");
  }

  const { user, setUser } = context;

  useEffect(() => {
    if (userProfile.user_id) {
      setUser(userProfile);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Close menu and popup when clicking outside of them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }

      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        isPopupOpen
      ) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isPopupOpen]);

  return (
    <header className="app-header">
      <Toaster />
      <div className="header-left">
        <div className="hamburgerMenu">
          <button
            className={`hamburger-button ${
              isOpen ? "hamburger-button-close" : "hamburger-button-open"
            }`}
            onClick={toggleMenu}
          >
            <img
              id="hamburgermenu"
              style={{ width: "25px" }}
              src="https://blog-app-resources.vercel.app/Images/menu-alt.svg"
              alt=""
            />
          </button>
          <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
            <button className="close-button" onClick={toggleMenu}>
              <img
                style={{ width: "35px" }}
                src="https://blog-app-resources.vercel.app/Images/close.svg"
                alt=""
              />
            </button>
            <ul>
              <li onClick={() => navigateTo("/")}>
                <a>Home</a>
              </li>
              <li>
                <a>About</a>
              </li>
              <li>
                <a>Favourites</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
              <li onClick={() => navigateTo("/aboutdeveloper")}>
                <a>Developer Info</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="header-title">
          <h1 style={{ cursor: "pointer" }} onClick={() => navigateTo("/")}>
            Blog Space
          </h1>
        </div>
      </div>
      <div className="header-right">
        <button
          className="write-btn add-blog-btn"
          onClick={() => navigateTo("/addblog")}
        >
          <img
            style={{ width: "20px", marginRight: "5px" }}
            src="https://blog-app-resources.vercel.app/Images/write.svg"
            alt=""
          />
          {""}
          Write
        </button>
        <button notification-count="5" className="notification-btn">
          <img
            src="https://blog-app-resources.vercel.app/Images/notification-bell.svg"
            alt="Notification Bell"
            onClick={() => toast.error("This is currently under development!")}
          />
        </button>
        <img
          className="profile-pic"
          src={user.profileImg}
          alt="Profile"
          referrerPolicy="no-referrer"
          onClick={togglePopup}
        />
        {isPopupOpen && (
          <div ref={popupRef}>
            <UserProfilePopup navigate={navigateTo} onClose={togglePopup} />
          </div>
        )}
      </div>
      {/* Write Button For Mobile Screen */}
      <div className="write-btn-mobile">
        <button onClick={() => navigateTo("/addblog")}>
          <img
            style={{ width: "25px" }}
            src="https://www.svgrepo.com/show/521934/write.svg"
            alt=""
          />
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
