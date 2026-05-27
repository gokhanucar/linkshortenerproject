import { SignUpButton, SignInButton } from '@clerk/nextjs';
import { Link2, BarChart2, LayoutDashboard, UserPlus, ClipboardList, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const features = [
  {
    icon: Link2,
    title: 'Shorten Links',
    description:
      'Turn any long URL into a short, clean link you can share anywhere — in seconds.',
  },
  {
    icon: BarChart2,
    title: 'Track Clicks',
    description:
      'See exactly how many times each link has been clicked with real-time analytics.',
  },
  {
    icon: LayoutDashboard,
    title: 'Manage Links',
    description:
      'View, edit, and delete all your short links from a single, organised dashboard.',
  },
];

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Create your account',
    description: 'Sign up for free in seconds — no credit card required.',
  },
  {
    number: '02',
    icon: ClipboardList,
    title: 'Paste your long URL',
    description: 'Enter any URL into the dashboard and generate a short link instantly.',
  },
  {
    number: '03',
    icon: Share2,
    title: 'Share and track',
    description: 'Copy your short link, share it anywhere, and watch the click analytics roll in.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col font-[family-name:var(--font-geist-sans)]">
      {/* Hero */}
      <section className="flex flex-col items-center gap-8 px-4 py-24 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Shorten, share, and{' '}
          <span className="text-primary">track your links</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          LinkShortener makes it effortless to create short links, monitor click
          analytics, and manage everything from one clean dashboard.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
            <Button size="lg">Get started — it&apos;s free</Button>
          </SignUpButton>
          <SignInButton mode="modal" forceRedirectUrl="/dashboard">
            <Button size="lg" variant="outline">
              Sign in
            </Button>
          </SignInButton>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-24">
        <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Everything you need
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-muted/30 px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
            How it works
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map(({ number, icon: Icon, title, description }) => (
              <div key={number} className="flex flex-col items-center gap-4 text-center">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="size-6 text-primary" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground font-[family-name:var(--font-geist-mono)]">
                    {number.slice(1)}
                  </span>
                </div>
                <div>
                  <h3 className="mb-1 text-base font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
