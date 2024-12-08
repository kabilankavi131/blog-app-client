import React from "react";

const ScrollToTopButton: React.FC = () => {
  return (
    <div className="scrolltotop-container">
      <img
        id="scrollToTopBtn"
        src="./Images/scrolltotop.png"
        alt="Scroll to Top"
        className="scrollToTop"
      />
    </div>
  );
};

export default ScrollToTopButton;
