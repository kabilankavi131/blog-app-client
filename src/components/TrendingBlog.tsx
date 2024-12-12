import React, { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import ScrollToTopButton from "./ScrollToTopButton";
import BlogList from "./BlogList";
import BlogNav from "./BlogNav";
import SearchBar from "./SearchBar";

const TrendingBlog: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(3); // Default to first tab

  const handleTabChange = (tabKey: number) => {
    setActiveTab(tabKey);
  };
  return (
    <div id="home-page" className="page">
      <AppHeader />
      <SearchBar />
      <BlogNav activeTab={activeTab} onTabChange={handleTabChange} />
      <BlogList />
      <ScrollToTopButton />
    </div>
  );
};

export default TrendingBlog;
