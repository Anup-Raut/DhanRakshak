"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';

const schema = z.object({
  currentAge: z.coerce.number().min(18, 'Must be at least 18.').max(99),
  retirementAge: z.coerce.number().min(19, 'Must be at least 19.').max(100),
  monthlySavings: z.coerce.number().min(1, 'Savings must be positive.'),
  returnRate: z.coerce.number().min(0.1, 'Rate must be positive.').max(50, 'Rate seems too high.'),
}).refine(data => data.currentAge < data.retirementAge, {
  message: "Retirement age must be greater than current age.",
  path: ["retirementAge"],
});

type FormData = z.infer<typeof schema>;

export default function RetirementCalculator() {
  const [result, setResult] = useState<{corpus: number, totalInvestment: number, retirementAge: number} | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const monthlyInvestment = data.monthlySavings;
    const annualRate = data.returnRate;
    const years = data.retirementAge - data.currentAge;

    const monthlyRate = annualRate / 12 / 100;
    const numberOfMonths = years * 12;
    
    const futureValue = monthlyInvestment * ( (Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate ) * (1 + monthlyRate);
    
    setResult({
        corpus: futureValue,
        totalInvestment: monthlyInvestment * numberOfMonths,
        retirementAge: data.retirementAge,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="currentAge">Current Age</Label>
          <Input id="currentAge" type="number" placeholder="e.g., 30" {...register('currentAge')} />
          {errors.currentAge && <p className="text-sm text-destructive">{errors.currentAge.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="retirementAge">Retirement Age</Label>
          <Input id="retirementAge" type="number" placeholder="e.g., 60" {...register('retirementAge')} />
          {errors.retirementAge && <p className="text-sm text-destructive">{errors.retirementAge.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="monthlySavings">Monthly Savings ($)</Label>
          <Input id="monthlySavings" type="number" placeholder="e.g., 10000" {...register('monthlySavings')} />
          {errors.monthlySavings && <p className="text-sm text-destructive">{errors.monthlySavings.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="returnRate">Expected Return Rate (%)</Label>
          <Input id="returnRate" type="number" step="0.1" placeholder="e.g., 12" {...register('returnRate')} />
          {errors.returnRate && <p className="text-sm text-destructive">{errors.returnRate.message}</p>}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button type="submit">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Corpus
        </Button>
        {result && (
          <div className="w-full space-y-4 rounded-lg border bg-muted/50 p-6">
            <h3 className="text-lg font-medium">Retirement Corpus Projection</h3>
            <div className="space-y-2">
               <p className="text-muted-foreground">Total Investment: ${result.totalInvestment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
               <p className="text-muted-foreground">Wealth Gained: ${(result.corpus - result.totalInvestment).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
               <p className="text-3xl font-bold text-primary">
                 ${result.corpus.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                 <span className="text-lg font-medium text-muted-foreground"> at age {result.retirementAge}</span>
               </p>
            </div>
          </div>
        )}
      </CardFooter>
    </form>
  );
}
