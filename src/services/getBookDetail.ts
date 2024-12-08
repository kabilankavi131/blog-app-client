import blogs from "../constants/blogData";
import { BlogInterface } from "../interfaces/interface";

const getBlogDetails = (id: number): BlogInterface | undefined => {
  const book = blogs.find((_, index) => index == id);
  if (book) return book;
  const defaultBook = {
    index: 0,
    author_id: 0,
    blog_id: 0,
    category_id: 0,
    content: "",
    cover_image: "",
    created_at: new Date().toISOString(),
    created_by: "",
    is_active: 1,
    modified_at: new Date().toISOString(),
    modified_by: "",
    title: "",
    imageUrl: "",
    date: new Date().toISOString(),
    readTime: "",
    description: "",
  };
  return defaultBook;
};

export default getBlogDetails;
