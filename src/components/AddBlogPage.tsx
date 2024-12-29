import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AllBlogsData, Blog, Categories } from "../interfaces/interface";
import {
  getBlogs,
  getDateUptoYear,
  persistBlogData,
  persistUserData,
} from "../services/services";
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
        {}
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

  const updateRecentPosts = async () => {
    try {
      const freshBlogs: Blog[] = await getBlogs(0, "Latest");

      let indexDBData: AllBlogsData | any =
        (await persistBlogData.loadBlogData()) || {
          Trending: [],
          Latest: [],
          Featured: [],
        };

      indexDBData["Latest"] = [...(indexDBData["Latest"] || []), ...freshBlogs];

      console.log("Updated Blog Data:", indexDBData);

      await persistBlogData.saveBlogData(indexDBData);
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error in updateRecentPosts:", error);
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
        await updateRecentPosts();
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
      <Toaster />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="var(--primary-text)"
        height="30px"
        width="30px"
        version="1.1"
        id="Layer_1"
        viewBox="0 0 512 512"
        onClick={() => navigate("/home")}
      >
        <g>
          <g>
            <g>
              <path d="M490.667,234.667H158.17l112.915-112.915c8.331-8.331,8.331-21.839,0-30.17s-21.839-8.331-30.17,0L91.582,240.915     c-0.497,0.497-0.967,1.02-1.413,1.563c-0.202,0.246-0.378,0.506-0.568,0.759c-0.228,0.304-0.463,0.601-0.674,0.917     c-0.203,0.303-0.379,0.618-0.564,0.929c-0.171,0.286-0.351,0.566-0.509,0.861c-0.169,0.317-0.313,0.643-0.465,0.966     c-0.145,0.308-0.299,0.611-0.43,0.926c-0.13,0.314-0.235,0.635-0.349,0.953c-0.122,0.338-0.251,0.672-0.356,1.018     c-0.096,0.318-0.167,0.642-0.248,0.963c-0.089,0.353-0.188,0.702-0.259,1.061c-0.074,0.372-0.117,0.747-0.171,1.122     c-0.045,0.314-0.105,0.623-0.136,0.941c-0.068,0.693-0.105,1.388-0.105,2.083c0,0.007-0.001,0.015-0.001,0.022     s0.001,0.015,0.001,0.022c0.001,0.695,0.037,1.39,0.105,2.083c0.031,0.318,0.091,0.627,0.136,0.941     c0.054,0.375,0.097,0.75,0.171,1.122c0.071,0.36,0.17,0.708,0.259,1.061c0.081,0.322,0.151,0.645,0.248,0.963     c0.105,0.346,0.234,0.68,0.356,1.018c0.114,0.318,0.219,0.639,0.349,0.953c0.131,0.316,0.284,0.618,0.43,0.926     c0.152,0.323,0.296,0.649,0.465,0.966c0.158,0.295,0.338,0.575,0.509,0.861c0.186,0.311,0.361,0.626,0.564,0.929     c0.211,0.316,0.447,0.613,0.674,0.917c0.19,0.253,0.365,0.513,0.568,0.759c0.446,0.544,0.916,1.067,1.413,1.563l149.333,149.333     c8.331,8.331,21.839,8.331,30.17,0s8.331-21.839,0-30.17L158.17,277.333h332.497c11.782,0,21.333-9.551,21.333-21.333     S502.449,234.667,490.667,234.667z" />
              <path d="M21.333,85.333C9.551,85.333,0,94.885,0,106.667v298.667c0,11.782,9.551,21.333,21.333,21.333     c11.782,0,21.333-9.551,21.333-21.333V106.667C42.667,94.885,33.115,85.333,21.333,85.333z" />
            </g>
          </g>
        </g>
      </svg>
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
  box-shadow: 0 4px 8px var(--shadow-color);
  background: var(--background);
  color:var(--primary-text)
  border-radius: 10px;
  position: relative;
  .blogContent {
    position: relative;
    width: 98%;
    margin-bottom: 80px;
    height: 300px;
     color:var(--secondary-text);
  }
  .blogContent .ql-editor::before {
  color:var(--primary-text);
}

.blogContent .ql-editor {
    color:var(--secondary-text);
}
    .ql-toolbar .ql-stroke {
    fill: none;
    stroke:  var(--primary-text);
}

.ql-toolbar .ql-fill {
    fill:  var(--primary-text);
    stroke: none;
}

.ql-toolbar .ql-picker {
    color:  var(--primary-text);
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
  color: var(--primary-text);
  &::placeholder {
    color: var(--primary-text);
  }
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

const Select = styled.select`
  width: 98%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: var(--primary-text);
`;
