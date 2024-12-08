import React from "react";
import HomePage from "./components/HomePage";
import BlogList from "./components/BlogList";
import AddBlogPage from "./components/AddBlogPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BlogDetailPage from "./components/BlogDetailPage";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetailPage  />} />
        <Route path="/addblog" element={<AddBlogPage />} />
      </Routes>
    </Router>
  );
};

export default App;
