import SavingsCalculator from '@/components/savings-calculator';
import EmiCalculator from '@/components/emi-calculator';
import SipCalculator from '@/components/sip-calculator';
import PpfCalculator from '@/components/ppf-calculator';
import RetirementCalculator from '@/components/retirement-calculator';
import TaxCalculator from '@/components/tax-calculator';
import FdCalculator from '@/components/fd-calculator';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CalculatorsPage() {
  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline tracking-tight">
          Financial Calculators
        </h1>
        <p className="text-muted-foreground">
          Tools to help you plan your financial future.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Savings Goal Calculator</CardTitle>
          <CardDescription>
            Calculate how much you need to save to reach your financial goals.
          </CardDescription>
        </CardHeader>
        <SavingsCalculator />
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">EMI Calculator</CardTitle>
          <CardDescription>
            Calculate your Equated Monthly Installment (EMI) for loans.
          </CardDescription>
        </CardHeader>
        <EmiCalculator />
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">SIP Calculator</CardTitle>
          <CardDescription>
            Estimate the future value of your Systematic Investment Plan (SIP).
          </CardDescription>
        </CardHeader>
        <SipCalculator />
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">PPF Calculator</CardTitle>
          <CardDescription>
            Calculate the maturity value of your Public Provident Fund investment.
          </CardDescription>
        </CardHeader>
        <PpfCalculator />
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Retirement Calculator</CardTitle>
          <CardDescription>
            Estimate the corpus you will have for your retirement.
          </CardDescription>
        </CardHeader>
        <RetirementCalculator />
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Income Tax Calculator</CardTitle>
          <CardDescription>
            Calculate your income tax liability under the new tax regime.
          </CardDescription>
        </CardHeader>
        <TaxCalculator />
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">FD Calculator</CardTitle>
          <CardDescription>
            Calculate the maturity amount for a Fixed Deposit.
          </CardDescription>
        </CardHeader>
        <FdCalculator />
      </Card>
    </div>
  );
}
