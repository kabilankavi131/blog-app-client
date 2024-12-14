import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ThreeDotsButton, BlogPopup } from "./BlogPopup"; // Ensure to import
import { Blog } from "../interfaces/interface";
import ReactMarkdown from "react-markdown";

const BlogContainer = styled.div`
  width: 60%;
  margin: 20px auto;
  padding: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.31);
  background: #ffffff;
  border-radius: 10px;
  color: #333;
  position: relative;
  pre {
    // white-space: pre-wrap;
    padding: 20px;
    box-sizing: border-box;
    background-color: #1e1e1e;
    color: #95d2f2;
    overflow-x: auto;
    margin: 10px 0px;
    border-radius: 10px;
  }
  code {
    background-color: rgba(66, 66, 66, 0.39);
    padding: 1px 10px;
    border-radius: 5px;
    position: relative;
  }
  pre {
    code {
      background-color: transparent;
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
  }, []);
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
        By {blog.author_id} | {blog.blog_date} | {blog.blog_read_time} |
        Category: {blog.category}
      </Details>
      <CoverImage
        src={`data:image/jpeg;base64,${blog.blog_cover_image}`}
        alt="Blog Cover"
      />
      <Content>
        <ReactMarkdown>{blog.blog_content}</ReactMarkdown>
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
