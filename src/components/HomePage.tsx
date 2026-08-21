import React, { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import ScrollToTopButton from "./ScrollToTopButton";
import BlogList from "./BlogList";
import BlogNav from "./BlogNav";
import SearchBar from "./SearchBar";
import { persistUserData, updateRecentPosts } from "../services/services";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1); // Default to first tab
  const navigate = useNavigate();
  useEffect(() => {
    const userprofile = persistUserData.loadUserData();
    if (!userprofile.user_id) {
      navigate("/");
    }
    document.title = "Blog App";
  }, [navigate]);
  const handleTabChange = (tabKey: number) => {
    setActiveTab(tabKey);
  };
  setTimeout(() => {
    updateRecentPosts();
  }, 300000);
  return (
    <div id="home-page" className="page">
      <AppHeader />
      <HamburgerMenu />
      <SearchBar />
      <BlogNav activeTab={activeTab} onTabChange={handleTabChange} />
      <BlogList blogType={"Featured"} />
      <ScrollToTopButton />
    </div>
  );
};

export default HomePage;
