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
  principal: z.coerce.number().min(1, 'Principal must be at least 1.'),
  rate: z.coerce.number().min(0.1, 'Interest rate must be positive.').max(100, 'Interest rate seems too high.'),
  tenure: z.coerce.number().min(1, 'Tenure must be at least 1 year.'),
});

type FormData = z.infer<typeof schema>;

export default function EmiCalculator() {
  const [emi, setEmi] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const principal = data.principal;
    const annualRate = data.rate;
    const years = data.tenure;
    
    if (principal > 0 && annualRate > 0 && years > 0) {
      const monthlyRate = annualRate / 12 / 100;
      const numberOfMonths = years * 12;
      const emiValue =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
        (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
      setEmi(emiValue);
    } else {
        setEmi(0);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="principal">Loan Amount ($)</Label>
          <Input id="principal" type="number" placeholder="e.g., 100000" {...register('principal')} />
          {errors.principal && <p className="text-sm text-destructive">{errors.principal.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="rate">Annual Interest Rate (%)</Label>
          <Input id="rate" type="number" placeholder="e.g., 8.5" step="0.1" {...register('rate')} />
          {errors.rate && <p className="text-sm text-destructive">{errors.rate.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="tenure">Loan Tenure (Years)</Label>
          <Input id="tenure" type="number" placeholder="e.g., 10" {...register('tenure')} />
          {errors.tenure && <p className="text-sm text-destructive">{errors.tenure.message}</p>}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button type="submit">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate EMI
        </Button>
        {emi !== null && (
          <div className="w-full space-y-4 rounded-lg border bg-muted/50 p-6">
            <h3 className="text-lg font-medium">Your Monthly EMI</h3>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">
                ${emi.toFixed(2)}
                <span className="text-lg font-medium text-muted-foreground"> / month</span>
              </p>
            </div>
          </div>
        )}
      </CardFooter>
    </form>
  );
}
