'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LearningProgressChart from '@/components/learning-progress-chart';
import { BookOpenCheck, LogOut } from 'lucide-react';
import { useUser } from '@/context/user-context';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { tutorialData } from '@/lib/learn-data';

// Mock data for static elements
const userStaticData = {
  email: 'alex.doe@example.com',
  avatarUrl: 'https://placehold.co/100x100.png',
};

export default function ProfilePage() {
  const { userName, logout, learningProgress } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const displayName = userName || 'Guest';
  const displayInitial = displayName.charAt(0).toUpperCase();

  const totalModules = Object.keys(tutorialData).length;
  
  const completedModulesCount = Object.values(learningProgress).filter(
    (progress) => progress === 100
  ).length;

  const completionPercentage =
    totalModules > 0
      ? Math.round((completedModulesCount / totalModules) * 100)
      : 0;

  const chartData = Object.keys(tutorialData).map((slug) => ({
    name: tutorialData[slug].title,
    completed: learningProgress[slug] || 0,
  }));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline tracking-tight">
          User Profile
        </h1>
        <p className="text-muted-foreground">
          Track your learning journey and progress.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* User Info Card */}
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={userStaticData.avatarUrl} alt={displayName} data-ai-hint="profile picture" />
              <AvatarFallback>{displayInitial}</AvatarFallback>
            </Avatar>
            <CardTitle className="font-headline">{displayName}</CardTitle>
            <CardDescription>{userStaticData.email}</CardDescription>
          </CardHeader>
          <CardContent className="text-center flex-grow">
            <Badge variant="secondary">Learning Enthusiast</Badge>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardFooter>
        </Card>

        {/* Learning Progress Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <BookOpenCheck className="h-6 w-6 text-primary" />
              Learning Progress
            </CardTitle>
            <CardDescription>
              You've completed {completedModulesCount} of {totalModules} modules ({completionPercentage}%). Keep it up!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LearningProgressChart data={chartData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
