import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserDetailsProvider";
import { UserContextType } from "../interfaces/interface";
import UserProfilePopup from "./UserProfilePopup";

const AppHeader: React.FC = () => {
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const context = useContext(UserContext) as UserContextType | undefined;

  if (!context) {
    throw new Error("UserContext must be used within a UserContext.Provider");
  }

  const { user } = context;

  useEffect(() => {
    console.log("User Data in Header:", user);
  });

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
            ☰
          </button>
          <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <button className="close-button" onClick={toggleMenu}>
              ✕
            </button>
            <ul>
              <li>
                <a onClick={() => nav("/")}>Home</a>
              </li>
              <li>
                <a onClick={() => nav("/about")}>About</a>
              </li>
              <li>
                <a onClick={() => nav("/favourites")}>Favourites</a>
              </li>
              <li>
                <a onClick={() => nav("/contact")}>Contact</a>
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
          onClick={() => nav("/addblog")}
        >
          <i className="fas fa-pencil-alt"></i> Write
        </button>
        <button notification-count="3" className="notification-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            width="24"
            height="24"
          >
            <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z" />
          </svg>
        </button>
        <img
          className="profile-pic"
          src={
            user.profileImg ||
            "https://static.vecteezy.com/system/resources/previews/036/885/313/non_2x/blue-profile-icon-free-png.png"
          }
          alt="Profile"
          referrerPolicy="no-referrer"
          onClick={togglePopup}
        />
        {isPopupOpen && (
          <UserProfilePopup navigate={nav} onClose={togglePopup} />
        )}
      </div>
      {/* Write Button For Mobile Screen */}
      <div className="write-btn-mobile">
        <button onClick={() => nav("/addblog")}>
          <i className="fas fa-pencil-alt"></i>
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
