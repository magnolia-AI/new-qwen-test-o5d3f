'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Post } from '@/components/social/post';
import { useSocial } from '@/contexts/social-context';
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, posts } = useSocial();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(currentUser?.bio || '');
  
  const userPosts = posts.filter(post => post.userId === currentUser?.id);

  if (!currentUser) {
    return <div>User not found</div>;
  }

  const handleSave = () => {
    // In a real app, we would save the bio to the database
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-b-lg"></div>
      
      <div className="px-4">
        <div className="flex justify-between items-end -mt-16">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <Button 
            variant={isEditing ? "default" : "outline"} 
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </Button>
        </div>
        
        <div className="mt-4">
          <h1 className="text-2xl font-bold">{currentUser.name}</h1>
          <p className="text-muted-foreground">@{currentUser.username}</p>
          
          {isEditing ? (
            <textarea
              className="w-full mt-2 p-2 border rounded-md"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
            />
          ) : (
            <p className="mt-2">{currentUser.bio}</p>
          )}
          
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center">
              <LinkIcon className="h-4 w-4 mr-1" />
              <span>https://example.com</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Joined June 2023</span>
            </div>
          </div>
          
          <div className="flex gap-4 mt-3">
            <span><strong>{currentUser.following}</strong> Following</span>
            <span><strong>{currentUser.followers}</strong> Followers</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="replies">Replies</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts">
            <div className="mt-4">
              {userPosts.length > 0 ? (
                userPosts.map(post => (
                  <Post key={post.id} post={post} />
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No posts yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="replies">
            <div className="mt-4">
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No replies yet</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="media">
            <div className="mt-4">
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No media yet</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
