import { SignUpButton, SignInButton } from "@clerk/nextjs";
import {
  Link2,
  Clipboard,
  LayoutDashboard,
  UserPlus,
  ClipboardList,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const features = [
  {
    icon: Link2,
    title: "Shorten Links",
    description:
      "Turn any long URL into a short, clean link you can share anywhere — in seconds.",
  },
  {
    icon: Clipboard,
    title: "Copy & Share",
    description:
      "Instantly copy your short link with one click and share it anywhere — email, social, or chat.",
  },
  {
    icon: LayoutDashboard,
    title: "Manage Links",
    description:
      "View, edit, and delete all your short links from a single, organised dashboard.",
  },
];

const faqs = [
  {
    question: "Is LinkShortener free to use?",
    answer:
      "Yes! LinkShortener is completely free. Sign up with no credit card required and start shortening links right away.",
  },
  {
    question: "Do my short links ever expire?",
    answer:
      "No. Short links you create are permanent and will continue to work unless you manually delete them from your dashboard.",
  },
  {
    question: "How many links can I shorten?",
    answer:
      "There is no limit. You can create as many short links as you need from your dashboard.",
  },
  {
    question: "Can I edit or delete a short link after creating it?",
    answer:
      "Yes. You can manage all your links from the dashboard — edit the destination URL or delete any link at any time.",
  },
  {
    question: "Do I need an account to shorten a link?",
    answer:
      "An account is required so your links are saved and manageable. Sign up takes only a few seconds with no credit card needed.",
  },
];

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create your account",
    description: "Sign up for free in seconds — no credit card required.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Paste your long URL",
    description:
      "Enter any URL into the dashboard and generate a short link instantly.",
  },
  {
    number: "03",
    icon: Share2,
    title: "Share anywhere",
    description:
      "Copy your short link and share it across email, social media, or any messaging platform.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center gap-8 px-4 py-24 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Shorten, share, and{" "}
          <span className="text-primary">manage your links</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          LinkShortener makes it effortless to create short links, copy and
          share them instantly, and manage everything from one clean dashboard.
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
              <div
                key={number}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="size-6 text-primary" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground font-mono">
                    {number.slice(1)}
                  </span>
                </div>
                <div>
                  <h3 className="mb-1 text-base font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-4 py-24">
        <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map(({ question, answer }) => (
            <AccordionItem key={question} value={question}>
              <AccordionTrigger className="text-left text-base font-medium">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
