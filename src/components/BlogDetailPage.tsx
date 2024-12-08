import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BlogInterface } from "../interfaces/interface";
import blogsArray from "../constants/blogData";
import getBlogDetails from "../services/getBookDetail";

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BlogInterface | undefined>({
    index: -1,
    author_id: 0,
    blog_id: 1,
    category_id: 1,
    content: "",
    cover_image: "",
    created_at: "",
    created_by: "",
    is_active: 1,
    modified_at: "",
    modified_by: "",
    title: "",
    imageUrl: "",
    date: "",
    readTime: "",
    description: "",
  });
  useEffect(() => {
    const data: BlogInterface | undefined = getBlogDetails(Number(id));
    setBook(data);
  }, []);
  const nav = useNavigate();
  return (
    <div id="detail-page" className="page">
      <header>
        <button onClick={() => nav("/")} className="back-btn">
          ←
        </button>
        <button className="menu-btn">☰</button>
      </header>
      <section className="blog-detail">
        <img src="https://via.placeholder.com/150" alt="Blog Thumbnail" />
        <h1>{book?.title}</h1>
        <p>{book?.content}</p>
        <button className="read-all-btn">Read All</button>
      </section>
    </div>
  );
};

export default BlogDetailPage;
