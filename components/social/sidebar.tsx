'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Search, 
  Bell, 
  Mail, 
  Bookmark, 
  User, 
  MoreHorizontal,
  Settings,
  LogOut
} from 'lucide-react';
import { useSocial } from '@/contexts/social-context';
import Link from 'next/link';

export function Sidebar() {
  const { currentUser } = useSocial();

  return (
    <div className="hidden md:block w-64 border-r h-screen sticky top-0 p-4">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">SocialApp</h1>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="mr-2 h-5 w-5" />
                  Home
                </Button>
              </Link>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <Search className="mr-2 h-5 w-5" />
                Explore
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <Mail className="mr-2 h-5 w-5" />
                Messages
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <Bookmark className="mr-2 h-5 w-5" />
                Bookmarks
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-5 w-5" />
                Profile
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <MoreHorizontal className="mr-2 h-5 w-5" />
                More
              </Button>
            </li>
          </ul>
        </nav>
        
        {/* User Profile */}
        {currentUser && (
          <div className="mt-auto pt-4 border-t">
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted cursor-pointer">
              <Avatar className="h-10 w-10">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground truncate">@{currentUser.username}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
