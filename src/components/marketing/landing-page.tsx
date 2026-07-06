"use client";

import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  Contact,
  Layers3,
  Link as LinkIcon,
  Menu,
  MousePointerClick,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { analyticsSeries, linkItems, testimonials } from "@/data/mock";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const nav = ["Features", "How it works", "Pricing", "FAQ", "Contact"];

export function LandingPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" aria-label="Northstar home">
            <BrandMark />
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
            {nav.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="hover:text-slate-950">
                {item}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild variant="ghost">
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button asChild variant="primary">
              <Link href="/auth/signup">Sign up</Link>
            </Button>
          </div>
          <Button className="lg:hidden" size="icon" variant="ghost" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 bg-white p-5 lg:hidden">
          <div className="flex items-center justify-between">
            <BrandMark />
            <Button size="icon" variant="ghost" onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="size-5" />
            </Button>
          </div>
          <nav className="mt-10 grid gap-4 text-lg font-semibold">
            {nav.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} onClick={() => setOpen(false)}>
                {item}
              </a>
            ))}
          </nav>
          <div className="mt-10 grid gap-3">
            <Button asChild variant="secondary">
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button asChild variant="primary">
              <Link href="/auth/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      ) : null}

      <main>
        <section className="relative overflow-hidden border-b border-slate-200">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-20 lg:grid-cols-[0.78fr_1.22fr] lg:pb-20 lg:pt-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
                Northstar
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                A premium CRM and smart link hub for founders who turn profile traffic into relationships, revenue, and repeatable follow-up.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="primary">
                  <Link href="/auth/signup">
                    Start beta workspace
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/p/alex">
                    View public profile
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-8 grid max-w-lg grid-cols-3 gap-5 text-sm">
                {[
                  ["12.8K", "profile visitors"],
                  ["26.9%", "link CTR"],
                  ["186", "new leads"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <div className="text-2xl font-semibold tracking-[-0.03em]">{value}</div>
                    <div className="mt-1 text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12, duration: 0.55 }}
              className="min-w-0"
            >
              <HeroProductPreview />
            </motion.div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-5 py-20">
          <SectionIntro
            title="One workspace for your public surface and private pipeline."
            body="Northstar connects a beautiful public profile with the CRM, analytics, and AI workflows that make inbound useful."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              [LinkIcon, "Smart Link Hub", "Publish links, portfolio, gallery, resume, videos, forms, and social proof."],
              [Contact, "CRM", "Manage contacts, companies, tags, notes, timelines, and relationship history."],
              [BarChart3, "Analytics", "Track visitors, clicks, CTR, devices, countries, referrers, and conversions."],
              [Sparkles, "AI Assistance", "Summaries, email drafts, page suggestions, and analytics insights."],
            ].map(([Icon, title, body]) => (
              <Card key={String(title)} className="rounded-xl p-5">
                <span className="grid size-10 place-items-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{String(body)}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="benefits" className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionIntro
              title="Built for founders who need signal without operational drag."
              body="The product feels calm because the workflows are connected: publish, capture, score, follow up, and learn."
              align="left"
            />
            <div className="grid gap-3 md:grid-cols-2">
              {[
                "Replace disconnected link-in-bio, spreadsheet CRM, and analytics tabs.",
                "Know which links and projects turn visitors into conversations.",
                "Route contact form submissions into lead scoring and suggested next actions.",
                "Keep the public profile beautiful while the backend workflow stays serious.",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20">
          <SectionIntro title="How it works" body="Launch a profile, capture qualified interest, then keep every relationship moving." />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              ["01", "Build your public profile", "Add links, projects, gallery, video, resume, socials, theme, and contact form."],
              ["02", "Convert traffic into leads", "Every click and submission becomes analytics context and CRM history."],
              ["03", "Follow up with focus", "AI drafts summaries and emails while tasks and deals keep the workflow accountable."],
            ].map(([step, title, body]) => (
              <div key={step} className="rounded-xl border border-slate-200 p-6">
                <div className="text-sm font-semibold text-blue-600">{step}</div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="border-y border-slate-200 bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-5 py-20">
            <SectionIntro
              title="Simple beta pricing"
              body="Start with the profile and CRM foundation. Upgrade as your pipeline grows."
              inverted
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {[
                ["Starter", "$19", "For solo builders launching a polished profile.", ["Smart profile", "Basic CRM", "30-day analytics"]],
                ["Pro", "$49", "For founders turning traffic into pipeline.", ["AI suggestions", "Pipeline kanban", "Advanced analytics", "Custom themes"]],
                ["Team", "$129", "For lean teams managing shared relationships.", ["Team roles", "Shared notes", "Automations", "Priority support"]],
              ].map(([name, price, body, features]) => (
                <Card key={String(name)} className="rounded-xl border-white/10 bg-white/[0.04] p-6 text-white shadow-none">
                  <h3 className="text-lg font-semibold">{String(name)}</h3>
                  <div className="mt-5 flex items-end gap-1">
                    <span className="text-4xl font-semibold tracking-[-0.04em]">{String(price)}</span>
                    <span className="pb-1 text-sm text-slate-400">/mo</span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{String(body)}</p>
                  <div className="mt-6 space-y-3">
                    {(features as string[]).map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-slate-200">
                        <Check className="size-4 text-emerald-400" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button asChild className="mt-7 w-full" variant={name === "Pro" ? "primary" : "secondary"}>
                    <Link href="/auth/signup">Choose {String(name)}</Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20">
          <SectionIntro title="Trusted by founder-led teams" body="Designed for the messy middle between audience, relationships, and revenue." />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="rounded-xl p-6">
                <p className="text-sm leading-7 text-slate-700">“{testimonial.quote}”</p>
                <div className="mt-6">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="faq" className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <SectionIntro title="FAQ" body="Straight answers for a first beta launch." />
            <div className="mt-10 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
              {[
                ["Is this a Linktree replacement?", "It includes a beautiful link hub, but the real product is the CRM and analytics loop behind it."],
                ["Does authentication support Google and GitHub?", "Yes. Supabase email, Google, and GitHub flows are wired behind environment configuration."],
                ["Is the CRM real?", "The current build uses realistic demo data and production-shaped components, with a Supabase schema blueprint ready to connect."],
                ["Can I customize the public profile?", "Yes. The studio includes themes, layout choices, link styles, resume, contact form, and analytics."],
              ].map(([question, answer]) => (
                <details key={question} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {question}
                    <ChevronDown className="size-4 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-4xl font-semibold tracking-[-0.05em]">Ready for the first beta?</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
              Join the early access list and we’ll help shape your first public profile, pipeline, and analytics dashboard.
            </p>
          </div>
          <Card className="rounded-xl p-5">
            <div className="grid gap-3 md:grid-cols-2">
              <Input placeholder="Name" />
              <Input placeholder="Work email" />
              <Input className="md:col-span-2" placeholder="Company or creator brand" />
              <Button className="md:col-span-2" variant="primary" size="lg">
                Request beta access
              </Button>
            </div>
          </Card>
        </section>
      </main>

      <footer className="border-t border-slate-200 px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-slate-500 md:flex-row md:items-center">
          <BrandMark />
          <div className="flex gap-5">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionIntro({
  title,
  body,
  inverted = false,
  align = "center",
}: {
  title: string;
  body: string;
  inverted?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-xl"}>
      <h2
        className={`text-3xl font-semibold tracking-[-0.05em] sm:text-4xl ${
          inverted ? "text-white" : "text-slate-950"
        }`}
      >
        {title}
      </h2>
      <p className={`mt-4 text-sm leading-7 ${inverted ? "text-slate-300" : "text-slate-600"}`}>
        {body}
      </p>
    </div>
  );
}

function HeroProductPreview() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-950/10">
      <div className="grid overflow-hidden rounded-xl border border-slate-200 bg-white lg:grid-cols-[270px_1fr]">
        <div className="border-b border-slate-200 p-4 lg:border-b-0 lg:border-r">
          <div className="relative h-28 overflow-hidden rounded-xl">
            <Image
              src="/assets/generated/profile-cover.png"
              alt="Profile cover"
              fill
              className="object-cover"
              sizes="270px"
            />
          </div>
          <div className="-mt-8 ml-4">
            <Image
              src="/assets/generated/alex-avatar.png"
              alt="Alex Morgan"
              width={64}
              height={64}
              className="size-16 rounded-full border-4 border-white object-cover"
            />
          </div>
          <h3 className="mt-2 text-lg font-semibold">Alex Morgan</h3>
          <p className="mt-1 text-sm text-slate-500">Founder & Product Builder</p>
          <div className="mt-4 space-y-2">
            {linkItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-white">
                  <Icon className="size-4" />
                  <span className="truncate text-xs font-medium">{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              [MousePointerClick, "Clicks", "486"],
              [UsersRound, "Leads", "24"],
              [Layers3, "Deals", "$87K"],
            ].map(([Icon, label, value]) => (
              <div key={String(label)} className="rounded-lg border border-slate-200 p-3">
                <Icon className="size-4 text-blue-600" />
                <div className="mt-3 text-lg font-semibold">{String(value)}</div>
                <div className="text-xs text-slate-500">{String(label)}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsSeries}>
                <CartesianGrid stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis hide />
                <Tooltip />
                <Line dataKey="visitors" stroke="#2563eb" strokeWidth={2.5} dot={false} />
                <Line dataKey="clicks" stroke="#14b8a6" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <Card className="rounded-xl p-4 shadow-none">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="size-4 text-violet-600" />
              AI lead summary
            </div>
            <p className="text-sm leading-6 text-slate-600">
              23 leads are high fit. Case-study visitors are 2.1x more likely to book a call.
            </p>
            <Progress className="mt-4" value={72} />
          </Card>
        </div>
      </div>
    </div>
  );
}
