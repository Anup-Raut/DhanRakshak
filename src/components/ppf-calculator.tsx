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
  yearlyInvestment: z.coerce.number().min(500, 'Minimum investment is 500.').max(150000, 'Maximum investment is 1,50,000.'),
  period: z.coerce.number().min(15, 'Minimum period is 15 years.'),
  rate: z.coerce.number().min(0.1, 'Interest rate must be positive.').max(20, 'Interest rate seems too high.'),
});

type FormData = z.infer<typeof schema>;

export default function PpfCalculator() {
  const [maturityValue, setMaturityValue] = useState<number | null>(null);
  const [totalInvestment, setTotalInvestment] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      rate: 7.1, // Current PPF rate
      period: 15,
    }
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const P = data.yearlyInvestment;
    const n = data.period;
    const i = data.rate / 100;
    
    let balance = 0;
    for (let year = 0; year < n; year++) {
      balance = (balance + P) * (1 + i);
    }
    
    setMaturityValue(balance);
    setTotalInvestment(P * n);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="yearlyInvestment">Yearly Investment ($)</Label>
          <Input id="yearlyInvestment" type="number" placeholder="e.g., 100000" {...register('yearlyInvestment')} />
          {errors.yearlyInvestment && <p className="text-sm text-destructive">{errors.yearlyInvestment.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="rate">Interest Rate (p.a. %)</Label>
          <Input id="rate" type="number" step="0.1" {...register('rate')} />
          {errors.rate && <p className="text-sm text-destructive">{errors.rate.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="period">Period (Years)</Label>
          <Input id="period" type="number" placeholder="e.g., 15" {...register('period')} />
          {errors.period && <p className="text-sm text-destructive">{errors.period.message}</p>}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button type="submit">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate
        </Button>
        {maturityValue !== null && totalInvestment !== null && (
          <div className="w-full space-y-4 rounded-lg border bg-muted/50 p-6">
            <h3 className="text-lg font-medium">PPF Projection</h3>
            <div className="space-y-2">
               <p className="text-muted-foreground">Total Investment: ${totalInvestment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
               <p className="text-muted-foreground">Total Interest: ${(maturityValue - totalInvestment).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
               <p className="text-3xl font-bold text-primary">
                 ${maturityValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                 <span className="text-lg font-medium text-muted-foreground"> maturity value</span>
               </p>
            </div>
          </div>
        )}
      </CardFooter>
    </form>
  );
}
