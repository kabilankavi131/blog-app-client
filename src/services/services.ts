import axios from "axios";
import { blogs } from "../constants/constants";
import { Blog, UserProfile } from "../interfaces/interface";
import client from "../client/client";

export const getBlogDetails = (id: number): Blog | undefined => {
  const book = blogs.find((_, index) => index == id);
  if (book) return book;
  const defaultBook = {
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
  };
  return defaultBook;
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
  formData.append("profile_image_blob", blog.blog_cover_image);
  await axios.post("http://localhost:5050/upload", formData);
};

export const getBlogs = async () => {
  const blogs = await client("http://localhost:5050/images", "GET", {});
  return blogs;
};

export const loginUser = async (email: string, password: string) => {
  const formData = {
    email: email,
    password: password,
  };
  console.log(formData);

  try {
    await axios.post("http://localhost:5050/loginuser", formData);
    // navigate("/home");
  } catch (error) {
    console.error("Error during user registration:", error);
  }
};

export const registerUser = async (userData: UserProfile) => {
  const formData = new FormData();
  formData.append("user_id", userData.email);
  formData.append("username", userData.email);
  formData.append("full_name", userData.full_name);
  formData.append("email", userData.email);
  formData.append("password", userData.password); // Consider changing this to a user input for better security

  const imageResponse = await fetch(userData.profileImg || "");
  const imageBlob = await imageResponse.blob();
  formData.append("profile_image_blob", imageBlob);
  console.log(userData);

  try {
    await axios.post("http://localhost:5050/users/upload", formData);
    // navigate("/home");
  } catch (error) {
    console.error("Error during user registration:", error);
  }
};
