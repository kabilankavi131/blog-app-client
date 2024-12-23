import { jwtDecode, JwtPayload } from "jwt-decode";

export interface Blog {
  blog_id: number; // Unique identifier for the blog
  username: string; // ID of the author
  blog_category_id: number; // ID of the blog category
  blog_title: string; // Title of the blog
  blog_description: string; // Short description of the blog
  blog_content: string; // Full content of the blog
  blog_cover_image: File | null; // URL of the cover image
  blog_date: string; // Publication date
  blog_read_time: string; // Estimated read time
  created_at: string; // Creation timestamp
  created_by: string; // ID of the creator
  modified_at: string; // Last modified timestamp
  modified_by: string; // ID of the last modifier
  is_active: boolean; // Status indicating if the blog is active
  tags: string[]; // Array of tags (or null if no tags)
  category: string; // Category name
  likes: number; // Number of likes
}

export interface AllBlogsData {
  Trending: Blog[];
  Latest: Blog[];
  Featured: Blog[];
}

export interface BlogProps {
  blog: Blog;
  blogType: keyof AllBlogsData;
}

export interface BlogPopupProps {
  onClose: () => void;
  onSave: () => void;
  onShare: () => void;
  isDetailPage: boolean;
}

export interface UserProfile {
  user_id: string;
  username: string;
  full_name: string;
  email: string;
  profileImg: string; // Change to string to store URL instead of Blob
  password: string;
}

export interface UserContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export interface BlogNavProps {
  activeTab: number;
  onTabChange: (tabKey: number) => void;
}

export interface GoogleButtonProps {
  onClick: () => void;
}

export interface GoogleJwtPayload extends JwtPayload {
  email: string;
  email_verified: boolean;
  given_name: string;
  family_name: string;
  picture: string;
  name: string;
  [key: string]: any;
}

export interface Categories {
  category_id: number;
  category_name: string;
}
