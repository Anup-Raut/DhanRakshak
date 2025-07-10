import Link from 'next/link';
import { PiggyBank, Landmark, FileText, Banknote, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const topics = [
  {
    icon: PiggyBank,
    title: 'Budgeting 101',
    description: 'Learn to manage your money effectively.',
    link: '/learn/budgeting',
  },
  {
    icon: Landmark,
    title: 'Investing Basics',
    description: 'Start your journey into the world of investments.',
    link: '/learn/investing',
  },
  {
    icon: Banknote,
    title: 'Super Savings',
    description: 'Strategies to grow your savings faster.',
    link: '/learn/saving',
  },
  {
    icon: FileText,
    title: 'Tax Planning',
    description: 'Understand taxes and plan to save money.',
    link: '/learn/tax-planning',
  },
];

export default function LearnPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline tracking-tight">
          Learning Hub
        </h1>
        <p className="text-muted-foreground">
          Expand your financial knowledge with our guides and tutorials.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {topics.map((topic) => (
           <Card key={topic.title} className="flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-lg active:scale-95">
             <CardHeader className="flex-row items-start gap-4 space-y-0">
                <div className="rounded-lg p-3 bg-primary/10">
                  <topic.icon className="h-6 w-6 text-primary" />
                </div>
               <div>
                 <CardTitle className="font-headline">{topic.title}</CardTitle>
                 <CardDescription>{topic.description}</CardDescription>
               </div>
             </CardHeader>
             <CardFooter>
               <Button asChild size="sm" variant="ghost" className="text-primary hover:text-primary">
                 <Link href={topic.link}>
                   Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                 </Link>
               </Button>
             </CardFooter>
           </Card>
        ))}
      </div>
    </div>
  );
}
