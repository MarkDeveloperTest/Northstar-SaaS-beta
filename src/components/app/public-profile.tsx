"use client";

import {
  ArrowUpRight,
  AtSign,
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  GitBranch,
  Link as LinkIcon,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { BrandMark } from "@/components/brand-mark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { linkItems } from "@/data/mock";
import { withBasePath } from "@/lib/base-path";

export function PublicProfile() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <Image
          src={withBasePath("/assets/generated/profile-cover.png")}
          alt="Coastal cover"
          fill
          className="object-cover opacity-55"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950" />
        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-5">
          <header className="flex items-center justify-between">
            <Link href="/" className="rounded-xl bg-white/95 px-3 py-2 text-slate-950">
              <BrandMark />
            </Link>
            <Button asChild variant="secondary" className="bg-white/95">
              <Link href="/auth/signup">Create yours</Link>
            </Button>
          </header>

          <div className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <div className="inline-flex rounded-full border-4 border-white/20 bg-white/15 p-1 backdrop-blur">
                <Image
                  src={withBasePath("/assets/generated/alex-avatar.png")}
                  alt="Alex Morgan"
                  width={132}
                  height={132}
                  className="size-32 rounded-full object-cover"
                />
              </div>
              <div className="mt-6 flex items-center gap-2">
                <h1 className="text-5xl font-semibold tracking-[-0.06em]">Alex Morgan</h1>
                <CheckCircle2 className="size-6 fill-blue-500 text-slate-950" />
              </div>
              <p className="mt-3 text-lg text-slate-300">Founder & Product Builder</p>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                I build digital products and share practical ideas on design, growth, and founder-led go-to-market.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
                <Badge tone="blue" className="border-white/10 bg-white/10 text-white">
                  <MapPin className="mr-1 size-3.5" />
                  San Francisco
                </Badge>
                <Badge tone="green" className="border-white/10 bg-white/10 text-white">
                  Available for advisory
                </Badge>
              </div>
              <div className="mt-7 flex gap-3">
                {[GitBranch, AtSign, LinkIcon, Mail].map((Icon, index) => (
                  <button
                    key={index}
                    className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Social link"
                  >
                    <Icon className="size-4" />
                  </button>
                ))}
              </div>
            </div>

            <Card className="rounded-2xl border-white/10 bg-white/10 p-4 text-white shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="grid gap-3">
                {linkItems.slice(0, 6).map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.id}
                      href="#contact"
                      className="group flex items-center gap-4 rounded-xl bg-white px-4 py-3 text-slate-950 transition hover:-translate-y-0.5 hover:shadow-xl"
                    >
                      <span className="grid size-10 place-items-center rounded-lg bg-slate-950 text-white">
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">{link.title}</span>
                        <span className="block truncate text-sm text-slate-500">{link.description}</span>
                      </span>
                      <ArrowUpRight className="size-4 text-slate-400 transition group-hover:text-blue-600" />
                    </a>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-20 lg:grid-cols-3">
        {[
          ["Northwind case study", "Scaled onboarding experiments from 12K to 100K monthly users.", BriefcaseBusiness],
          ["Startup playbook", "A free operating guide for founder-led acquisition and activation.", Download],
          ["Product advisory", "Focused product, growth, and design systems support for early teams.", Send],
        ].map(([title, body, Icon]) => (
          <Card key={String(title)} className="rounded-2xl border-white/10 bg-white/[0.04] p-6 text-white shadow-none">
            <Icon className="size-6 text-blue-300" />
            <h2 className="mt-6 text-xl font-semibold tracking-[-0.03em]">{String(title)}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{String(body)}</p>
          </Card>
        ))}
      </section>

      <section id="contact" className="mx-auto grid max-w-6xl gap-8 px-5 pb-24 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="text-4xl font-semibold tracking-[-0.05em]">Get in touch</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
            Tell me what you’re building and I’ll reply with a focused next step.
          </p>
        </div>
        <Card className="rounded-2xl border-white/10 bg-white p-5 text-slate-950">
          {sent ? (
            <div className="grid min-h-64 place-items-center text-center">
              <div>
                <CheckCircle2 className="mx-auto size-10 text-emerald-600" />
                <h3 className="mt-4 text-xl font-semibold">Message sent</h3>
                <p className="mt-2 text-sm text-slate-500">This lead is now ready in the Northstar CRM.</p>
              </div>
            </div>
          ) : (
            <form
              className="grid gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
                toast.success("Lead captured in CRM.");
              }}
            >
              <div className="grid gap-3 md:grid-cols-2">
                <Input required placeholder="Name" />
                <Input required type="email" placeholder="Email" />
              </div>
              <Input placeholder="Company" />
              <Textarea required placeholder="What can I help with?" />
              <Button variant="primary" size="lg">
                Send message
              </Button>
            </form>
          )}
        </Card>
      </section>
    </main>
  );
}
