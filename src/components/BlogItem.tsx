import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export interface Blog {
  blog_id: number;
  author_id: string;
  blog_category_id: number;
  blog_title: string;
  blog_content: string;
  blog_cover_image: string;
  blog_date: string;
  blog_read_time: string;
  tags: string[];
  category: string;
  likes: number;
  is_active: boolean;
}

interface BlogProps {
  blog: Blog;
}

const BlogContainer = styled.div`
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  border-radius: 10px;
  color: #333;
  position: relative;

  &:first-child {
    margin-top: 150px;
  }
`;
const NormalDiv = styled.div`
  width: 100%;
  position: relative;
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
  width: 30%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
  float: left;
`;

const Content = styled.p`
  width: 100%;
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

const BlogItem: React.FC<BlogProps> = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes);
  const navigate = useNavigate();
  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <BlogContainer>
      <NormalDiv onClick={() => navigate("/blog/0")}>
        <Title>{blog.blog_title}</Title>
        <Details>
          By {blog.author_id} | {blog.blog_date} | {blog.blog_read_time} |
          Category: {blog.category}
        </Details>
        <CoverImage src={blog.blog_cover_image} alt="Blog Cover" />
        <Content>{blog.blog_content}</Content>
        <Tags>
          {blog.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
      </NormalDiv>

      <Footer>
        <LikeButton onClick={handleLike}>Like</LikeButton>
        <LikesCount>{likes} Likes</LikesCount>
      </Footer>
    </BlogContainer>
  );
};

export default BlogItem;
