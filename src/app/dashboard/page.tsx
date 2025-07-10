import Link from 'next/link';
import { BookOpen, ShieldAlert, Calculator, Bot, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: BookOpen,
    title: 'Learning Hub',
    description: 'Interactive tutorials on budgeting, investing, and more.',
    link: '/learn',
  },
  {
    icon: ShieldAlert,
    title: 'Fraud Awareness',
    description: 'Simulations to help you spot and avoid financial scams.',
    link: '/fraud-awareness',
  },
  {
    icon: Calculator,
    title: 'Financial Calculators',
    description: 'Tools to plan your savings, loans, and investments.',
    link: '/calculators',
  },
  {
    icon: Bot,
    title: 'AI Coach',
    description: 'Get personalized financial tips based on your goals.',
    link: '/coach',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline tracking-tight">
          Welcome to DhanRakshak
        </h1>
        <p className="text-muted-foreground">
          Your journey to financial literacy starts here.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-lg active:scale-95">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
               <div className="rounded-lg p-3 bg-primary/10">
                 <feature.icon className="h-6 w-6 text-primary" />
               </div>
              <div>
                <CardTitle className="font-headline">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </div>
            </CardHeader>
            <CardFooter>
              <Button asChild size="sm" variant="ghost" className="text-primary hover:text-primary">
                <Link href={feature.link}>
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
