import React, { useEffect } from "react";
import AppHeader from "./AppHeader";
import { useNavigate } from "react-router-dom";
import ScrollToTopButton from "./ScrollToTopButton";
import { BlockList } from "net";
import BlogList from "./BlogList";
import BlogNav from "./BlogNav";
import SearchBar from "./SearchBar";
import client from "../client/client";

const HomePage: React.FC = () => {
  return (
    <div id="home-page" className="page">
      <AppHeader toggleMenu={() => console.log("Menu toggled")} />
      <SearchBar />
      <BlogNav />
      <BlogList />
      <ScrollToTopButton />
    </div>
  );
};

export default HomePage;
