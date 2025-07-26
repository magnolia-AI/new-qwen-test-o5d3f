// Types for our social media application
export type User = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  isFollowing?: boolean;
};

export type Post = {
  id: string;
  userId: string;
  user: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
  createdAt: string;
  liked?: boolean;
  bookmarked?: boolean;
};

export type Comment = {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  likes: number;
  createdAt: string;
  replies: Comment[];
  liked?: boolean;
};

export type Notification = {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  content: string;
  read: boolean;
  createdAt: string;
  relatedUser?: User;
  relatedPost?: Post;
};
