import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import BlogItem from "./BlogItem";
import client from "../client/client";
import { BlogInterface } from "../interfaces/interface";
import blogsArray from "../constants/blogData";

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogInterface[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getData = async () => {
    const data = await client();
    blogsArray.concat(data);
    console.log(data);
    setIsLoading(true);

    setBlogs(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const fetchedData = (
    <section className="blog-list">
      {blogs?.map((blog: BlogInterface, index) => (
        <BlogItem blog={blog} />
      ))}
    </section>
  );
  const loadingData = (
    <div className="loading-container">
      <img src="./Images/loading.gif" alt="Loading" />
    </div>
  );
  return isLoading ? fetchedData : loadingData;
};

export default BlogList;
