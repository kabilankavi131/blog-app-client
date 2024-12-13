import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Blog } from "../interfaces/interface";

const AddBlog: React.FC = () => {
  const [formState, setFormState] = useState<Blog>({
    blog_id: 0,
    author_id: "",
    blog_category_id: 0,
    blog_title: "",
    blog_content: "",
    blog_cover_image: "",
    blog_date: "",
    blog_read_time: "",
    tags: [],
    category: "",
    likes: 0,
    is_active: false,
  });

  const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add blog submission logic here
    console.log(formState);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <BackButton onClick={() => navigate("/home")}>← Back</BackButton>
      <h1>Add New Blog</h1>
      <Input
        type="text"
        name="blog_title"
        placeholder="Title"
        onChange={handleChange}
        required
      />
      <TextArea
        name="blog_content"
        placeholder="Content"
        rows={10}
        onChange={handleChange}
        required
      />
      <Input
        type="file"
        name="blog_cover_image"
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="blog_date"
        placeholder="Date Ex (December 10, 2024)"
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="blog_read_time"
        placeholder="Read Time Ex(7 min read)"
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        onChange={handleChange}
        required
      />
      <Select name="category" onChange={handleChange} required>
        <option value="" selected disabled>
          Select a Category
        </option>
        <option value="Development">Development</option>
        <option value="Design">Design</option>
        <option value="Marketing">Marketing</option>
        <option value="Business">Business</option>
      </Select>
      <Button type="submit">Add Blog</Button>
    </Form>
  );
};

export default AddBlog;

const Form = styled.form`
  width: 60%;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  border-radius: 10px;
  position: relative;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 95%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  background: rgb(56, 193, 95);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;
  position: relative;
  left: 85%;

  //Mobile Screen
  @media (min-width: 300px) and (max-width: 800px) {
    left: 60%;
  }
  &:hover {
    background: #0056b3;
  }
`;

const BackButton = styled.button`
  position: relative;
  top: -10px;
  left: -10px;
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
const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
