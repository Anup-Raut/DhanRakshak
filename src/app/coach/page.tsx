import { CoachForm } from '@/components/coach-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Bot } from 'lucide-react';

export default function CoachPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline tracking-tight">
          Personalized AI Coach
        </h1>
        <p className="text-muted-foreground">
          Get financial tips tailored to you.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Bot className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="font-headline">Your Financial Profile</CardTitle>
            <CardDescription>
              Provide your details to receive personalized advice from our AI coach.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <CoachForm />
        </CardContent>
      </Card>
    </div>
  );
}
