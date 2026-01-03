import React from "react";
import { useNavigate } from "react-router-dom";
import { BlogNavProps } from "../interfaces/interface";

const BlogNav: React.FC<BlogNavProps> = ({ activeTab, onTabChange }) => {
  const nav = useNavigate();
  const toggletab = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = Number(event.currentTarget.getAttribute("data-key"));
    onTabChange(key);
    switch (key) {
      case 1:
        nav("/home");
        break;
      case 2:
        nav("/blogs/latest");
        break;
      case 3:
        nav("/blogs/trending");
        break;
      case 4:
        nav("/pay-to-kabilan");
        break;
      case 5:
        nav("/payments");
        break;
    }
  };

  return (
    <nav>
      <button
        data-key={1}
        onClick={toggletab}
        className={`tab ${activeTab === 1 ? "active" : ""}`}
      >
        Featured
      </button>
      <button
        data-key={2}
        onClick={toggletab}
        className={`tab ${activeTab === 2 ? "active" : ""}`}
      >
        Latest
      </button>
      <button
        data-key={3}
        onClick={toggletab}
        className={`tab ${activeTab === 3 ? "active" : ""}`}
      >
        Trending
      </button>
      <button
        data-key={4}
        onClick={toggletab}
        className={`tab ${activeTab === 4 ? "active" : ""}`}
      >
        Support
      </button>
      <button
        data-key={5}
        onClick={toggletab}
        className={`tab ${activeTab === 5 ? "active" : ""}`}
      >
        Donors
      </button>
    </nav>
  );
};

export default BlogNav;
