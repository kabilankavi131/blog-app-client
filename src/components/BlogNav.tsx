import React, { useRef } from "react";

const BlogNav: React.FC = () => {
  const toggletab = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttons = document.querySelectorAll(".tab");
    buttons.forEach((button) => button.classList.remove("active"));
    event.currentTarget.classList.add("active");
  };

  return (
    <>
      <nav>
        <button onClick={toggletab} className="tab active">
          Featured
        </button>
        <button onClick={toggletab} className="tab">
          Latest
        </button>
        <button onClick={toggletab} className="tab">
          Trending
        </button>
      </nav>
    </>
  );
};

export default BlogNav;
