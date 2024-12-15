import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Blog, Categories } from "../interfaces/interface";
import { persistUserData } from "../services/services";
import client from "../client/client";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AddBlog: React.FC = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const userDetails = persistUserData.loadUserData();
  const [formState, setFormState] = useState<Blog>({
    blog_id: 0,
    username: userDetails.user_id,
    blog_category_id: 1,
    blog_title: "",
    blog_description: "",
    blog_content: "",
    blog_cover_image: null,
    blog_date: "",
    blog_read_time: "",
    created_at: new Date().toISOString(),
    created_by: "",
    modified_at: new Date().toISOString(),
    modified_by: "",
    is_active: false,
    tags: [],
    category: "",
    likes: 0,
  });

  // Fetch categories from the API
  const getCategories = async () => {
    try {
      const response: Categories[] = await client(
        "https://blogspace-app-server.vercel.app/categories",
        "GET",
        ""
      );
      setCategories(response);
      console.log("Categories: ", response);
    } catch (err) {
      setError("Failed to load categories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  // Add the event listener
  window.addEventListener("keydown", handleKeyDown);
  useEffect(() => {
    if (!userDetails.user_id) {
      navigate("/login");
    } else {
      getCategories();
    }
  }, [userDetails.user_id, navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
      blog_category_id:
        name === "category" ? Number(value) : prev.blog_category_id,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormState((prev) => ({
        ...prev,
        blog_cover_image: files[0],
      }));
    }
  };

  const openPreview = () => {
    const element: HTMLElement | null = document.getElementById("preview");
    if (element) element.style.display = "block";
  };

  const closePreview = () => {
    const element: HTMLElement | null = document.getElementById("preview");
    if (element) element.style.display = "none";
  };

  const addPost = async (payload: Blog) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      const value = (payload as any)[key];
      if (key === "blog_cover_image") {
        formData.append(key, value);
      } else {
        formData.append(key, value.toString());
      }
    });

    try {
      const response = await client(
        "https://blogspace-app-server.vercel.app/blogs/upload",
        "POST",
        formData
      );
      console.log("Post Response: ", response);
    } catch (err) {
      console.error("Failed to upload blog: ", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data: ", formState);
    addPost(formState);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <img
          style={{ width: "150px" }}
          src="https://blog-app-resources.vercel.app/Images/loading.gif"
          alt="Loading"
        />
        <h1>Loading...</h1>
      </LoadingContainer>
    );
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

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
      <Input
        type="text"
        name="blog_description"
        placeholder="Description"
        onChange={handleChange}
        required
      />
      <TextArea
        name="blog_content"
        placeholder="Write a blog post using Markdown..."
        rows={17}
        onChange={handleChange}
        required
      />
      <Input
        type="file"
        name="blog_cover_image"
        onChange={handleFileChange}
        required
      />
      <Input
        type="text"
        name="blog_date"
        placeholder="Date (e.g., December 10, 2024)"
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="blog_read_time"
        placeholder="Read Time (e.g., 7 min read)"
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
      <Select
        name="category"
        value={formState.category}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select a Category
        </option>
        {categories.map((category) => (
          <option key={category.category_id} value={category.category_id}>
            {category.category_name}
          </option>
        ))}
      </Select>
      <Preview id="preview">
        <ClosePreview onClick={closePreview}>
          <img
            title="Close"
            style={{
              width: "30px",
              margin: "10px",
            }}
            src="https://blog-app-resources.vercel.app/Images/close-square.svg"
            alt=""
          />
        </ClosePreview>
        <Markdown remarkPlugins={[remarkGfm]}>
          {formState.blog_content}
        </Markdown>
      </Preview>
      <PreviewButton onClick={openPreview}>Preview</PreviewButton>
      <Button type="submit">Add Blog</Button>
    </Form>
  );
};

export default AddBlog;

// Styled Components
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
  resize: none;
  white-space: pre-wrap;
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
  left: 75%;

  &:hover {
    background: #0056b3;
  }
`;

const BackButton = styled(Button)`
  left: -10px;
  background: #007bff;

  &:hover {
    background: #0056b3;
  }
`;

const Preview = styled.div`
  z-index: 1000;
  width: 100%;
  height: 50%;
  position: absolute;
  display: none;
  padding: 40px;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: scroll;
  color: rgb(113, 207, 196);
  border-radius: 20px;
  background-color: rgb(30, 30, 30);
  img {
    width: 95%;
    max-height: 400px;
    margin: 20px;
  }
  table {
    // border-style: solid;
    border-collapse: collapse;
    width: 95%;
    border-width: 1px;
    margin: 20px;
  }
  td,
  th {
    border: 1px solid white;
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
  pre {
    margin: 5px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 10px;
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
      position: absolute;
      content: "Copy Code";
      background-color: green;
      padding: 5px;
      border-radius: 5px;
      top: -10px;
      color: white;
      left: 700px;
    }
  }
`;

const PreviewButton = styled(Button)`
  background: rgb(244, 131, 51);

  &:hover {
    background: #0056b3;
  }
`;

const ClosePreview = styled.div`
  position: absolute;
  cursor: pointer;
  left: 90%;
  top: 1px;
  padding: 5px;
  color: #fff;
  font-size: 1.2em;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const LoadingContainer = styled.div`
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
`;
