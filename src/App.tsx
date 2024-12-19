import React, { createContext, useState } from "react";
import HomePage from "./components/HomePage";
import BlogList from "./components/BlogList";
import AddBlogPage from "./components/AddBlogPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BlogDetailPage from "./components/BlogDetailPage";
import LatestBlog from "./components/LatestBlog";
import TrendingBlog from "./components/TrendingBlog";
import LoginPage from "./components/Login";
import WelcomeScreen from "./components/Welcome";
import LoginScreen from "./components/Login";
import SignUpScreen from "./components/Signup";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider
import UserDetailsProvider from "./context/UserDetailsProvider";
import Favourites from "./components/Favourite";
import DeveloperAboutPage from "./components/DeveloperAboutPage";
import BlogsListsProvider from "./context/BlogListsProvider";

const App: React.FC = () => {
  return (
    <BlogsListsProvider>
      <UserDetailsProvider>
        <GoogleOAuthProvider clientId="78640302180-2bqb9sn8f0tcl8v9qerssvr0smuemnb0.apps.googleusercontent.com">
          <Router>
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              <Route path="/addblog" element={<AddBlogPage />} />
              <Route path="/blogs/latest" element={<LatestBlog />} />
              <Route path="/blogs/trending" element={<TrendingBlog />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/fav" element={<Favourites />} />
              <Route path="aboutdeveloper" element={<DeveloperAboutPage />} />
              {/* Add UserProfile route */}
            </Routes>
          </Router>
        </GoogleOAuthProvider>
      </UserDetailsProvider>
    </BlogsListsProvider>
  );
};

export default App;
