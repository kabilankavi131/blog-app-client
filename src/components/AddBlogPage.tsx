import React from "react";
import { useNavigate } from "react-router-dom";

const AddBlogPage: React.FC = () => {
  const nav = useNavigate();
  return (
    <div id="add-blog-page" className="page">
      <header>
        <button onClick={() => nav("/")} className="back-btn">
          ←
        </button>
        <h2>Add New Blog</h2>
      </header>
      <section className="add-blog-form">
        <input type="text" id="blog-title" placeholder="Blog Title" required />
        <textarea
          id="blog-description"
          placeholder="Blog Description"
          required
        ></textarea>
        <input type="file" id="blog-image" accept="image/*" />
        <button id="save-blog-btn" className="save-blog-btn">
          Save Blog
        </button>
      </section>
    </div>
  );
};

export default AddBlogPage;