'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Repeat2, Bookmark, MoreHorizontal, Share } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useSocial } from '@/contexts/social-context';
import { Post as PostType } from '@/types/social';

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const { likePost, unlikePost, bookmarkPost, unbookmarkPost } = useSocial();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    if (post.liked) {
      unlikePost(post.id);
    } else {
      likePost(post.id);
    }
  };

  const handleBookmark = () => {
    if (post.bookmarked) {
      unbookmarkPost(post.id);
    } else {
      bookmarkPost(post.id);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, we would add the comment to the post
      // For now, we'll just reset the input
      setNewComment('');
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        {/* Post Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">{post.user.name}</p>
              <p className="text-xs text-muted-foreground">
                @{post.user.username} · {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Post Content */}
        <div className="mb-3">
          <p className="text-sm">{post.content}</p>
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="mb-3 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt="Post image" 
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Post Stats */}
        <div className="flex text-xs text-muted-foreground mb-3">
          <span>{post.likes} likes</span>
          <span className="mx-2">·</span>
          <span>{post.comments} comments</span>
          <span className="mx-2">·</span>
          <span>{post.shares} shares</span>
        </div>

        {/* Post Actions */}
        <div className="flex justify-between border-t pt-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 flex items-center justify-center space-x-1"
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${post.liked ? 'fill-red-500 text-red-500' : ''}`} />
            <span>Like</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 flex items-center justify-center space-x-1"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4" />
            <span>Comment</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 flex items-center justify-center space-x-1"
          >
            <Repeat2 className="h-4 w-4" />
            <span>Repost</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 flex items-center justify-center space-x-1"
            onClick={handleBookmark}
          >
            <Bookmark className={`h-4 w-4 ${post.bookmarked ? 'fill-yellow-500 text-yellow-500' : ''}`} />
            <span>Save</span>
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex space-x-2 mb-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.user.avatar} alt={post.user.name} />
                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="flex-1 text-sm border rounded-l-lg px-3 py-2 focus:outline-none"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button 
                  size="sm" 
                  className="rounded-l-none"
                  onClick={handleAddComment}
                >
                  Post
                </Button>
              </div>
            </div>
            
            {/* Sample Comments */}
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Taylor Smith" />
                  <AvatarFallback>TS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted rounded-lg p-2">
                    <p className="text-xs font-semibold">Taylor Smith</p>
                    <p className="text-sm">This looks amazing!</p>
                  </div>
                  <div className="flex text-xs text-muted-foreground mt-1 space-x-2">
                    <button className="hover:underline">Like</button>
                    <button className="hover:underline">Reply</button>
                    <span>2h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
