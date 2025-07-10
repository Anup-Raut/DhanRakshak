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
  monthlyInvestment: z.coerce.number().min(1, 'Investment must be at least 1.'),
  returnRate: z.coerce.number().min(0.1, 'Return rate must be positive.').max(100, 'Return rate seems too high.'),
  period: z.coerce.number().min(1, 'Period must be at least 1 year.'),
});

type FormData = z.infer<typeof schema>;

export default function SipCalculator() {
  const [futureValue, setFutureValue] = useState<number | null>(null);
  const [totalInvestment, setTotalInvestment] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const monthlyInvestment = data.monthlyInvestment;
    const annualRate = data.returnRate;
    const years = data.period;

    if (monthlyInvestment > 0 && annualRate > 0 && years > 0) {
      const monthlyRate = annualRate / 12 / 100;
      const numberOfMonths = years * 12;
      
      const fv = monthlyInvestment * ( (Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate ) * (1 + monthlyRate);
      
      setFutureValue(fv);
      setTotalInvestment(monthlyInvestment * numberOfMonths);
    } else {
        setFutureValue(0);
        setTotalInvestment(0);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="monthlyInvestment">Monthly Investment ($)</Label>
          <Input id="monthlyInvestment" type="number" placeholder="e.g., 5000" {...register('monthlyInvestment')} />
          {errors.monthlyInvestment && <p className="text-sm text-destructive">{errors.monthlyInvestment.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="returnRate">Expected Return Rate (p.a. %)</Label>
          <Input id="returnRate" type="number" placeholder="e.g., 12" step="0.1" {...register('returnRate')} />
          {errors.returnRate && <p className="text-sm text-destructive">{errors.returnRate.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="period">Investment Period (Years)</Label>
          <Input id="period" type="number" placeholder="e.g., 15" {...register('period')} />
          {errors.period && <p className="text-sm text-destructive">{errors.period.message}</p>}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button type="submit">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate
        </Button>
        {futureValue !== null && totalInvestment !== null && (
          <div className="w-full space-y-4 rounded-lg border bg-muted/50 p-6">
            <h3 className="text-lg font-medium">Investment Projection</h3>
            <div className="space-y-2">
               <p className="text-muted-foreground">Total Investment: ${totalInvestment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
               <p className="text-muted-foreground">Estimated Returns: ${(futureValue - totalInvestment).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
               <p className="text-3xl font-bold text-primary">
                 ${futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                 <span className="text-lg font-medium text-muted-foreground"> estimated value</span>
               </p>
            </div>
          </div>
        )}
      </CardFooter>
    </form>
  );
}
