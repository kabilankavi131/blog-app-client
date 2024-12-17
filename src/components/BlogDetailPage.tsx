import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ThreeDotsButton, BlogPopup } from "./BlogPopup"; // Ensure to import
import { Blog } from "../interfaces/interface";
import toast, { Toaster } from "react-hot-toast";
import { marked } from "marked";
import { persistUserData } from "../services/services";
import ScrollToTopButton from "./ScrollToTopButton";
const BlogContainer = styled.div`
  width: 60%;
  margin: 20px auto;
  padding: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.31);
  background: #ffffff;
  border-radius: 10px;
  color: #333;

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
    max-height: 400px;
    margin: 20px 0px;
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

  ol,
  ul {
    margin: 10px;
    margin-left: 50px;
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
    .blogCoverImage {
      margin: 0px;
      width: 100%;
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
  color: #666;
  margin-bottom: 20px;
  font-size: 0.9em;
`;

const CoverImage = styled.img`
  width: 100%;
  max-height: 450px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Content = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
`;

const Tags = styled.div`
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
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
  color: #333;
`;

const BlogDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  const blog: Blog = location.state?.blog || defaultBlog;
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
    setLikes(likes + 1);
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
  return (
    <div>
      <div
        className="blogHeader"
        style={{
          width: "90%",
          height: "30px",
          position: "sticky",
          top: "0px",
          zIndex: "1000",
          backdropFilter: "blur(10px) saturate(153%)",
          WebkitBackdropFilter: "blur(0px) saturate(153%)",
          backgroundColor: "rgba(255, 255, 255, 0)",
          borderRadius: "12px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
          padding: "20px",
        }}
      >
        <img
          className="backButton"
          src="https://www.svgrepo.com/show/18507/back-button.svg"
          alt=""
          onClick={() => navigate("/home")}
          style={{
            width: "30px",
            cursor: "pointer",
            position: "relative",
            top: "10px",
            left: "10%",
          }}
        />
        <ThreeDotsButton
          style={{
            left: isMobile ? "85%" : "87%",
          }}
          className="popup"
          onClick={togglePopup}
        >
          ⋮
        </ThreeDotsButton>
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
          <LikesCount>{likes} Likes</LikesCount>
        </Footer>
        <ScrollToTopButton />
      </BlogContainer>
    </div>
  );
};
export default BlogDetailPage;
