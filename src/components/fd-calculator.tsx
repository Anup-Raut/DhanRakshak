"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const schema = z.object({
  principal: z.coerce.number().min(1, 'Principal must be at least 1.'),
  rate: z.coerce.number().min(0.1, 'Interest rate must be positive.').max(100, 'Interest rate seems too high.'),
  tenure: z.coerce.number().min(1, 'Tenure must be at least 1 year.'),
  compounding: z.coerce.number(),
});

type FormData = z.infer<typeof schema>;

export default function FdCalculator() {
  const [maturityValue, setMaturityValue] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
        compounding: 4, // Quarterly default
    }
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const P = data.principal;
    const r = data.rate / 100;
    const t = data.tenure;
    const n = data.compounding;

    const A = P * Math.pow((1 + r / n), n * t);

    setMaturityValue(A);
    setTotalInterest(A - P);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="principal">Principal Amount ($)</Label>
          <Input id="principal" type="number" placeholder="e.g., 50000" {...register('principal')} />
          {errors.principal && <p className="text-sm text-destructive">{errors.principal.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="rate">Interest Rate (p.a. %)</Label>
          <Input id="rate" type="number" step="0.1" placeholder="e.g., 7.5" {...register('rate')} />
          {errors.rate && <p className="text-sm text-destructive">{errors.rate.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="tenure">Tenure (Years)</Label>
          <Input id="tenure" type="number" placeholder="e.g., 5" {...register('tenure')} />
          {errors.tenure && <p className="text-sm text-destructive">{errors.tenure.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Compounding Frequency</Label>
          <Controller
            name="compounding"
            control={control}
            render={({ field }) => (
              <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="2">Half-Yearly</SelectItem>
                  <SelectItem value="1">Annually</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button type="submit">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Maturity
        </Button>
        {maturityValue !== null && totalInterest !== null && (
          <div className="w-full space-y-4 rounded-lg border bg-muted/50 p-6">
            <h3 className="text-lg font-medium">FD Maturity Details</h3>
            <div className="space-y-2">
               <p className="text-muted-foreground">Total Interest Earned: ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
               <p className="text-3xl font-bold text-primary">
                 ${maturityValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                 <span className="text-lg font-medium text-muted-foreground"> maturity value</span>
               </p>
            </div>
          </div>
        )}
      </CardFooter>
    </form>
  );
}
