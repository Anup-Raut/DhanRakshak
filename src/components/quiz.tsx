'use client';

import { useState } from 'react';
import { type Question } from '@/lib/learn-data';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';
import { useUser } from '@/context/user-context';
import { useToast } from '@/hooks/use-toast';

type QuizProps = {
  questions: Question[];
  moduleSlug: string;
};

export default function Quiz({ questions, moduleSlug }: QuizProps) {
  const { updateLearningProgress } = useUser();
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers({ ...answers, [questionIndex]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(answers).length !== questions.length) {
      toast({
        title: 'Incomplete Quiz',
        description: 'Please answer all questions before submitting.',
        variant: 'destructive',
      });
      return;
    }

    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);
    setSubmitted(true);

    const percentage = Math.round((correctAnswers / questions.length) * 100);
    updateLearningProgress(moduleSlug, percentage);
  };

  const handleReset = () => {
    setAnswers({});
    setScore(0);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <Card className="bg-muted/50">
        <CardContent className="pt-6 text-center space-y-4">
          <h3 className="text-2xl font-bold font-headline">Quiz Complete!</h3>
          <p className="text-lg">
            Your score:
            <span className="font-bold text-primary ml-2">
              {score} / {questions.length}
            </span>
          </p>
          <div className="w-full bg-secondary rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${(score / questions.length) * 100}%` }}
            ></div>
          </div>
          <Button onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {questions.map((q, index) => (
        <div key={index} className="space-y-4">
          <p className="font-semibold">
            {index + 1}. {q.question}
          </p>
          <RadioGroup
            onValueChange={(value) => handleAnswerChange(index, value)}
            className="space-y-2"
            value={answers[index]}
          >
            {q.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2 rounded-md p-2 transition-colors hover:bg-muted active:bg-accent/20">
                <RadioGroupItem value={option} id={`q${index}-o${optionIndex}`} />
                <Label htmlFor={`q${index}-o${optionIndex}`} className="font-normal w-full cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
      <Button type="submit">Submit Answers</Button>
    </form>
  );
}
