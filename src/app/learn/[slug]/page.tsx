import { notFound } from 'next/navigation';
import { tutorialData } from '@/lib/learn-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Quiz from '@/components/quiz';

type LearnTopicPageProps = {
  params: {
    slug: string;
  };
};

export default function LearnTopicPage({ params }: LearnTopicPageProps) {
  const { slug } = params;
  const topic = tutorialData[slug];

  if (!topic) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline tracking-tight">
          {topic.title}
        </h1>
        <p className="text-muted-foreground">{topic.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Key Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {topic.content.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-semibold hover:no-underline">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="prose max-w-none text-muted-foreground">
                  {item.body}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Test Your Knowledge</CardTitle>
        </CardHeader>
        <CardContent>
          <Quiz questions={topic.quiz} moduleSlug={slug} />
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(tutorialData).map((slug) => ({
    slug,
  }));
}
