import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Blog, Categories } from "../interfaces/interface";
import { persistUserData } from "../services/services";
import client from "../client/client";
import ReactMarkdown from "react-markdown";

const AddBlog: React.FC = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const userDetails = persistUserData.loadUserData();
  // Fetch categories from the API
  const getCategories = async () => {
    try {
      const response: Categories[] = await client(
        "http://localhost:5000/categories",
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

  useEffect(() => {
    if (!userDetails.user_id) {
      navigate("/login");
    } else {
      getCategories();
    }
  }, [userDetails.user_id, navigate]);

  const [formState, setFormState] = useState<Blog>({
    blog_id: 0,
    author_id: "admin_1",
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

  const openPreview = () => {
    const element: any = document.getElementById("preview");
    element.style.display = "block";
  };
  const closePreview = () => {
    const element: any = document.getElementById("preview");
    element.style.display = "none";
  };

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

    const response = await client(
      "http://localhost:5000/blogs/upload",
      "POST",
      formData
    );
    console.log("Post Response: ", response);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost(formState);
    console.log("Form Data: ", formState);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // e.preventDefault(); // Prevent the default action (navigation)
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <img
          style={{ width: "150px" }}
          src="https://blog-app-resources.vercel.app/Images/loading.gif"
          alt=""
        />
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
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
        placeholder='Write a blog post using Markdown. Follow these tips for a structured and engaging post:
 1. Title: Start with a clear and captivating title. Example: `# Responsive Web Design Principles`  
 2. Introduction: Introduce your topic with a brief overview. Example: "Responsive web design ensures websites look great on all devices.  
 3. Subheadings: Use subheadings (`##`) to organize your content into sections like definitions, principles, or best practices.   
 4. Code Blocks: Showcase examples using fenced code blocks (```css, ```html).  
 5. Lists: Highlight tips or steps with bullet points or numbered lists.  
 6. Underline: Use (---) to add a new underline.   
 7. Conclusion: End with a summary or call to action to engage your audience.  

Start creating your post! Example:  
```markdown
# Responsive Web Design Principles  

Responsive web design ensures websites provide an optimal experience on all devices. This guide covers fluid grids, flexible images, and more!  

        '
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
        name="blog_tags"
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
        <div
          onClick={closePreview}
          style={{
            position: "absolute",
            cursor: "pointer",
            left: "90%",
            top: "1px",
            padding: "5px",
          }}
          title="Close"
        >
          <img
            style={{
              width: "30px",
              marginBottom: "100px",
            }}
            src="https://www.svgrepo.com/show/522801/close-circle.svg"
            alt=""
          />
        </div>
        <ReactMarkdown>{formState.blog_content}</ReactMarkdown>
      </Preview>
      <PreviewButton title="Preview Your Content" onClick={openPreview}>
        Preview
      </PreviewButton>
      <Button title="Add Blog" type="submit">
        Add Blog
      </Button>
    </Form>
  );
};

export default AddBlog;

// Styled components
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
  padding: 20px;
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

  @media (min-width: 300px) and (max-width: 800px) {
    left: 35%;
  }
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
  padding: 40px 40px;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: scroll;
  color: rgb(113, 207, 196);
  border-radius: 20px;
  background-color: #1e1e1e;
`;

const PreviewButton = styled.button`
  background: rgb(244, 131, 51);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;
  position: relative;
  left: 70%;
  @media (min-width: 300px) and (max-width: 800px) {
    left: 20%;
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
