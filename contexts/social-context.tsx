'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Post, Comment, Notification } from '@/types/social';
import { mockUsers, mockPosts, mockComments, mockNotifications } from '@/lib/mock-data';

type SocialContextType = {
  currentUser: User | null;
  users: User[];
  posts: Post[];
  notifications: Notification[];
  loading: boolean;
  fetchPosts: () => void;
  fetchNotifications: () => void;
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
  bookmarkPost: (postId: string) => void;
  unbookmarkPost: (postId: string) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  addPost: (content: string, image?: string) => void;
  addComment: (postId: string, content: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
};

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export function SocialProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [loading, setLoading] = useState(false);

  // Simulate fetching posts
  const fetchPosts = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 500);
  };

  // Simulate fetching notifications
  const fetchNotifications = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 300);
  };

  // Like a post
  const likePost = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1, liked: true } 
          : post
      )
    );
  };

  // Unlike a post
  const unlikePost = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes - 1, liked: false } 
          : post
      )
    );
  };

  // Bookmark a post
  const bookmarkPost = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, bookmarks: post.bookmarks + 1, bookmarked: true } 
          : post
      )
    );
  };

  // Remove bookmark from a post
  const unbookmarkPost = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, bookmarks: post.bookmarks - 1, bookmarked: false } 
          : post
      )
    );
  };

  // Follow a user
  const followUser = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, isFollowing: true, followers: user.followers + 1 } 
          : user.id === currentUser?.id 
            ? { ...user, following: user.following + 1 } 
            : user
      )
    );
  };

  // Unfollow a user
  const unfollowUser = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, isFollowing: false, followers: user.followers - 1 } 
          : user.id === currentUser?.id 
            ? { ...user, following: user.following - 1 } 
            : user
      )
    );
  };

  // Add a new post
  const addPost = (content: string, image?: string) => {
    if (!currentUser) return;
    
    const newPost: Post = {
      id: (posts.length + 1).toString(),
      userId: currentUser.id,
      user: currentUser,
      content,
      image,
      likes: 0,
      comments: 0,
      shares: 0,
      bookmarks: 0,
      createdAt: new Date().toISOString(),
    };
    
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  // Add a comment to a post
  const addComment = (postId: string, content: string) => {
    if (!currentUser) return;
    
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, comments: post.comments + 1 } 
          : post
      )
    );
  };

  // Mark a notification as read
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  // Initialize data
  useEffect(() => {
    fetchPosts();
    fetchNotifications();
  }, []);

  return (
    <SocialContext.Provider
      value={{
        currentUser,
        users,
        posts,
        notifications,
        loading,
        fetchPosts,
        fetchNotifications,
        likePost,
        unlikePost,
        bookmarkPost,
        unbookmarkPost,
        followUser,
        unfollowUser,
        addPost,
        addComment,
        markNotificationAsRead,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
}

export function useSocial() {
  const context = useContext(SocialContext);
  if (context === undefined) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
}
