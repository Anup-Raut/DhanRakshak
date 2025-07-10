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
  annualIncome: z.coerce.number().min(0, 'Income must be non-negative.'),
});

type FormData = z.infer<typeof schema>;

export default function TaxCalculator() {
  const [taxPayable, setTaxPayable] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const calculateTax = (income: number): number => {
    // New Tax Regime (FY 2023-24 / AY 2024-25) for individuals < 60
    const taxableIncome = income > 50000 ? income - 50000 : 0; // Standard Deduction

    if (taxableIncome <= 700000) {
      return 0; // Tax rebate u/s 87A
    }

    let tax = 0;
    if (taxableIncome > 300000) {
      tax += (Math.min(taxableIncome, 600000) - 300000) * 0.05;
    }
    if (taxableIncome > 600000) {
      tax += (Math.min(taxableIncome, 900000) - 600000) * 0.10;
    }
    if (taxableIncome > 900000) {
      tax += (Math.min(taxableIncome, 1200000) - 900000) * 0.15;
    }
    if (taxableIncome > 1200000) {
      tax += (Math.min(taxableIncome, 1500000) - 1200000) * 0.20;
    }
    if (taxableIncome > 1500000) {
      tax += (taxableIncome - 1500000) * 0.30;
    }

    const cess = tax * 0.04;
    return tax + cess;
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const tax = calculateTax(data.annualIncome);
    setTaxPayable(tax);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="grid gap-6 md:grid-cols-1">
        <div className="space-y-2">
          <Label htmlFor="annualIncome">Total Annual Income ($)</Label>
          <Input id="annualIncome" type="number" placeholder="e.g., 1000000" {...register('annualIncome')} />
          {errors.annualIncome && <p className="text-sm text-destructive">{errors.annualIncome.message}</p>}
          <p className="text-xs text-muted-foreground">Calculated as per the new tax regime (FY 2023-24) including a standard deduction of $50,000.</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button type="submit">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Tax
        </Button>
        {taxPayable !== null && (
          <div className="w-full space-y-4 rounded-lg border bg-muted/50 p-6">
            <h3 className="text-lg font-medium">Income Tax Payable</h3>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">
                ${taxPayable.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </CardFooter>
    </form>
  );
}
