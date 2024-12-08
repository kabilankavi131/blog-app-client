import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import BlogItem from "./BlogItem";
import client from "../client/client";
import { BlogInterface } from "../interfaces/interface";
import blogsArray from "../constants/blogData";

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogInterface[]>();
  const getData = async () => {
    const data = await client();
    blogsArray.concat(data);
    console.log(data);

    setBlogs(data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <section className="blog-list">
      {blogs?.map((blog: BlogInterface, index) => (
        <BlogItem blog={blog}/>
      ))}
    </section>
  );
};

export default BlogList;
