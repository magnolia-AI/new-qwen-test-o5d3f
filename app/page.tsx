'use client';

import { CreatePost } from '@/components/social/create-post';
import { PostFeed } from '@/components/social/post-feed';
import { Sidebar } from '@/components/social/sidebar';
import { MobileNav } from '@/components/social/mobile-nav';

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 border-x">
        <div className="sticky top-0 bg-background border-b p-4">
          <h1 className="text-xl font-bold">Home</h1>
        </div>
        
        <div className="p-4">
          <CreatePost />
          <PostFeed />
        </div>
      </main>
      
      <div className="hidden lg:block w-80 p-4">
        <div className="sticky top-20">
          <div className="bg-muted rounded-xl p-4">
            <h2 className="font-bold mb-2">Trends for you</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Trending in Technology</p>
                <p className="font-semibold">#NextJS</p>
                <p className="text-xs text-muted-foreground">125K posts</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Trending</p>
                <p className="font-semibold">#WebDevelopment</p>
                <p className="text-xs text-muted-foreground">89.2K posts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <MobileNav />
    </div>
  );
}
