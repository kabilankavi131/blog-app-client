import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserDetailsProvider";
import { UserContextType } from "../interfaces/interface";
import UserProfilePopup from "./UserProfilePopup";
import { persistUserData } from "../services/services";
import toast, { Toaster } from "react-hot-toast";

const AppHeader: React.FC = () => {
  const navigateTo = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const themeRef = useRef<HTMLDivElement | null>(null);

  const context = useContext(UserContext) as UserContextType;
  if (!context) {
    console.warn("UserContext is not available");
    navigateTo("/");
  }

  const { user, setUser } = context;

  useEffect(() => {
    const userProfile = persistUserData.loadUserData();
    if (userProfile?.user_id && user?.user_id !== userProfile.user_id) {
      setUser(userProfile);
    }
  }, [setUser, user?.user_id]);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    const themeIcons = document.querySelectorAll(".theme-switcher svg");
    themeIcons.forEach((icon) => {
      icon.classList.remove("active");
      icon.classList.add("entering");
    });
    setTimeout(() => {
      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      document.body.style.backgroundColor =
        newTheme === "dark" ? "#0f1214" : "#f0f8ff";
      // Update classes after theme is set
      themeIcons.forEach((icon) => {
        icon.classList.remove("entering");
        icon.classList.add("active");
      });
    }, 300); // Matches CSS transition duration
  };

  // Close sidebar or popup when clicking outside
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
      <div>
        <img
          className="christmassCap"
          src="https://global.discourse-cdn.com/flex015/uploads/thunkable/original/3X/d/2/d22be0da708c5ebe8844d98a3d17d569ac8270c2.png"
          alt=""
        />
        <h1 className="app-title">Blog Space</h1>
      </div>
      <div className="header-right">
        <div className="theme-switcher" ref={themeRef} onClick={toggleTheme}>
          {theme === "dark" ? (
            <svg
              fill="var(--primary-text)"
              width="30px"
              height="30px"
              viewBox="0 0 240 240"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              className="enable-background:new 0 0 240 240"
              stroke="var(--primary-text)"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path d="M58.57,25.81c-2.13-3.67-0.87-8.38,2.8-10.51c3.67-2.13,8.38-0.88,10.51,2.8l9.88,17.1c2.13,3.67,0.87,8.38-2.8,10.51 c-3.67,2.13-8.38,0.88-10.51-2.8L58.57,25.81L58.57,25.81z M120,51.17c19.01,0,36.21,7.7,48.67,20.16 C181.12,83.79,188.83,101,188.83,120c0,19.01-7.7,36.21-20.16,48.67c-12.46,12.46-29.66,20.16-48.67,20.16 c-19.01,0-36.21-7.7-48.67-20.16C58.88,156.21,51.17,139.01,51.17,120c0-19.01,7.7-36.21,20.16-48.67 C83.79,58.88,101,51.17,120,51.17L120,51.17z M158.27,81.73c-9.79-9.79-23.32-15.85-38.27-15.85c-14.95,0-28.48,6.06-38.27,15.85 c-9.79,9.79-15.85,23.32-15.85,38.27c0,14.95,6.06,28.48,15.85,38.27c9.79,9.79,23.32,15.85,38.27,15.85 c14.95,0,28.48-6.06,38.27-15.85c9.79-9.79,15.85-23.32,15.85-38.27C174.12,105.05,168.06,91.52,158.27,81.73L158.27,81.73z M113.88,7.71c0-4.26,3.45-7.71,7.71-7.71c4.26,0,7.71,3.45,7.71,7.71v19.75c0,4.26-3.45,7.71-7.71,7.71 c-4.26,0-7.71-3.45-7.71-7.71V7.71L113.88,7.71z M170.87,19.72c2.11-3.67,6.8-4.94,10.48-2.83c3.67,2.11,4.94,6.8,2.83,10.48 l-9.88,17.1c-2.11,3.67-6.8,4.94-10.48,2.83c-3.67-2.11-4.94-6.8-2.83-10.48L170.87,19.72L170.87,19.72z M214.19,58.57 c3.67-2.13,8.38-0.87,10.51,2.8c2.13,3.67,0.88,8.38-2.8,10.51l-17.1,9.88c-3.67,2.13-8.38,0.87-10.51-2.8 c-2.13-3.67-0.88-8.38,2.8-10.51L214.19,58.57L214.19,58.57z M232.29,113.88c4.26,0,7.71,3.45,7.71,7.71 c0,4.26-3.45,7.71-7.71,7.71h-19.75c-4.26,0-7.71-3.45-7.71-7.71c0-4.26,3.45-7.71,7.71-7.71H232.29L232.29,113.88z M220.28,170.87 c3.67,2.11,4.94,6.8,2.83,10.48c-2.11,3.67-6.8,4.94-10.48,2.83l-17.1-9.88c-3.67-2.11-4.94-6.8-2.83-10.48 c2.11-3.67,6.8-4.94,10.48-2.83L220.28,170.87L220.28,170.87z M181.43,214.19c2.13,3.67,0.87,8.38-2.8,10.51 c-3.67,2.13-8.38,0.88-10.51-2.8l-9.88-17.1c-2.13-3.67-0.87-8.38,2.8-10.51c3.67-2.13,8.38-0.88,10.51,2.8L181.43,214.19 L181.43,214.19z M126.12,232.29c0,4.26-3.45,7.71-7.71,7.71c-4.26,0-7.71-3.45-7.71-7.71v-19.75c0-4.26,3.45-7.71,7.71-7.71 c4.26,0,7.71,3.45,7.71,7.71V232.29L126.12,232.29z M69.13,220.28c-2.11,3.67-6.8,4.94-10.48,2.83c-3.67-2.11-4.94-6.8-2.83-10.48 l9.88-17.1c2.11-3.67,6.8-4.94,10.48-2.83c3.67,2.11,4.94,6.8,2.83,10.48L69.13,220.28L69.13,220.28z M25.81,181.43 c-3.67,2.13-8.38,0.87-10.51-2.8c-2.13-3.67-0.88-8.38,2.8-10.51l17.1-9.88c3.67-2.13,8.38-0.87,10.51,2.8 c2.13,3.67,0.88,8.38-2.8,10.51L25.81,181.43L25.81,181.43z M7.71,126.12c-4.26,0-7.71-3.45-7.71-7.71c0-4.26,3.45-7.71,7.71-7.71 h19.75c4.26,0,7.71,3.45,7.71,7.71c0,4.26-3.45,7.71-7.71,7.71H7.71L7.71,126.12z M19.72,69.13c-3.67-2.11-4.94-6.8-2.83-10.48 c2.11-3.67,6.8-4.94,10.48-2.83l17.1,9.88c3.67,2.11,4.94,6.8,2.83,10.48c-2.11,3.67-6.8,4.94-10.48,2.83L19.72,69.13L19.72,69.13z" />{" "}
                </g>{" "}
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30"
              viewBox="0 0 48 48"
              id="theme-icon"
              className="day-theme-icon"
              fill="var(--primary-text)"
            >
              <defs></defs>
              <path
                className="c"
                d="m32.8,29.3c-8.9-.8-16.2-7.8-17.5-16.6-.3-1.8-.3-3.7,0-5.4.2-1.4-1.4-2.3-2.5-1.6C6.3,9.7,2.1,16.9,2.5,25c.5,10.7,9,19.5,19.7,20.4,10.6.9,19.8-6,22.5-15.6.4-1.4-1-2.6-2.3-2-2.9,1.3-6.1,1.8-9.6,1.5Z"
              />
            </svg>
          )}
        </div>
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
          <div className="popupParentContainer" ref={popupRef}>
            <UserProfilePopup navigate={navigateTo} onClose={togglePopup} />
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
