import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Blog, Categories } from "../interfaces/interface";
import { getDateUptoYear, persistUserData } from "../services/services";
import client from "../client/client";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddBlog: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Categories[]>([]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // Header options
      [{ font: [] }], // Font options
      ["bold", "italic", "underline", "strike"], // Formatting options
      [{ list: "ordered" }, { list: "bullet" }], // List options
      ["link", "image", "video"], // Insert link, image, video
      [{ color: [] }, { background: [] }], // Color options
      [{ align: [] }], // Alignment options
      ["clean"], // Clear formatting button
      ["code-block"], // Code block option
      ["formula"], // Formula option
      ["table"], // Table option
      ["blockquote"], // Blockquote option
      ["fullscreen"], // Fullscreen option
    ],
    clipboard: {
      matchVisual: true,
    },
    history: {
      delay: 200,
      maxStack: 500,
      userOnly: true,
    },
    keyboard: {
      bindings: {},
    },
  };

  const Font = Quill.import("formats/font");
  Font.whitelist = [
    "sans-serif",
    "serif",
    "monospace",
    "Arial",
    "Georgia",
    "Impact",
    "Tahoma",
    "Times New Roman",
    "Verdana",
    "Courier New", // Added
    "Comic Sans MS", // Added
    "Lucida Console", // Added
    "Trebuchet MS", // Added
    "Palatino Linotype", // Added
    "Garamond", // Added
    "Century Gothic", // Added
    "Segoe UI", // Added
    "Helvetica", // Added
  ]; // Add any other fonts you want to include
  Quill.register(Font, true);

  const userDetails = persistUserData.loadUserData();

  const [formState, setFormState] = useState<Blog>({
    blog_id: 0,
    username: userDetails?.user_id || "",
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

  // Fetch categories
  const getCategories = async () => {
    try {
      const response: Categories[] = await client(
        "https://blogspace-app-server.vercel.app/categories",
        "GET",
        ""
      );
      setCategories(response);
    } catch (err) {
      console.log("Error while getting categories : ", err);

      return err;
    } finally {
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    };
    const user = persistUserData.loadUserData();
    // console.log("User in write", user);
    if (!user.user_id) {
      navigate("/");
    }

    window.addEventListener("keydown", handleKeyDown);
    if (userDetails?.user_id) {
      getCategories();
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [userDetails?.user_id]);

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
      formData.append(key, value instanceof File ? value : value.toString());
    });
    const loader = toast.loading("Blog Uploading");
    formData.append("blog_date", getDateUptoYear());
    try {
      const response = await client(
        "https://blogspace-app-server.vercel.app/blogs/upload",
        "POST",
        formData
      );

      toast.dismiss(loader);
      if (response.message) {
        toast.success("Blog Posted Successfully!");
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error("Failed to upload blog");
      }
    } catch (err) {
      return err;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.blog_content) {
      toast.error("Please enter blog content");
    } else {
      addPost(formState);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Toaster />
      </div>
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
      <ReactQuill
        modules={modules}
        theme="snow"
        className="blogContent"
        placeholder="Write your blog..."
        onChange={(content) => {
          setFormState((prev) => ({
            ...prev,
            blog_content: content,
          }));
        }}
      />
      <Input
        type="file"
        name="blog_cover_image"
        onChange={handleFileChange}
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
      <Button type="submit">Add Blog</Button>
    </Form>
  );
};

// Styled Components...
export default AddBlog;

const Form = styled.form`
  width: 60%;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  border-radius: 10px;
  position: relative;
  .blogContent {
    position: relative;
    width: 98%;
    margin-bottom: 80px;
    height: 300px;
  }
  img {
    width: 90%;
    margin: 20px;
  }

  pre {
    background-color: #0d0d0d;
    color: #007bff;
    width: 100%;
    padding: 100%;
    overflow-y: scroll;
  }
  pre code {
    width: 90%;
  }
  @media (min-width: 300px) and (max-width: 800px) {
    width: 85%;
    .blogContent {
      margin-bottom: 120px;
    }
  }
`;

const Input = styled.input`
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
  left: 75%;
  margin: 3px;

  &:hover {
    background: #0056b3;
  }
  @media (min-width: 300px) and (max-width: 800px) {
    left: 35%;
  }
`;

const BackButton = styled(Button)`
  left: -10px;
  background: #007bff;

  &:hover {
    background: #0056b3;
  }
  @media (min-width: 300px) and (max-width: 800px) {
    top: -15px;
  }
`;

const Select = styled.select`
  width: 98%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
