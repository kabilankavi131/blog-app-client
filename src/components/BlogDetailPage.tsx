import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BlogPopup } from "./BlogPopup"; // Ensure to import
import { AllBlogsData, Blog } from "../interfaces/interface";
import toast, { Toaster } from "react-hot-toast";
import { marked } from "marked";
import {
  getBlogById,
  persistBlogData,
  persistUserData,
  updateBlogLikes,
} from "../services/services";
import ScrollToTopButton from "./ScrollToTopButton";
import LikeLottie from "./Lottie Files/LikeLoader";
import { getBadgeUtilityClass } from "@mui/material";
import { log } from "node:console";
const BlogContainer = styled.div`
  width: 60%;
  margin: 20px auto;
  padding: 50px;
  box-shadow: 0 4px 8px var(--border-color);
  background: var(--background);
  border-radius: 10px;
  color: var(--primary-text);

  pre {
    padding: 20px;
    box-sizing: border-box;
    background-color: #1e1e1e;
    color: #95d2f2;
    overflow-x: auto;
    margin: 10px 0px;
    border-radius: 10px;
  }

  img {
    width: 100%;
    height: auto;
    // object-fit: contain;
  }

  table {
    border-collapse: collapse;
    width: 95%;
    border-width: 1px;
    margin: 20px;
  }
  td,
  th {
    border: 1px solid black;
    padding: 5px;
  }
  hr {
    width: 95%;
    margin: 20px;
  }
  iframe {
    width: 100%;
    height: 400px;
  }
  ol,
  ul {
    margin: 10px;
    margin-left: 50px;
    background: var(--background);
  }
  li {
    background: transparent;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 10px 0px;
    line-height: 45px;
  }
  strong {
    background: transparent;
  }
  div {
    margin-left: 5px;
  }

  p {
    margin: 10px;
    line-height: 25px;
  }

  code {
    background-color: rgba(66, 66, 66, 0.39);
    padding: 2px 10px;
    border-radius: 5px;
    width: 90%;
    position: relative;
  }

  pre {
    border-radius: 10px;
    padding: 25px;
    color: #44a3e7;
    background-color: #0d0d0d;

    code {
      width: 90%;
      background-color: transparent;
      position: relative;
    }

    code::before {
      content: " Copy";
      background-image: url(https://blog-app-resources.vercel.app/Images/copy.svg);
      background-repeat: no-repeat;
      background-size: 30px 25px;
      background-position: left center;
      background-color: #b6b6b6;
      padding: 5px 5px 5px 25px;
      border-radius: 5px;
      position: absolute;
      top: -10px;
      left: 680px;
      cursor: pointer;
      color: #3b3b3b;
    }
  }

  @media (min-width: 300px) and (max-width: 800px) {
    width: 95%;
    top: 10%;
    padding: 10px;
    .popup {
      top: 30px;
      left: 90%;
    }
    ol,
    ul {
      margin: 10px;
      margin-left: 0px;
    }
    table {
      margin: 0px;
      padding: 0px;
    }
    tr,
    td,
    th {
      border: 1px solid black;
      padding: 0px;
      margin: 0px;
    }
  }
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 10px;
`;

const Details = styled.div`
  color: var(--secondary-text);
  margin-bottom: 20px;
  font-size: 0.9em;
`;

const CoverImage = styled.img`
  width: 100%; // Makes the image take the full width of its container
  max-height: 450px; // Sets the maximum height to 450px
  object-fit: cover; // Ensures the image covers the entire area without distortion
  border-radius: 10px; // Rounds the corners of the image
  margin-bottom: 20px; // Adds space below the image
`;

const Content = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
`;

const Tags = styled.div`
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  color: var(--secondary-text);
`;

const Tag = styled.span`
  background: #eee;
  color: #555;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 5px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const LikeButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background: #0056b3;
  }
`;

const LikesCount = styled.span`
  font-size: 1.2em;
  color: var(--secondary-text);
