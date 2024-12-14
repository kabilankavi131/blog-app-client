import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserDetailsProvider";
import { UserContextType, UserProfile } from "../interfaces/interface";
import UserProfilePopup from "./UserProfilePopup";
import { persistUserData } from "../services/services";

const AppHeader: React.FC = () => {
  const navigateTo = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
    // console.log("User Data in Header:", user);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="hamburgerMenu">
          <button
            className={`hamburger-button ${
              isOpen ? "hamburger-button-close" : "hamburger-button-open"
            }`}
            onClick={toggleMenu}
          >
            <img
              style={{ width: "25px" }}
              src="https://blog-app-resources.vercel.app/Images/menu-alt.svg"
              alt=""
            />
          </button>
          <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <button className="close-button" onClick={toggleMenu}>
              <img
                style={{ width: "35px" }}
                src="https://blog-app-resources.vercel.app/Images/close.svg"
                alt=""
              />
            </button>
            <ul>
              <li>
                <a onClick={() => navigateTo("/")}>Home</a>
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
            </ul>
          </div>
        </div>
        <div className="header-title">
          <h1>Blog Space</h1>
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
          <UserProfilePopup navigate={navigateTo} onClose={togglePopup} />
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
