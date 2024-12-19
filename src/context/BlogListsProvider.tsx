import React, { createContext, useState, ReactNode } from "react";
import { UserProfile, Blog } from "../interfaces/interface";

export interface BlogContextType {
  blogs: Blog[]; // Array of Blog
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>; // Array type
}

export const BlogContext = createContext<BlogContextType | undefined>(
  undefined
);

interface BlogsListsProviderProps {
  children: ReactNode | any;
}

export const BlogsListsProvider: React.FC<BlogsListsProviderProps> = ({
  children,
}) => {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      blog_id: 0, // Default to 0 as a placeholder
      username: "", // Empty string for ID of the author
      blog_category_id: 0, // Default category ID
      blog_title: "Untitled Blog", // Placeholder title
      blog_description: "No description provided.", // Placeholder description
      blog_content: "Content will be added soon.", // Placeholder content
      blog_cover_image: null, // No image by default
      blog_date: new Date().toISOString(), // Current date as the default publication date
      blog_read_time: "0 min", // Default read time
      created_at: new Date().toISOString(), // Current timestamp
      created_by: "", // Empty string for creator ID
      modified_at: new Date().toISOString(), // Current timestamp for last modified
      modified_by: "", // Empty string for modifier ID
      is_active: true, // Active by default
      tags: [], // Empty array for tags
      category: "Uncategorized", // Default category name
      likes: 0, // Default to 0 likes
    },
  ]);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogsListsProvider;
