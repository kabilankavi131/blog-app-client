import React, { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import ScrollToTopButton from "./ScrollToTopButton";
import BlogList from "./BlogList";
import BlogNav from "./BlogNav";
import SearchBar from "./SearchBar";
import { persistUserData } from "../services/services";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";

const LatestBlog: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(2); // Default to first tab
  const navigate = useNavigate();

  const handleTabChange = (tabKey: number) => {
    setActiveTab(tabKey);
  };
  useEffect(() => {
    const userprofile = persistUserData.loadUserData();
    if (!userprofile.user_id) {
      navigate("/");
    }
  }, []);
  return (
    <div id="home-page" className="page">
      <AppHeader />
      <HamburgerMenu />
      <SearchBar />
      <BlogNav activeTab={activeTab} onTabChange={handleTabChange} />
      <BlogList />
      <ScrollToTopButton />
    </div>
  );
};

export default LatestBlog;
