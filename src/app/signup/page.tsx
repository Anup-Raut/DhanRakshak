'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Rocket } from 'lucide-react';
import { useUser } from '@/context/user-context';

export default function SignupPage() {
  const [name, setName] = useState('');
  const { login } = useUser();
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
      router.push('/dashboard');
    }
  };

  return (
      <div className="w-full max-w-sm text-center">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-white p-4 rounded-2xl mb-5 shadow-lg">
            <ShieldCheck className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight">
            Create an Account
          </h1>
          <p className="mt-2 text-primary-foreground/80">
            Start your journey to financial literacy with DhanRakshak.
          </p>
        </div>
        <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2 text-left">
                <Label htmlFor="name" className="text-primary-foreground">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-primary-foreground text-primary placeholder:text-primary/60 border-transparent focus-visible:ring-accent"
                />
              </div>
              <div className="space-y-2 text-left">
                <Label htmlFor="email" className="text-primary-foreground">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required 
                 className="bg-primary-foreground text-primary placeholder:text-primary/60 border-transparent focus-visible:ring-accent"
                />
              </div>
              <div className="space-y-2 text-left">
                <Label htmlFor="password" className="text-primary-foreground">Password</Label>
                <Input id="password" type="password" required 
                 className="bg-primary-foreground text-primary placeholder:text-primary/60 border-transparent focus-visible:ring-accent"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                <Rocket className="mr-2 h-5 w-5" />
                Create Account
              </Button>
              <div className="mt-2 text-center text-sm">
                Already have an account?{' '}
                <Link href="/" className="underline font-semibold text-primary-foreground">
                  Login
                </Link>
              </div>
            </div>
        </form>
      </div>
  );
}
