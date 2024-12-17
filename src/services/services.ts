import axios from "axios";
import { blogs } from "../constants/constants";
import { Blog, UserProfile } from "../interfaces/interface";
import client from "../client/client";

export const getBlogDetails = (id: number): Blog | undefined => {
  const book = blogs.find((_, index) => index == id);
  if (book) return book;
  const defaultBlog: Blog = {
    blog_id: 0, // Default ID for the blog
    username: "", // Default author ID
    blog_category_id: 0, // Default category ID
    blog_title: "", // Default title
    blog_description: "", // Default description
    blog_content: "", // Default content
    blog_cover_image: null, // Default cover image URL
    blog_date: "", // Default publication date
    blog_read_time: "", // Default read time
    created_at: new Date().toISOString(), // Default creation timestamp
    created_by: "", // Default creator ID
    modified_at: new Date().toISOString(), // Default last modified timestamp
    modified_by: "", // Default last modifier ID
    is_active: false, // Default active status
    tags: [], // Default tags (empty array)
    category: "", // Default category name
    likes: 0, // Default likes count
  };

  return defaultBlog;
};

export const addBlog = async (blog: Blog) => {
  const formData = new FormData();
  formData.append("title", "kabilan TT");
  formData.append("description", "Kabilan ddeesscc");
  formData.append("content", "Kabilan Content");
  formData.append("username", blog.blog_content);
  formData.append("first_name", "Kabilan ");
  formData.append("last_name", "Kumar");
  formData.append("email", blog.blog_title);
  formData.append("profile_image", "kabilan.png");
  formData.append("password", "Kavi151");
  formData.append("bio", "Nope");
  formData.append("profile_image_blob", blog.blog_cover_image || "");
  await axios.post(
    "https://blogspace-app-server.vercel.app/blogs/upload",
    formData
  );
};

export const getBlogs = async () => {
  const blogs = await client(
    "https://blogspace-app-server.vercel.app/blogs",
    "GET",
    {}
  );
  return blogs;
};

export const loginUser = async (email: string, password: string) => {
  const formData = {
    email: email,
    password: password,
  };
  // console.log(formData);

  try {
    const respose = await axios.post(
      "https://blogspace-app-server.vercel.app/loginuser",
      formData
    );
    return respose;
  } catch (error) {
    return 500;
    console.error("Error during user registration:", error);
  }
};

export const registerUser = async (userData: UserProfile) => {
  // console.log("User Details : ", userData);

  const formData = new FormData();
  formData.append("user_id", userData.user_id);
  formData.append("username", userData.username);
  formData.append("full_name", userData.full_name);
  formData.append("email", userData.email);
  formData.append("password", userData.password); // Consider changing this to a user input for better security
  const imageResponse = await fetch(userData.profileImg || "");
  const imageBlob = await imageResponse.blob();
  formData.append("profile_image_blob", imageBlob);
  // console.log("Form Data: ", userData);
  // console.log("Blob Conversion: ", imageResponse);

  try {
    const response = await axios.post(
      "https://blogspace-app-server.vercel.app/users/upload",
      formData
    );
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    return 400;
  }
};

export const persistUserData = {
  saveUserData: (userData: UserProfile): void => {
    try {
      const serializedData = JSON.stringify(userData);
      localStorage.setItem("user_data", serializedData);
    } catch (error) {
      console.error("Error saving user data to localStorage:", error);
    }
  },

  loadUserData: (): UserProfile => {
    try {
      const serializedData = localStorage.getItem("user_data");
      if (serializedData) {
        return JSON.parse(serializedData) as UserProfile;
      }
    } catch (error) {
      console.error("Error loading user data from localStorage:", error);
    }
    // Return default empty user profile if no data found
    return {
      user_id: "",
      username: "",
      full_name: "",
      password: "",
      email: "",
      profileImg: "",
    };
  },

  clearUserData: (): void => {
    try {
      localStorage.removeItem("user_data");
    } catch (error) {
      console.error("Error clearing user data from localStorage:", error);
    }
  },
};

export function getDateUptoYear() {
  const options: any = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const today = new Date();
  return today.toLocaleDateString("en-US", options)[1];
}
