import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Blog, Categories } from "../interfaces/interface";
import { persistUserData } from "../services/services";
import client from "../client/client";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddBlog: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sanitizedContent, setSanitizedContent] = useState<string>("");

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
      matchVisual: true, // Match the visual format when pasting
    },
    history: {
      delay: 200, // Delay for history tracking
      maxStack: 500, // Maximum stack size
      userOnly: true, // Only track user actions
    },
    keyboard: {
      bindings: {
        // Custom keyboard shortcuts can be defined here
      },
    },
  };

  // Define font options
  // Define font options
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
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    };
    const user = persistUserData.loadUserData();
    console.log("User in write", user);
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

  const openPreview = () => {
    const element = document.getElementById("preview");
    if (element instanceof HTMLElement) {
      element.style.visibility = "visible";
      element.innerHTML = formState.blog_content;
    }
  };

  const closePreview = () => {
    const element = document.getElementById("preview");
    if (element instanceof HTMLElement) {
      element.style.visibility = "hidden";
    }
  };

  const addPost = async (payload: Blog) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      const value = (payload as any)[key];
      formData.append(key, value instanceof File ? value : value.toString());
    });
    const loader = toast.loading("Blog Uploading");

    try {
      const response = await client(
        "https://blogspace-app-server.vercel.app/blogs/upload",
        "POST",
        formData
      );
      console.log(response);
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

  // if (loading) {
  //   return (
  //     <LoadingContainer>
  //       <img
  //         style={{ width: "150px" }}
  //         src="https://blog-app-resources.vercel.app/Images/loading.gif"
  //         alt="Loading"
  //       />
  //       <h1>Loading...</h1>
  //     </LoadingContainer>
  //   );
  // }

  // if (error) {
  //   return <ErrorMessage>{error}</ErrorMessage>;
  // }

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
      <div className="original" id="preview">
        <button id="btn" onClick={closePreview}>
          Close
        </button>
      </div>
      {/* <Preview id="preview"></Preview> */}
      {/* <PreviewButton onClick={openPreview}>Preview</PreviewButton> */}
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
  .original {
    padding: 20px;
    position: absolute;
    top: 0;
    width: 60%;
    display: none;
    height: 500px;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: gray;
    color: white;
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
  }
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
const MarkDown = styled.div`
  position: absolute;
  width: 90%;
  max-height: 300px;
`;
const Preview = styled.div`
  z-index: 1000;
  width: 80%;
  height: 500px;
  position: relative;
  display: none;
  padding: 40px;
  top: 40%;
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
    border-collapse: collapse;
    width: 80%;
    border-width: 1px;
    margin: 20px;
  }
  td,
  th {
    border: 1px solid white;
    padding: 5px;
  }
  hr {
    width: 80%;
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
    width: 90%;
    margin: 10px;
    line-height: 25px;
  }
  code {
    width: 80%;
    background-color: rgba(66, 66, 66, 0.39);
    padding: 2px 10px;
    border-radius: 5px;
    width: 90%;
    position: relative;
  }
  pre {
    border-radius: 10px;
    padding: 25px;
    width: 80%;
    color: #44a3e7;
    background-color: #0d0d0d;
    code {
      width: 90%;
      background-color: transparent;
      position: relative;
    }
    code::before {
      position: relative;
      content: "Copy Code";
      background-color: green;
      padding: 5px;
      border-radius: 5px;
      top: -10px;
      color: white;
      right: -80%;
    }
  }
  @media (min-width: 300px) and (max-width: 800px) {
    width: 100%;
    position: relative;
    top: -500px;
    overflow-x: hidden;
    height: 500px;
    padding: 10px;
    pre {
      width: 80%;
      height: "100px";
      background-color: gray;
      overflow-y: scroll;
    }
  }
`;

const PreviewButton = styled(Button)`
  background: rgb(244, 131, 51);
  margin: 5px;
  &:hover {
    background: #0056b3;
  }
  @media (min-width: 300px) and (max-width: 800px) {
    left: 30%;
  }
`;

const ClosePreview = styled.div`
  position: fixed;
  top: 100px;
  z-index: 2000;
  background-color: orange;
  right: 10px;
  @media (min-width: 300px) and (max-width: 800px) {
    left: 70%;
  }
`;

const Select = styled.select`
  width: 98%;
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
