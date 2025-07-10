'use client';

import { Bell, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/context/user-context';
import { tutorialData } from '@/lib/learn-data';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from './ui/separator';

export default function Notifications() {
  const { learningProgress } = useUser();

  const incompleteModules = Object.keys(tutorialData).filter(
    (slug) => (learningProgress[slug] || 0) < 100
  );

  const notificationCount = incompleteModules.length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0 text-xs"
            >
              {notificationCount}
            </Badge>
          )}
          <span className="sr-only">Open notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="grid gap-4">
          <div className="space-y-1">
            <h4 className="font-medium leading-none">Notifications</h4>
            <p className="text-sm text-muted-foreground">
              You have {notificationCount} incomplete modules.
            </p>
          </div>
          <Separator />
          <div className="grid gap-2">
            {notificationCount > 0 ? (
              incompleteModules.map((slug) => (
                <Link
                  key={slug}
                  href={`/learn/${slug}`}
                  className="flex items-start gap-4 rounded-md p-2 -mx-2 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <BookOpen className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Continue Learning</p>
                    <p className="text-sm text-muted-foreground">
                      Your '{tutorialData[slug].title}' module is waiting.
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No new notifications.
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
