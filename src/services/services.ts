import axios from "axios";
import { blogs } from "../constants/constants";
import { AllBlogsData, Blog, UserProfile } from "../interfaces/interface";
import client from "../client/client";
import LatestBlog from "../components/LatestBlog";
import TrendingBlog from "../components/TrendingBlog";

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

export const getBlogs = async (startFrom: number = 0, blogType: string) => {
  let endpoint: string = "";
  switch (blogType) {
    case "Trending":
      endpoint = "gettrendingblogs";
      break;
    case "Featured":
      endpoint = "blogs";
      break;
    case "Latest":
      endpoint = "getlatestblogs";
      break;
  }
  const API = `https://blogspace-app-server.vercel.app/${endpoint}`;
  const blogs = await axios.post(API, {
    startingRow: startFrom,
  });
  return blogs.data;
};
export const getBlogsByCategories = async (categories: any) => {
  try {
    const blogs = await axios.post(
      "https://blogspace-app-server.vercel.app/blogsbycategories",
      {
        categoryIds: categories,
      }
    );

    return blogs.data;
  } catch (error: any) {
    console.error("Error fetching blogs by categories:", error.message);
    throw new Error("Failed to fetch blogs by categories."); // Propagate the error for handling
  }
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
  return today.toLocaleDateString("en-US", options);
}

export const getBlogysbySearch = async (
  blogTitle: string,
  startFrom: number
) => {
  
  try {
    const response = await axios.post(
      "https://blogspace-app-server.vercel.app/searchedblogs",
      {
        query: blogTitle,
        startingRow: startFrom,
      }
    );
    // console.log("Searched Blogs: ", response);
    return response.data;
  } catch (err: any) {
    console.log(err);
    return [];
  }
};

// Store blog data in session storage.

export const persistBlogData = {
  saveBlogData: async (blogData: AllBlogsData): Promise<void> => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction("blog_data", "readwrite");
      const store = transaction.objectStore("blog_data");
      await store.put(blogData, "all_blogs_data");
    } catch (error) {
      console.error("Error saving blog data to IndexedDB:", error);
    }
  },

  loadBlogData: async (): Promise<AllBlogsData | null> => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction("blog_data", "readonly");
      const store = transaction.objectStore("blog_data");
      const data = await new Promise<AllBlogsData | null>((resolve, reject) => {
        const request = store.get("all_blogs_data");
        request.onsuccess = () => resolve(request.result as AllBlogsData);
        request.onerror = () => reject(request.error);
      });
      return data || null;
    } catch (error) {
      console.error("Error loading blog data from IndexedDB:", error);
      return null;
    }
  },

  clearBlogData: async (): Promise<void> => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction("blog_data", "readwrite");
      const store = transaction.objectStore("blog_data");
      await store.clear();
      console.log("Blog data cleared from IndexedDB.");
    } catch (error) {
      console.error("Error clearing blog data from IndexedDB:", error);
    }
  },
};

async function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("BlogDatabase", 1);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains("blog_data")) {
        db.createObjectStore("blog_data");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const updateBlogLikes = async (blogId: number) => {
  try {
    const response = await axios.post(
      "https://blogspace-app-server.vercel.app/blogs/likes",
      {
        blog_id: blogId,
      }
    );
    return response.data; // Returns the success message or response data
  } catch (error) {
    console.error("Error updating likes:", error);
    throw error; // Rethrow the error to handle it in the calling function if needed
  }
};

export const getBlogById = async (blogId: number) => {
  try {
    const response = await axios.get(
      `https://blogspace-app-server.vercel.app/singleblog/${blogId}`
    );
    return response.data; // Returns the blog data
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error; // Rethrow the error to handle it in the calling function if needed
  }
};
