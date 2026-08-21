import React from "react";
import HomePage from "./components/HomePage";
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
import DeveloperAboutPage from "./components/DeveloperAboutPage";
import PayToKabilan from "./components/pay-to-kabilan/PayToKabilan";
import Payments from "./components/Payments";
import BlogsListsProvider from "./context/BlogListsProvider";
import FourNotFour from "./components/FourNotFour";
import About from "./components/AboutPage";
const features = [
  "Create and publish blogs effortlessly",
  "Search and discover blogs by category",
  "User-friendly interface for an enhanced experience",
  "Responsive design for all devices",
];

const technologies = [
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "CSS Modules",
];

const App: React.FC = () => {
  return (
    <BlogsListsProvider>
      <UserDetailsProvider>
        <GoogleOAuthProvider clientId="78640302180-2bqb9sn8f0tcl8v9qerssvr0smuemnb0.apps.googleusercontent.com">
          <Router>
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route
                path="/blog/:id/"
                element={<BlogDetailPage blogType="Featured" />}
              />
              <Route path="/addblog" element={<AddBlogPage />} />
              <Route path="/blogs/latest" element={<LatestBlog />} />
              <Route path="/blogs/trending" element={<TrendingBlog />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="*" element={<FourNotFour />} />
              <Route path="aboutdeveloper" element={<DeveloperAboutPage />} />
              <Route
                path="/about"
                element={
                  <About
                    technologies={technologies}
                    features={features}
                    appName={"Blog Space"}
                  />
                }
              />
              <Route path="/pay-to-kabilan" element={<PayToKabilan />} />
              <Route path="/payments" element={<Payments />} />
              {/* Add UserProfile route */}
            </Routes>
          </Router>
        </GoogleOAuthProvider>
      </UserDetailsProvider>
    </BlogsListsProvider>
  );
};

export default App;
