export interface BlogInterface {
  index: number;
  author_id: number; // ID of the author
  blog_id: number; // Unique ID for the blog post
  category_id: number; // ID for the category the post belongs to
  content: string; // Content of the blog post
  cover_image: string; // URL of the cover image
  created_at: string; // Timestamp for when the post was created
  created_by: string; // Name of the creator
  is_active: number; // Status of the post (active/inactive)
  modified_at: string; // Timestamp for when the post was last modified
  modified_by: string; // Name of the person who last modified the post
  title: string; // Title of the blog post
  imageUrl: string;
  date: string;
  readTime: string;
  description: string;
}
export interface BlogProps {
  title: string;
  content: string;
  image: string;
}
