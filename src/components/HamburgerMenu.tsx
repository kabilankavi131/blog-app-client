import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const HamburgerMenu: React.FC = () => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigateTo = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div className="hamburgerMenu" id="hamburgermenu">
      <button
        className={`hamburger-button ${
          isOpen ? "hamburger-button-close" : "hamburger-button-open"
        }`}
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
        >
          <g id="Menu / Menu_Alt_05">
            <path
              id="Vector"
              d="M5 17H13M5 12H19M11 7H19"
              stroke="var(--primary-text)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
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
          <li onClick={() => navigateTo("/about")}>
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
  );
};

export default HamburgerMenu;
