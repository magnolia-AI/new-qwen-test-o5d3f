'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Image as ImageIcon, Smile, MapPin, Calendar } from 'lucide-react';
import { useSocial } from '@/contexts/social-context';

export function CreatePost() {
  const { currentUser, addPost } = useSocial();
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = () => {
    if (content.trim() || image) {
      addPost(content, image || undefined);
      setContent('');
      setImage(null);
      setPreview(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Avatar>
            <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
            <AvatarFallback>{currentUser?.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's happening?"
              className="min-h-[100px] border-0 p-0 focus-visible:ring-0"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            {/* Image Preview */}
            {preview && (
              <div className="mt-3 relative">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="rounded-lg max-h-60 object-cover"
                />
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setPreview(null);
                    setImage(null);
                  }}
                >
                  Remove
                </Button>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-3 mt-3 border-t">
              <div className="flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-blue-500 hover:text-blue-600"
                >
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Smile className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-blue-500 hover:text-blue-600"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Calendar className="h-5 w-5" />
                </Button>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="image-upload"
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <ImageIcon className="h-5 w-5 text-blue-500 hover:text-blue-600" />
                </label>
              </div>
              
              <Button 
                onClick={handleSubmit}
                disabled={!content.trim() && !image}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
