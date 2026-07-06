"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GitBranch, Loader2, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type AuthMode = "login" | "signup" | "forgot";

const authSchema = z.object({
  email: z.string().email("Use a valid work email."),
  password: z.string().min(8, "Use at least 8 characters.").optional(),
});

type AuthValues = z.infer<typeof authSchema>;

const copy = {
  login: {
    title: "Welcome back",
    description: "Sign in to manage your profile, leads, and relationship pipeline.",
    submit: "Sign in",
    alternate: "New to Northstar?",
    alternateAction: "Create an account",
    alternateHref: "/auth/signup",
  },
  signup: {
    title: "Create your workspace",
    description: "Launch a smart profile and CRM workspace for your founder-led motion.",
    submit: "Create account",
    alternate: "Already have an account?",
    alternateAction: "Sign in",
    alternateHref: "/auth/login",
  },
  forgot: {
    title: "Reset your password",
    description: "Enter your email and we’ll send a secure reset link.",
    submit: "Send reset link",
    alternate: "Remember your password?",
    alternateAction: "Back to login",
    alternateHref: "/auth/login",
  },
};

export function AuthPanel({ mode }: { mode: AuthMode }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "alex@northstar.dev",
      password: mode === "forgot" ? undefined : "northstar-demo",
    },
  });

  async function onSubmit(values: AuthValues) {
    setLoading(true);

    try {
      if (!hasSupabaseEnv) {
        toast.success(
          mode === "forgot"
            ? "Demo reset email queued."
            : "Demo session ready. Opening the workspace.",
        );
        if (mode !== "forgot") {
          window.setTimeout(() => {
            router.push("/app");
          }, 500);
        }
        return;
      }

      const supabase = createSupabaseBrowserClient();

      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
          redirectTo: `${window.location.origin}/auth/login`,
        });
        if (error) throw error;
        toast.success("Reset link sent.");
        return;
      }

      const authAction =
        mode === "signup"
          ? supabase.auth.signUp({
              email: values.email,
              password: values.password ?? "",
              options: { emailRedirectTo: `${window.location.origin}/app` },
            })
          : supabase.auth.signInWithPassword({
              email: values.email,
              password: values.password ?? "",
            });

      const { error } = await authAction;
      if (error) throw error;
      router.push("/app");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  async function oauth(provider: "google" | "github") {
    if (!hasSupabaseEnv) {
      toast.message("OAuth is in demo mode until Supabase env vars are configured.");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/app` },
    });

    if (error) toast.error(error.message);
  }

  const content = copy[mode];

  return (
    <main className="grid min-h-screen grid-cols-1 bg-slate-50 lg:grid-cols-[1fr_520px]">
      <section className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_20%,rgba(37,99,235,0.28),transparent_34%),linear-gradient(135deg,#020617,#0f172a_42%,#0b1220)]" />
        <div className="relative z-10 flex max-w-xl flex-col justify-between">
          <BrandMark className="[&_span:first-child]:border-white/10 [&_span:first-child]:bg-white/10 [&_span:first-child]:text-white [&_span:last-child]:text-white" />
          <div className="space-y-6">
            <p className="max-w-md text-4xl font-semibold tracking-[-0.04em]">
              Convert your public profile traffic into real relationships.
            </p>
            <div className="grid gap-3 text-sm text-slate-300">
              {[
                "Smart link hub, portfolio, resume, and contact forms.",
                "Lead scoring, notes, deals, and tasks in one workspace.",
                "AI suggestions for follow-ups and page improvements.",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="grid size-7 place-items-center rounded-lg bg-white/10 text-emerald-300">
                    <ShieldCheck className="size-4" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-400">
            Built for founder-led growth, creator businesses, and lean GTM teams.
          </p>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10">
        <Card className="w-full max-w-md rounded-2xl p-6 shadow-xl shadow-slate-950/5">
          <div className="mb-8 flex items-center justify-between">
            <BrandMark />
            <Link className="text-sm font-medium text-slate-500 hover:text-slate-950" href="/">
              Back home
            </Link>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              {content.title}
            </h1>
            <p className="text-sm leading-6 text-slate-600">{content.description}</p>
          </div>

          {mode !== "forgot" ? (
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button type="button" variant="secondary" onClick={() => oauth("google")}>
                <Mail className="size-4" />
                Google
              </Button>
              <Button type="button" variant="secondary" onClick={() => oauth("github")}>
                <GitBranch className="size-4" />
                GitHub
              </Button>
            </div>
          ) : null}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="email">
                Email
              </label>
              <Input id="email" type="email" autoComplete="email" {...register("email")} />
              {errors.email ? (
                <p className="text-xs font-medium text-red-600">{errors.email.message}</p>
              ) : null}
            </div>

            {mode !== "forgot" ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700" htmlFor="password">
                    Password
                  </label>
                  <Link
                    className="text-xs font-medium text-blue-600 hover:text-blue-700"
                    href="/auth/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  {...register("password")}
                />
                {errors.password ? (
                  <p className="text-xs font-medium text-red-600">
                    {errors.password.message}
                  </p>
                ) : null}
              </div>
            ) : null}

            <Button className="w-full" type="submit" variant="primary" size="lg" disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : null}
              {content.submit}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-1 text-sm text-slate-600">
            <span>{content.alternate}</span>
            <Link
              className={cn("font-medium text-blue-600 hover:text-blue-700")}
              href={content.alternateHref}
            >
              {content.alternateAction}
            </Link>
          </div>

          {!hasSupabaseEnv ? (
            <p className="mt-5 rounded-lg bg-blue-50 px-3 py-2 text-xs leading-5 text-blue-700">
              Demo mode: add Supabase public env vars to enable live email, Google, and GitHub auth.
            </p>
          ) : null}
        </Card>
      </section>
    </main>
  );
}
