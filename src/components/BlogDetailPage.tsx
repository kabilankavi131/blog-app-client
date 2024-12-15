import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ThreeDotsButton, BlogPopup } from "./BlogPopup"; // Ensure to import
import { Blog } from "../interfaces/interface";
import toast, { Toaster } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
    width: 95%;
    max-height: 400px;
    margin: 20px;
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
    width: 90%;
  }
`;

const BackButton = styled.button`
  position: relative;
  top: -5px;
  left: 0px;
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
  const blog: Blog = location.state?.blog;

  let copiedCount = 0;
  const codeCopied = () => {
    if (copiedCount <= 1) {
      toast.success("Code Copied");
      copiedCount++;
    } else {
      copiedCount = 0;
    }
  };
  const [likes, setLikes] = useState(blog.likes);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef<HTMLDivElement>(null);
  const handleLike = () => {
    setLikes(likes + 1);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleSave = () => {
    // Logic to save the post
    console.log("Post saved");
  };

  const handleShare = () => {
    // Logic to share the post
    console.log("Post shared");
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
  return (
    <BlogContainer>
      <Toaster />
      <BackButton onClick={() => navigate("/home")}>← Back</BackButton>
      <ThreeDotsButton onClick={togglePopup}>⋮</ThreeDotsButton>
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
      <Title>{blog.blog_title}</Title>
      <Details>
        By {blog.username} | {blog.blog_date} | {blog.blog_read_time} |
        Category: {blog.category}
      </Details>
      <CoverImage
        src={`data:image/jpeg;base64,${blog.blog_cover_image}`}
        alt="Blog Cover"
      />
      <Content>
        <Markdown remarkPlugins={[remarkGfm]}>{blog.blog_content}</Markdown>
      </Content>
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
    </BlogContainer>
  );
};

export default BlogDetailPage;
