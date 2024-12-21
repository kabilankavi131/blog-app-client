import React, { useContext, useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import { Blog } from "../interfaces/interface";
import { getBlogs, persistBlogData } from "../services/services";
import { useNavigate } from "react-router-dom";
import { BlogContext, BlogContextType } from "../context/BlogListsProvider";
import Loading from "./Lottie Files/Loading";
import StartLoading from "./Lottie Files/StartLoading";

const BlogList: React.FC = () => {
  const navigateTo = useNavigate();
  const context = useContext(BlogContext) as BlogContextType;

  const { blogs, setBlogs } = context;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [isBlogAvailable, setIsBlogAvailable] = useState<boolean>(true);

  // Fetch blogs data
  const getData = async (startingRow = 0) => {
    try {
      setIsLoadMore(true);
      const blog: Blog[] = await getBlogs(startingRow);
      setIsLoadMore(false);

      if (blog.length === 0) {
        setIsBlogAvailable(false);
      }

      // Append the new data to the existing blogs
      setBlogs((prevBlogs: Blog[]) => {
        persistBlogData.saveBlogData([...prevBlogs, ...blog]);
        return [...prevBlogs, ...blog];
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching blogs: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAndFetchData = async () => {
      const blogDataInSessionStorage = persistBlogData.loadBlogData();
      if (blogDataInSessionStorage === null) {
        await getData();
      } else {
        setBlogs(blogDataInSessionStorage);
        setIsLoading(false);
      }
    };

    checkAndFetchData();
  }, [setBlogs]);

  const loadMoreData = () => {
    const startingRow = blogs.length;
    getData(startingRow);
  };
  // Ensure context is available
  if (!context) {
    console.warn("BlogContext is not available");
    navigateTo("/");
    return null;
  }
  const fetchedData = (
    <section className="blog-list">
      {blogs?.map((blog: Blog) => (
        <BlogItem key={blog.blog_id} blog={blog} />
      ))}
      <div className="write-btn-mobile">
        <button onClick={() => navigateTo("/addblog")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M1 22C1 21.4477 1.44772 21 2 21H22C22.5523 21 23 21.4477 23 22C23 22.5523 22.5523 23 22 23H2C1.44772 23 1 22.5523 1 22Z"
              fill="var(--primary-text)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.3056 1.87868C17.1341 0.707107 15.2346 0.707107 14.063 1.87868L3.38904 12.5526C2.9856 12.9561 2.70557 13.4662 2.5818 14.0232L2.04903 16.4206C1.73147 17.8496 3.00627 19.1244 4.43526 18.8069L6.83272 18.2741C7.38969 18.1503 7.89981 17.8703 8.30325 17.4669L18.9772 6.79289C20.1488 5.62132 20.1488 3.72183 18.9772 2.55025L18.3056 1.87868ZM15.4772 3.29289C15.8677 2.90237 16.5009 2.90237 16.8914 3.29289L17.563 3.96447C17.9535 4.35499 17.9535 4.98816 17.563 5.37868L15.6414 7.30026L13.5556 5.21448L15.4772 3.29289ZM12.1414 6.62869L4.80325 13.9669C4.66877 14.1013 4.57543 14.2714 4.53417 14.457L4.0014 16.8545L6.39886 16.3217C6.58452 16.2805 6.75456 16.1871 6.88904 16.0526L14.2272 8.71448L12.1414 6.62869Z"
              fill="var(--primary-text)"
            />
          </svg>
        </button>
      </div>
      <div className="loadMoreContainer" id="loadMoreContainer">
        {isLoadMore ? (
          <StartLoading />
        ) : (
          isBlogAvailable && (
            <div onClick={loadMoreData}>
              <h3>Load More</h3>
            </div>
          )
        )}
      </div>
    </section>
  );

  const loadingData = (
    <div className="loading-container">
      <Loading />
    </div>
  );

  return isLoading ? loadingData : fetchedData;
};

export default BlogList;
