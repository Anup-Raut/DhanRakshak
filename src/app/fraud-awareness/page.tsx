import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Smartphone, UserX, MailWarning } from 'lucide-react';

const fraudScenarios = {
  phishing: {
    title: 'Phishing Email',
    icon: MailWarning,
    description: 'A scammer sends a fake email pretending to be from your bank.',
    scenario: {
      from: 'Your Bank Security <security-update@y0urbank.com>',
      subject: 'Urgent: Action Required on Your Account',
      body: 'Dear Customer,\n\nWe detected suspicious activity on your account. Please click the link below to verify your identity immediately. Failure to do so will result in account suspension.\n\n[Link: http://yourbank-security-check.ru/login]\n\nThank you,\nYour Bank Security Team',
    },
    tips: [
      'Check the sender\'s email address for typos or unusual domains.',
      'Hover over links to see the actual URL before clicking.',
      'Legitimate banks will never ask for sensitive info via email.',
    ],
  },
  otp: {
    title: 'OTP Scam',
    icon: Smartphone,
    description: 'A scammer calls you pretending to be a representative and asks for an OTP.',
    scenario: {
      caller: 'Unkown Number',
      dialogue: 'Hi, I\'m from DhanRakshak support. We are updating your KYC. You will receive a One-Time Password (OTP). Please share it with me to complete the process.',
    },
    tips: [
      'NEVER share your OTP with anyone, including bank or company employees.',
      'Legitimate companies will never call you and ask for an OTP.',
      'If you receive such a call, hang up immediately and report the number.',
    ],
  },
  identityTheft: {
    title: 'Identity Theft',
    icon: UserX,
    description: 'Scammers steal your personal information to open accounts in your name.',
    scenario: {
      situation: 'You receive a credit card bill for an account you never opened. Upon checking your credit report, you find several inquiries and new accounts you don\'t recognize.',
    },
    tips: [
      'Regularly check your credit report for unauthorized activity.',
      'Use strong, unique passwords for all your financial accounts.',
      'Be cautious about sharing personal information online or over the phone.',
    ],
  },
};

export default function FraudAwarenessPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline tracking-tight">
          Fraud Awareness Center
        </h1>
        <p className="text-muted-foreground">
          Learn to identify and avoid common financial scams.
        </p>
      </div>

      <Tabs defaultValue="phishing" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-1 sm:h-10 sm:grid-cols-3">
          <TabsTrigger value="phishing">Phishing</TabsTrigger>
          <TabsTrigger value="otp">OTP Scams</TabsTrigger>
          <TabsTrigger value="identityTheft">Identity Theft</TabsTrigger>
        </TabsList>

        {Object.entries(fraudScenarios).map(([key, fraud]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <fraud.icon className="h-8 w-8 text-destructive" />
                    <div>
                      <h2 className="text-xl font-bold font-headline">{fraud.title}</h2>
                      <p className="text-muted-foreground">{fraud.description}</p>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm">
                    {key === 'phishing' && (
                      <div className="space-y-2">
                        <div><strong>From:</strong> {fraud.scenario.from}</div>
                        <div><strong>Subject:</strong> {fraud.scenario.subject}</div>
                        <hr className="my-2 border-border" />
                        <div className="whitespace-pre-wrap">{fraud.scenario.body}</div>
                      </div>
                    )}
                    {key === 'otp' && (
                      <div className="space-y-2">
                         <div><strong>Caller ID:</strong> {fraud.scenario.caller}</div>
                         <hr className="my-2 border-border" />
                         <p>"{fraud.scenario.dialogue}"</p>
                      </div>
                    )}
                     {key === 'identityTheft' && (
                      <div className="space-y-2 font-sans">
                         <p className="font-medium">The Situation:</p>
                         <p>{fraud.scenario.situation}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">How to Stay Safe:</h3>
                    <ul className="space-y-2">
                      {fraud.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 mt-1 text-accent flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
