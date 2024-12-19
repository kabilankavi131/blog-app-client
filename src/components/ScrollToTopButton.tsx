import React, { useEffect, useState } from "react";

const ScrollToTopButton: React.FC = () => {
  let hamburgermenu: any;
  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      if (hamburgermenu != null) {
        hamburgermenu.style.display = "block";
      }
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    hamburgermenu = document.getElementById("hamburgermenu");
    window.addEventListener("scroll", () => {
      if (hamburgermenu != null) {
        hamburgermenu.style.display = "none";
      }
      handleScroll();
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="scrolltotop-container">
      {isVisible && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 16 16"
          fill="none"
          id="scrollToTopBtn"
          className="scrollToTop"
          onClick={handleScrollToTop}
        >
          <g fill="var(--primary-text)">
            <path d="M2.5 2.5a.75.75 0 010-1.5H13a.75.75 0 010 1.5H2.5zM2.985 9.795a.75.75 0 001.06-.03L7 6.636v7.614a.75.75 0 001.5 0V6.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 00.03 1.06z" />
          </g>
        </svg>
      )}
    </div>
  );
};

export default ScrollToTopButton;
