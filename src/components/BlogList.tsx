import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import { Blog } from "../interfaces/interface";
import { getBlogs } from "../services/services";
const blogss = [
  {
    blog_id: 1,
    author_id: "author_1",
    blog_category_id: 1,
    blog_title: "Understanding React Hooks",
    blog_content:
      "In this blog, we will explore the concept of React hooks, their advantages, and how to use them effectively in your applications.",
    blog_cover_image:
      "https://raw.githubusercontent.com/kabilankavi131/ToDoApp/refs/heads/main/Images/image10.jpg",
    blog_date: "December 12, 2024",
    blog_read_time: "6 min read",
    created_at: "2024-11-01T10:00:00Z",
    created_by: "author_1",
    modified_at: "2024-11-02T10:00:00Z",
    modified_by: "author_1",
    is_active: true,
    tags: ["React", "Hooks", "JavaScript"],
    category: "Development",
    likes: 20,
  },
  {
    blog_id: 2,
    author_id: "author_2",
    blog_category_id: 2,
    blog_title: "A Guide to CSS Grid",
    blog_content:
      "CSS Grid is a powerful layout system that provides a two-dimensional grid-based layout. Learn how to create responsive layouts using CSS Grid.",
    blog_cover_image:
      "https://raw.githubusercontent.com/kabilankavi131/ToDoApp/refs/heads/main/Images/image10.jpg",
    blog_date: "December 11, 2024",
    blog_read_time: "5 min read",
    created_at: "2024-11-05T11:00:00Z",
    created_by: "author_2",
    modified_at: "2024-11-06T11:00:00Z",
    modified_by: "author_2",
    is_active: true,
    tags: ["CSS", "Grid", "Web Design"],
    category: "Design",
    likes: 15,
  },
  {
    blog_id: 3,
    author_id: "author_3",
    blog_category_id: 1,
    blog_title: "JavaScript ES6 Features",
    blog_content:
      "This blog post highlights the essential features introduced in ES6, including let/const, arrow functions, template literals, and more.",
    blog_cover_image:
      "https://raw.githubusercontent.com/kabilankavi131/ToDoApp/refs/heads/main/Images/image10.jpg",
    blog_date: "December 10, 2024",
    blog_read_time: "7 min read",
    created_at: "2024-11-10T12:00:00Z",
    created_by: "author_3",
    modified_at: "2024-11-11T12:00:00Z",
    modified_by: "author_3",
    is_active: true,
    tags: ["JavaScript", "ES6", "Programming", "Design"],
    category: "Development",
    likes: 30,
  },
  {
    blog_id: 4,
    author_id: "author_4",
    blog_category_id: 3,
    blog_title: "Building RESTful APIs with Node.js",
    blog_content:
      "Learn how to create RESTful APIs using Node.js and Express, covering the basics of setting up routes and handling requests.",
    blog_cover_image:
      "https://raw.githubusercontent.com/kabilankavi131/ToDoApp/refs/heads/main/Images/image10.jpg",
    blog_date: "December 9, 2024",
    blog_read_time: "8 min read",
    created_at: "2024-11-15T13:00:00Z",
    created_by: "author_4",
    modified_at: "2024-11-16T13:00:00Z",
    modified_by: "author_4",
    is_active: true,
    tags: ["Node.js", "API", "Express"],
    category: "Development",
    likes: 25,
  },
  {
    blog_id: 5,
    author_id: "author_5",
    blog_category_id: 2,
    blog_title: "Responsive Web Design Principles",
    blog_content:
      "This post covers the key principles of responsive web design and how to implement them to create fluid and adaptable layouts.",
    blog_cover_image:
      "https://raw.githubusercontent.com/kabilankavi131/ToDoApp/refs/heads/main/Images/image10.jpg",
    blog_date: "December 8, 2024",
    blog_read_time: "4 min read",
    created_at: "2024-11-20T14:00:00Z",
    created_by: "author_5",
    modified_at: "2024-11-21T14:00:00Z",
    modified_by: "author_5",
    is_active: true,
    tags: ["Responsive Design", "Web Development", "CSS"],
    category: "Design",
    likes: 10,
  },
];

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getData = async () => {
    const data = await getBlogs();
    console.log("Images:", data);

    setBlogs(data);
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const fetchedData = (
    <section className="blog-list">
      {blogss?.map((blog: Blog, index) => (
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
