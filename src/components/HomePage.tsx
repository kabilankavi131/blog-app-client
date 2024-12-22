import React, { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import ScrollToTopButton from "./ScrollToTopButton";
import BlogList from "./BlogList";
import BlogNav from "./BlogNav";
import SearchBar from "./SearchBar";
import { persistUserData } from "../services/services";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1); // Default to first tab
  const navigate = useNavigate();
  const userprofile = persistUserData.loadUserData();
  useEffect(() => {
    if (!userprofile.user_id) {
      navigate("/");
    }
    document.title = "Blog App";
  }, []);
  const handleTabChange = (tabKey: number) => {
    setActiveTab(tabKey);
  };
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
