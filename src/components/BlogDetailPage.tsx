import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Blog } from "../interfaces/interface";

interface BlogDetailProps {
  blogs: Blog[];
}

const BlogContainer = styled.div`
  width: 60%;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  border-radius: 10px;
  color: #333;
  position: relative;
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
  max-height: 400px;
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

const blog = {
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
  tags: ["JavaScript", "ES6", "Programming"],
  category: "Development",
  likes: 30,
};

const BlogDetailPage: React.FC = () => {
  const [likes, setLikes] = useState(blog.likes);
  const navigate = useNavigate();

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const { id = "" } = useParams<{ id: string }>();

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <BlogContainer>
      <BackButton onClick={() => navigate("/home")}>← Back</BackButton>
      <Title>{blog.blog_title}</Title>
      <Details>
        By {blog.author_id} | {blog.blog_date} | {blog.blog_read_time} |
        Category: {blog.category}
      </Details>
      <CoverImage src={blog.blog_cover_image} alt="Blog Cover" />
      <Content>{blog.blog_content}</Content>
      <Tags>
        {blog.tags.map((tag: string) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>
      <Footer>
        <LikeButton onClick={handleLike}>Like</LikeButton>
        <LikesCount>{likes} Likes</LikesCount>
      </Footer>
    </BlogContainer>
  );
};

export default BlogDetailPage;
