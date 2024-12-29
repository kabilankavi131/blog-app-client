import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BlogPopup } from "./BlogPopup"; // Ensure to import
import { Blog, BlogProps } from "../interfaces/interface";
import toast, { Toaster } from "react-hot-toast";
import { persistBlogData, updateBlogLikes } from "../services/services";
import LikeLottie from "./Lottie Files/LikeLoader";

const BlogContainer = styled.div`
  width: 90%;
  margin: 20px 0px;
  padding: 20px;
  box-shadow: 0 4px 8px var(--border-color);
  background: var(--background);
  border-radius: 10px;
  color: var(--primary-text);
  position: relative;
  &:first-child {
    margin-top: 150px;
  }
  @media (min-width: 300px) and (max-width: 800px) {
    left: -2px;
  }
`;

const NormalDiv = styled.div`
  width: 100%;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 10px;
  color: var(--primary-text);
`;

const Details = styled.div`
  color: var(--secondary-text);
  margin-bottom: 20px;
  font-size: 0.9em;
`;

const CoverImage = styled.img`
  width: 30%;
  margin: 20px;
  max-height: 500px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
  float: left;
`;

const Content = styled.p`
  width: 100%;
  font-size: 1.2em;
  line-height: 1.6;
  min-height: 100px;
  box-sizing: border-box;
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
  color: var(--secondary-text);
`;

const BlogItem: React.FC<BlogProps> = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showLikeAnimation, setshowLikeAnimation] = useState<boolean>(false);
  const navigate = useNavigate();
  const popupRef = useRef<HTMLDivElement>(null);
  const handleLikeLottie = () => {
    setshowLikeAnimation(true);
    setTimeout(() => {
      setshowLikeAnimation(false);
    }, 2000);
  };
  const handleLike = () => {
    handleLikeLottie();
    setLikes(likes + 1);
    const existingsessionBlog: Blog[] | any = persistBlogData.loadBlogData();

    const updatedBlogs = existingsessionBlog?.map((sessionblog: Blog) => {
      if (sessionblog.blog_id === blog.blog_id) {
        return {
          ...sessionblog,
          likes: sessionblog.likes + 1, // Update the likes for the specific blog
        };
      }
      return sessionblog; // Return the unchanged blog if it doesn't match
    });

    persistBlogData.saveBlogData(updatedBlogs); // Save the updated blog data
    updateBlogLikes(blog.blog_id);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleSave = () => {
    // console.log("Post saved");
  };

  const handleShare = () => {
    // console.log("Post shared");
  };

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

  const Blog = (
    <BlogContainer>
      <Toaster />
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
          left: "95%",
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
            isDetailPage={false}
          />
        </div>
      )}
      <NormalDiv
        onClick={() => navigate(`/blog/${blog.blog_id}`, { state: { blog } })}
      >
        <Title>{blog.blog_title}</Title>
        <Details>
          By {blog.username} | {blog.blog_date} | {blog.blog_read_time} |
          Category: {blog.category} | 100 Views
        </Details>
        <CoverImage
          src={
            blog.blog_id == 404 && blog.username == "admin"
              ? "https://inzonedesign.com/wp-content/uploads/2021/02/blog-cleverly-funny-creative-404-error-pages-metro.co_.uk_.jpg"
              : `data:image/jpeg;base64,${blog.blog_cover_image}`
          }
          alt="Blog Cover"
        />
        <Content>{blog.blog_description}</Content>
        <Tags>
          {blog.tags.map((tag: string) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
      </NormalDiv>

      <Footer>
        <LikeButton onClick={handleLike}>Like</LikeButton>
        {showLikeAnimation && <LikeLottie />}
        <LikesCount>{likes} Likes</LikesCount>
      </Footer>
    </BlogContainer>
  );

  return Blog;
};
export default BlogItem;
