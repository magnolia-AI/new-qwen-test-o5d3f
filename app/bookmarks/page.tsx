'use client';

import { Post } from '@/components/social/post';
import { Card, CardContent } from '@/components/ui/card';
import { useSocial } from '@/contexts/social-context';
import { Bookmark as BookmarkIcon } from 'lucide-react';

export default function BookmarksPage() {
  const { posts } = useSocial();
  
  // Filter posts that are bookmarked
  const bookmarkedPosts = posts.filter(post => post.bookmarked);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="sticky top-0 bg-background border-b p-4">
        <h1 className="text-xl font-bold">Bookmarks</h1>
      </div>
      
      <div className="p-4">
        {bookmarkedPosts.length > 0 ? (
          <div>
            {bookmarkedPosts.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <BookmarkIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">Save posts for later</h3>
              <p className="text-sm text-muted-foreground">
                Don't let the good ones fly away! Bookmark posts to easily find them again.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
