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
    console.log("User Data in Header:", user);
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
              src="https://www.svgrepo.com/show/511068/menu-alt-05.svg"
              alt=""
            />
          </button>
          <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <button className="close-button" onClick={toggleMenu}>
              <img
                style={{ width: "35px" }}
                src="https://www.svgrepo.com/show/474219/close.svg"
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
            src="https://www.svgrepo.com/show/360946/write.svg"
            alt=""
          />
          {""}
          Write
        </button>
        <button notification-count="5" className="notification-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="grey"
            width="25"
            height="24"
          >
            <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z" />
          </svg>
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
          <i className="fas fa-pencil-alt"></i>
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
