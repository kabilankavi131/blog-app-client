import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import { Blog } from "../interfaces/interface";
import { getBlogs } from "../services/services";

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getData = async () => {
    const blog: Blog[] = await getBlogs();
    // console.log("Blogs: ", blog);

    setBlogs(blog);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const fetchedData = (
    <section className="blog-list">
      {blogs?.map((blog: Blog, index: number) => (
        <BlogItem key={index} blog={blog} />
      ))}
    </section>
  );
  const loadingData = (
    <div className="loading-container">
      <img
        src="https://blog-app-resources.vercel.app/Images/loading.gif"
        alt="Loading"
      />
    </div>
  );
  return isLoading ? loadingData : fetchedData;
};

export default BlogList;
