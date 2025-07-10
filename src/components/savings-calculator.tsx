"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calculator } from 'lucide-react';

const schema = z.object({
  goalAmount: z.coerce.number().min(1, 'Goal must be at least 1.'),
  initialAmount: z.coerce.number().min(0),
  years: z.coerce.number().min(1, 'Years must be at least 1.'),
});

type FormData = z.infer<typeof schema>;

export default function SavingsCalculator() {
  const [monthlySavings, setMonthlySavings] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const remainingAmount = data.goalAmount - data.initialAmount;
    if (remainingAmount <= 0) {
      setMonthlySavings(0);
      return;
    }
    const totalMonths = data.years * 12;
    const requiredSavings = remainingAmount / totalMonths;
    setMonthlySavings(requiredSavings);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="goalAmount">Savings Goal ($)</Label>
          <Input id="goalAmount" type="number" placeholder="e.g., 5000" {...register('goalAmount')} />
          {errors.goalAmount && <p className="text-sm text-destructive">{errors.goalAmount.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="initialAmount">Initial Amount ($)</Label>
          <Input id="initialAmount" type="number" placeholder="e.g., 500" {...register('initialAmount')} />
          {errors.initialAmount && <p className="text-sm text-destructive">{errors.initialAmount.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="years">Timeframe (Years)</Label>
          <Input id="years" type="number" placeholder="e.g., 2" {...register('years')} />
          {errors.years && <p className="text-sm text-destructive">{errors.years.message}</p>}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button type="submit">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate
        </Button>
        {monthlySavings !== null && (
          <div className="w-full space-y-4 rounded-lg border bg-muted/50 p-6">
            <h3 className="text-lg font-medium">Results</h3>
            <div className="space-y-2">
              <p>You need to save:</p>
              <p className="text-3xl font-bold text-primary">
                ${monthlySavings.toFixed(2)}
                <span className="text-lg font-medium text-muted-foreground"> / month</span>
              </p>
            </div>
          </div>
        )}
      </CardFooter>
    </form>
  );
}
