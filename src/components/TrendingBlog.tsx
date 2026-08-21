import React, { useContext, useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import ScrollToTopButton from "./ScrollToTopButton";
import BlogList from "./BlogList";
import BlogNav from "./BlogNav";
import SearchBar from "./SearchBar";
import { persistUserData } from "../services/services";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import { BlogContext, BlogContextType } from "../context/BlogListsProvider";

const TrendingBlog: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(3); // Default to first tab
  const context = useContext(BlogContext) as BlogContextType;

  const { setBlogs } = context;
  const handleTabChange = (tabKey: number) => {
    setActiveTab(tabKey);
  };
  useEffect(() => {
    setBlogs([]);
    const userprofile = persistUserData.loadUserData();
    if (!userprofile.user_id) {
      navigate("/");
    }
  }, [navigate, setBlogs]);
  return (
    <div id="home-page" className="page">
      <AppHeader />
      <HamburgerMenu />
      <SearchBar />
      <BlogNav activeTab={activeTab} onTabChange={handleTabChange} />
      <BlogList blogType={"Trending"} />

      <ScrollToTopButton />
    </div>
  );
};

export default TrendingBlog;
