import React, { useEffect, useState } from "react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="scrolltotop-container">
      {isVisible && (
        <img
          id="scrollToTopBtn"
          src="https://blog-app-resources.vercel.app/Images/scrolltotop.png"
          alt="Scroll to Top"
          className="scrollToTop"
          onClick={handleScrollToTop}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
};

export default ScrollToTopButton;
