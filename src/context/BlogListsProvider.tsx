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
  const [blogs, setBlogs] = useState<Blog[]>([]);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogsListsProvider;