`;

interface BlogTypeInterface {
  blogType: string;
}

const BlogDetailPage: React.FC<BlogTypeInterface> = ({ blogType }) => {
  const [showLikeAnimation, setshowLikeAnimation] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLikeLottie = () => {
    setshowLikeAnimation(true);
    setTimeout(() => {
      setshowLikeAnimation(false);
    }, 2000);
  };
  const defaultBlog: Blog = {
    blog_id: 0,
    username: "",
    blog_category_id: 0,
    blog_title: "Untitled Blog",
    blog_description: "This is a default blog description.",
    blog_content: "Start writing your blog content here...",
    blog_cover_image: null,
    blog_date: Date(),
    blog_read_time: "0 min",
    created_at: Date(),
    created_by: "system",
    modified_at: Date(),
    modified_by: "system",
    is_active: true,
    tags: [],
    category: "General",
    likes: 0,
  };

  const [blog, setBlog] = useState<Blog>(location.state?.blog || defaultBlog);
  const getBlog = async () => {
    // Ensure that blog.blog_id exists
    if (blog.blog_id) {
      const data = await getBlogById(blog.blog_id); // Await the asynchronous call
      return data; // Return the fetched data
    }
    return defaultBlog; // Return default if no blog_id
  };

  useEffect(() => {
    const fetchBlog = async () => {
      const blogData = await getBlog(); // Await the resolved data
      console.log("Blogs:", blogData);
      setBlog(blogData); // Set the state with the fetched blog data
      setLikes(blogData.likes);
    };

    fetchBlog(); // Call the fetch function
  }, [blog.blog_id]); // Dependency array with blog.blog_id
  let copiedCount = 0;
  const codeCopied = () => {
    if (copiedCount <= 1) {
      toast.success("Code Copied");
      copiedCount++;
    } else {
      copiedCount = 0;
    }
  };

  useEffect(() => {
    const blocContainer = document.getElementById("blogContent");
    if (blocContainer) {
      const htmlValue: any = marked(blog.blog_content) || "";
      blocContainer.innerHTML = htmlValue;
    }
    const userprofile = persistUserData.loadUserData();
    if (!userprofile.user_id) {
      navigate("/");
      return;
    }
  }, []);

  const [likes, setLikes] = useState(blog.likes);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const handleLike = () => {
    handleLikeLottie();
    setLikes(likes + 1);
    const existingsessionBlog: AllBlogsData | any =
      persistBlogData.loadBlogData();
    existingsessionBlog[blogType].forEach((sessionblog: Blog) => {
      if (sessionblog.blog_id === blog.blog_id) {
        blog.likes = likes + 1;
        persistBlogData.saveBlogData(existingsessionBlog);
      }
    });
    updateBlogLikes(blog.blog_id);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleSave = () => {
    // Logic to save the post
    // console.log("Post saved");
  };

  const handleShare = () => {
    // Logic to share the post
    // console.log("Post shared");
  };
  useEffect(() => {
    document.title = blog.blog_title;

    const codeBlogs = document.querySelectorAll("code");

    const handleCodeClick = (codeBlog: HTMLElement) => {
      if (codeBlog.className) {
        const textToCopy = codeBlog.textContent || "";
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = textToCopy;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        tempTextArea.setSelectionRange(0, 99999);

        navigator.clipboard
          .writeText(tempTextArea.value)
          .then(() => {
            codeCopied(); // Ensure this is called only once per click
          })
          .catch((err) => console.error("Failed to copy text:", err))
          .finally(() => {
            document.body.removeChild(tempTextArea);
          });
      }
    };

    // Attach event listeners
    codeBlogs.forEach((codeBlog) => {
      codeBlog.addEventListener("click", () => handleCodeClick(codeBlog));
    });

    // Cleanup function to remove event listeners
    return () => {
      codeBlogs.forEach((codeBlog) => {
        codeBlog.removeEventListener("click", () => handleCodeClick(codeBlog));
      });
    };
  }, [blog.blog_title]); // Include blog.blog_title to avoid unnecessary re-renders

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };

    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  if (!blog) {
    return <div>Blog not found</div>;
  }
  // console.log("Blog: ", blog);

  if (blog.blog_category_id == 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Go to Home Page</h1>
        <div
          style={{
            width: "90%",
            display: "block",
            border: "1px solid black",
            margin: "5%",
          }}
        ></div>
        <img
          onClick={() => navigate("/")}
          style={{ width: "50px" }}
          src="https://www.svgrepo.com/show/529027/home-1.svg"
          alt=""
        />
      </div>
    );
  }
  const isMobile = window.innerWidth <= 600;

  const FourNotFour = (
    <div
      style={{
        background: "var(--background)",
      }}
    >
      <div
        className="blogHeader"
        style={{
          width: "64.5%",
          height: "30px",
          position: "sticky",
          margin: "auto",
          top: "0px",
          zIndex: "1000",
          backdropFilter: "blur(10px) saturate(153%)",
          WebkitBackdropFilter: "blur(0px) saturate(153%)",
          backgroundColor: "rgba(255, 255, 255, 0)",
          border: "1px solid rgba(209, 213, 219, 0.3)",
          padding: "20px",
        }}
      >
        <svg
          onClick={() => navigate("/home")}
          xmlns="http://www.w3.org/2000/svg"
          fill="var(--primary-text)"
          height="25px"
          width="25px"
          version="1.1"
          id="Capa_1"
          viewBox="0 0 219.151 219.151"
          style={{
            position: "relative",
            left: isMobile ? "20px" : "50px",
          }}
        >
          <g>
            <path d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575   C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575   c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z" />
            <path d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008   c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825   c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628   c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z" />
          </g>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25px"
          height="25px"
          viewBox="0 0 16 16"
          fill="var(--primary-text)"
          className="bi bi-three-dots-vertical"
          onClick={togglePopup}
          style={{
            position: "relative",
            left: isMobile ? "85%" : "87%",
          }}
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
        {isPopupOpen && (
          <div ref={popupRef}>
            <BlogPopup
              onClose={togglePopup}
              onSave={handleSave}
              onShare={handleShare}
              isDetailPage={true}
            />
          </div>
        )}
      </div>
      <BlogContainer>
        <Toaster />
        <Title>{blog.blog_title}</Title>
        <Details>
          By {blog.username} | {blog.blog_date} | {blog.blog_read_time} |
          Category: {blog.category}
        </Details>
        <CoverImage
          className="blogCoverImage"
          src="https://inzonedesign.com/wp-content/uploads/2021/02/blog-cleverly-funny-creative-404-error-pages-metro.co_.uk_.jpg"
          alt="Blog Cover"
        />
        <Content id="blogContent"></Content>
        {blog.tags ? (
          <Tags>
            {blog.tags.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
        ) : (
          <Tags>
            {["Technology", "Programming", "Coding"].map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
        )}
        <Footer>
          <LikeButton onClick={handleLike}>Like</LikeButton>
          {showLikeAnimation && <LikeLottie />}
          <LikesCount>{likes} Likes</LikesCount>
        </Footer>
        <ScrollToTopButton />
      </BlogContainer>
    </div>
  );
  if (blog.blog_id == 404 && blog.username == "admin") {
    return FourNotFour;
  }

  return (
    <div
      style={{
        background: "var(--background)",
      }}
    >
      <div
        className="blogHeader"
        style={{
          width: "64.5%",
          height: "30px",
          position: "sticky",
          margin: "auto",
          top: "0px",
          zIndex: "1000",
          backdropFilter: "blur(10px) saturate(153%)",
          WebkitBackdropFilter: "blur(0px) saturate(153%)",
          backgroundColor: "rgba(255, 255, 255, 0)",
          border: "1px solid rgba(209, 213, 219, 0.3)",
          padding: "20px",
        }}
      >
        <svg
          onClick={() => navigate("/home")}
          xmlns="http://www.w3.org/2000/svg"
          fill="var(--primary-text)"
          height="25px"
          width="25px"
          version="1.1"
          id="Capa_1"
          viewBox="0 0 219.151 219.151"
          style={{
            position: "relative",
            left: isMobile ? "20px" : "50px",
          }}
        >
          <g>
            <path d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575   C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575   c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z" />
            <path d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008   c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825   c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628   c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z" />
          </g>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25px"
          height="25px"
          viewBox="0 0 16 16"
          fill="var(--primary-text)"
          className="bi bi-three-dots-vertical"
          onClick={togglePopup}
          style={{
            position: "relative",
            left: isMobile ? "85%" : "87%",
          }}
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
        {isPopupOpen && (
          <div ref={popupRef}>
            <BlogPopup
              onClose={togglePopup}
              onSave={handleSave}
              onShare={handleShare}
              isDetailPage={true}
            />
          </div>
        )}
      </div>
      <BlogContainer>
        <Toaster />
        <Title>{blog.blog_title}</Title>
        <Details>
          By {blog.username} | {blog.blog_date} | {blog.blog_read_time} |
          Category: {blog.category}
        </Details>
        <CoverImage
          className="blogCoverImage"
          src={`data:image/jpeg;base64,${blog.blog_cover_image}`}
          alt="Blog Cover"
        />
        <Content id="blogContent"></Content>
        {blog.tags ? (
          <Tags>
            {blog.tags.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
        ) : (
          <Tags>
            {["Technology", "Programming", "Coding"].map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
        )}
        <Footer>
          <LikeButton onClick={handleLike}>Like</LikeButton>
          {showLikeAnimation && <LikeLottie />}
          <LikesCount>{likes} Likes</LikesCount>
        </Footer>
        <ScrollToTopButton />
      </BlogContainer>
    </div>
  );
};
export default BlogDetailPage;
