'use client';

import { useState, useEffect } from 'react';
import { useSocial } from '@/contexts/social-context';
import { Post } from '@/components/social/post';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function PostFeed() {
  const { posts, loading, fetchPosts } = useSocial();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Simulate loading more posts
  const loadMore = () => {
    if (!hasMore) return;
    
    setLoadingMore(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would fetch more posts from the API
      // For now, we'll just simulate reaching the end
      setHasMore(false);
      setLoadingMore(false);
    }, 1000);
  };

  const [loadingMore, setLoadingMore] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Posts */}
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}

      {/* Load more button */}
      {!loading && hasMore && (
        <div className="flex justify-center py-4">
          <Button 
            onClick={loadMore} 
            disabled={loadingMore}
            variant="outline"
          >
            {loadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}

      {/* End of feed indicator */}
      {!hasMore && (
        <div className="text-center py-8 text-muted-foreground">
          <p>You're all caught up!</p>
        </div>
      )}
    </div>
  );
}
