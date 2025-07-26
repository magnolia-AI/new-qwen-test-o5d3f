'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Search, 
  Bell, 
  Mail, 
  Plus,
  User,
  Menu,
  LogOut
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSocial } from '@/contexts/social-context';

export function MobileNav() {
  const { currentUser } = useSocial();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t p-2">
      <div className="flex justify-around items-center">
        <Button variant="ghost" size="icon">
          <Home className="h-6 w-6" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <Search className="h-6 w-6" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <Plus className="h-6 w-6" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <Bell className="h-6 w-6" />
        </Button>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <div className="flex flex-col h-full">
              <div className="mb-8">
                <h1 className="text-2xl font-bold">SocialApp</h1>
              </div>
              
              {currentUser && (
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{currentUser.name}</p>
                    <p className="text-sm text-muted-foreground">@{currentUser.username}</p>
                  </div>
                </div>
              )}
              
              <nav className="flex-1">
                <ul className="space-y-2">
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="mr-2 h-5 w-5" />
                      Home
                    </Button>
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
                      <User className="mr-2 h-5 w-5" />
                      Profile
                    </Button>
                  </li>
                </ul>
              </nav>
              
              <div className="pt-4 border-t">
                <Button variant="ghost" className="w-full justify-start text-red-500">
                  <LogOut className="mr-2 h-5 w-5" />
                  Log Out
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

