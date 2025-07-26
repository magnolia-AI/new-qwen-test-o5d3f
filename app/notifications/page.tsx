'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  MessageCircle, 
  UserPlus, 
  AtSign,
  Check,
  MoreHorizontal
} from 'lucide-react';
import { useSocial } from '@/contexts/social-context';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationsPage() {
  const { notifications, markAllNotificationsAsRead } = useSocial();

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'follow':
        return <UserPlus className="h-5 w-5 text-green-500" />;
      case 'mention':
        return <AtSign className="h-5 w-5 text-purple-500" />;
      default:
        return <Heart className="h-5 w-5 text-red-500" />;
    }
  };

  const getTitle = (type: string) => {
    switch (type) {
      case 'like':
        return 'liked your post';
      case 'comment':
        return 'commented on your post';
      case 'follow':
        return 'started following you';
      case 'mention':
        return 'mentioned you';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="sticky top-0 bg-background border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Notifications</h1>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={markAllNotificationsAsRead}
        >
          Mark all as read
        </Button>
      </div>
      
      <div className="p-4">
        {notifications.length > 0 ? (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <Card key={notification.id} className={notification.read ? '' : 'bg-muted'}>
                <CardContent className="p-4">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      {notification.read ? (
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          {getIcon(notification.type)}
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            {getIcon(notification.type)}
                          </div>
                          <div className="absolute top-0 right-0 h-3 w-3 bg-blue-500 rounded-full border-2 border-background"></div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          {notification.relatedUser && (
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={notification.relatedUser.avatar} alt={notification.relatedUser.name} />
                              <AvatarFallback>{notification.relatedUser.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <p className="text-sm">
                            <span className="font-semibold">
                              {notification.relatedUser?.name || 'Someone'}
                            </span>{' '}
                            {getTitle(notification.type)}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {notification.relatedPost && (
                        <div className="mt-2 p-3 bg-background border rounded-lg">
                          <p className="text-sm line-clamp-2">{notification.relatedPost.content}</p>
                        </div>
                      )}
                      
                      <p className="text-xs text-muted-foreground mt-2">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">No notifications yet</h3>
              <p className="text-sm text-muted-foreground">
                When you get notifications, they'll show up here
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
