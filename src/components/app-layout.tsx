'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  ShieldAlert,
  Calculator,
  Bot,
  ShieldCheck,
  User,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import Notifications from './notifications';

const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/learn', icon: BookOpen, label: 'Learn' },
    { href: '/fraud-awareness', icon: ShieldAlert, label: 'Fraud Awareness' },
    { href: '/calculators', icon: Calculator, label: 'Calculators' },
    { href: '/coach', icon: Bot, label: 'AI Coach' },
    { href: '/profile', icon: User, label: 'Profile' },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/' || pathname === '/signup';

  if (isAuthPage) {
    return (
        <div className="flex h-full items-center justify-center bg-primary text-primary-foreground p-4 md:p-6 lg:p-8">
            {children}
        </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-full">
        <Sidebar className="flex flex-col" collapsible="icon">
          <SidebarHeader>
            <Link href="/dashboard" className="flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-headline font-semibold text-primary">
                DhanRakshak
              </h1>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className="w-full justify-start"
                    tooltip={{ children: item.label, side: 'right' }}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             {/* Theme toggle moved to header */}
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1">
          <SidebarInset className="max-h-screen overflow-auto">
            <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
                <div className="flex items-center gap-4 md:hidden">
                    <SidebarTrigger />
                    <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                       <ShieldCheck className="w-6 h-6 text-primary" />
                       <span className="text-lg font-headline">DhanRakshak</span>
                    </Link>
                </div>
                <div className="hidden flex-1 md:block" /> {/* Spacer for desktop */}
                <div className="flex items-center gap-2">
                    <Notifications />
                    <ThemeToggle />
                </div>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
