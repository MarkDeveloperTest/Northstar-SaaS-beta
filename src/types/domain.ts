import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  icon: LucideIcon;
  badge?: string;
};

export type LinkItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  clicks: number;
  ctr: number;
  enabled: boolean;
};

export type Lead = {
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: "New" | "Qualified" | "Nurturing" | "At risk";
  intent: "High" | "Medium" | "Low";
  lastActivity: string;
  avatar: string;
};

export type Deal = {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: "Lead" | "Qualified" | "Proposal" | "Negotiation" | "Closed Won";
  owner: string;
  note: string;
};

export type Task = {
  id: string;
  label: string;
  due: string;
  owner: string;
  done: boolean;
};

export type Activity = {
  actor: string;
  event: string;
  time: string;
};
