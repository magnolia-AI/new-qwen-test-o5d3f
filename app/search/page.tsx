'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search as SearchIcon, X } from 'lucide-react';
import { useSocial } from '@/contexts/social-context';

export default function SearchPage() {
  const { users } = useSocial();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof users>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filteredUsers);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="sticky top-0 bg-background border-b p-4">
        <h1 className="text-xl font-bold mb-4">Search</h1>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search users"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
              onClick={() => handleSearch('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="p-4">
        {searchResults.length > 0 ? (
          <div className="space-y-2">
            {searchResults.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {user.isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                  
                  <p className="text-sm mt-3 line-clamp-2">{user.bio}</p>
                  
                  <div className="flex gap-4 mt-3 text-sm">
                    <span><strong>{user.followers.toLocaleString()}</strong> Followers</span>
                    <span><strong>{user.following.toLocaleString()}</strong> Following</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : searchQuery ? (
          <Card>
            <CardContent className="p-8 text-center">
              <SearchIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-1">No results for "{searchQuery}"</h3>
              <p className="text-sm text-muted-foreground">
                Try searching for something else
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-1">Search Twitter</h3>
            <p className="text-sm text-muted-foreground">
              Search for people, topics, or keywords
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
