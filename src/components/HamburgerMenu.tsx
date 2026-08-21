import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const HamburgerMenu: React.FC = () => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
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
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/pay-to-kabilan" onClick={() => setIsOpen(false)}>
              Support Us
            </Link>
          </li>
          <li>
            <Link to="/payments" onClick={() => setIsOpen(false)}>
              Donors
            </Link>
          </li>
          <li>
            <Link to="#" onClick={(e) => e.preventDefault()}>
              Favourites
            </Link>
          </li>
          <li>
            <Link to="#" onClick={(e) => e.preventDefault()}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/aboutdeveloper" onClick={() => setIsOpen(false)}>
              Developer Info
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
