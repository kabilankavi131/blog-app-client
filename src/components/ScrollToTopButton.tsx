import React from "react";

const ScrollToTopButton: React.FC = () => {
  return (
    <div className="scrolltotop-container">
      <img
        id="scrollToTopBtn"
        src="https://blog-app-resources.vercel.app/Images/scrolltotop.png"
        alt="Scroll to Top"
        className="scrollToTop"
      />
    </div>
  );
};

export default ScrollToTopButton;
