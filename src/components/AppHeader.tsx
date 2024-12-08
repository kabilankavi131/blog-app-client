import React from "react";
import { useNavigate } from "react-router-dom";

interface AppHeaderProps {
  toggleMenu: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ toggleMenu }) => {
  const nav = useNavigate();
  return (
    <header className="app-header">
      <div className="header-left">
        <button className="menu-btn" onClick={toggleMenu}>
          ☰
        </button>
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
          src="https://via.placeholder.com/40"
          alt="Profile"
        />
      </div>
    </header>
  );
};

export default AppHeader;
