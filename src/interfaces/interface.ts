import { jwtDecode, JwtPayload } from "jwt-decode";

export interface Blog {
  blog_id: number;
  author_id: string;
  blog_category_id: number;
  blog_title: string;
  blog_content: string;
  blog_cover_image: string;
  blog_date: string;
  blog_read_time: string;
  tags: string[];
  category: string;
  likes: number;
  is_active: boolean;
}
export interface BlogProps {
  blog: Blog;
}

export interface BlogPopupProps {
  onClose: () => void;
  onSave: () => void;
  onShare: () => void;
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
