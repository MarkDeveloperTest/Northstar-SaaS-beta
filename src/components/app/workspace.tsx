"use client";

import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Command } from "cmdk";
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Eye,
  GripVertical,
  Link as LinkIcon,
  Mail,
  Menu,
  MoreVertical,
  MousePointerClick,
  PanelRightOpen,
  Plus,
  Search,
  Send,
  Settings2,
  Share2,
  Sparkles,
  Star,
  Upload,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { BrandMark } from "@/components/brand-mark";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  activityFeed,
  analyticsSeries,
  appNav,
  countries,
  deals,
  devices,
  leads,
  linkItems,
  profileTabs,
  tasks,
} from "@/data/mock";
import { cn, formatCurrency } from "@/lib/utils";
import type { Deal, LinkItem, Task } from "@/types/domain";

const stages = ["Lead", "Qualified", "Proposal", "Negotiation", "Closed Won"] as const;
const themeSwatches = ["#082f49", "#0f766e", "#111827", "#f8fafc", "#dbeafe"];

export function SaasWorkspace() {
  const [activeNav, setActiveNav] = useState("Profile");
  const [activeTab, setActiveTab] = useState("Profile");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const commands = [
    "Profile",
    "Leads",
    "CRM",
    "Deals",
    "Analytics",
    "Tasks",
    "AI Studio",
    "Settings",
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <CommandPalette
        commands={commands}
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onSelect={(command) => {
          setActiveNav(command);
          setCommandOpen(false);
        }}
      />

      <div className="grid min-h-screen lg:grid-cols-[184px_1fr]">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-[184px] border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0",
            mobileNavOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <Sidebar
            activeNav={activeNav}
            onSelect={(label) => {
              setActiveNav(label);
              setMobileNavOpen(false);
            }}
          />
        </aside>

        {mobileNavOpen ? (
          <button
            aria-label="Close navigation"
            className="fixed inset-0 z-30 bg-slate-950/20 lg:hidden"
            onClick={() => setMobileNavOpen(false)}
          />
        ) : null}

        <div className="min-w-0">
          <TopBar
            activeNav={activeNav}
            onMenu={() => setMobileNavOpen(true)}
            onCommand={() => setCommandOpen(true)}
          />

          <main className="min-h-[calc(100vh-58px)]">
            {activeNav === "Profile" ? (
              <ProfileStudio activeTab={activeTab} onTabChange={setActiveTab} />
            ) : (
              <ModuleView activeNav={activeNav} onNavChange={setActiveNav} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function Sidebar({
  activeNav,
  onSelect,
}: {
  activeNav: string;
  onSelect: (label: string) => void;
}) {
  return (
    <div className="flex h-full flex-col px-2 py-3">
      <Link href="/" className="mb-4 px-2">
        <BrandMark />
      </Link>

      <button className="mb-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2 text-left transition hover:bg-slate-50">
        <Avatar className="size-8">
          <AvatarImage src="/assets/generated/alex-avatar.png" alt="Alex Morgan" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs font-semibold text-slate-950">Alex Morgan</span>
          <span className="block truncate text-[11px] text-slate-500">Workspace</span>
        </span>
        <ChevronDown className="size-3.5 text-slate-400" />
      </button>

      <nav className="space-y-1" aria-label="Workspace navigation">
        {appNav.map((item) => {
          const Icon = item.icon;
          const active = item.label === activeNav;

          return (
            <button
              key={item.label}
              className={cn(
                "flex h-9 w-full items-center gap-2 rounded-lg px-2 text-sm font-medium transition",
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
              )}
              onClick={() => onSelect(item.label)}
            >
              <Icon className="size-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge ? (
                <span className="rounded-full bg-blue-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <Card className="rounded-lg p-3">
          <div className="text-xs font-semibold text-slate-950">Pro Plan</div>
          <div className="mt-1 text-[11px] text-slate-500">12,500 leads remaining</div>
          <Progress className="mt-3" value={43} />
          <button className="mt-3 text-xs font-medium text-blue-600">View usage</button>
        </Card>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 p-2">
          <Avatar className="size-7">
            <AvatarImage src="/assets/generated/alex-avatar.png" alt="Alex Morgan" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">Alex Morgan</p>
            <p className="truncate text-[11px] text-slate-500">alex@northstar.dev</p>
          </div>
          <MoreVertical className="size-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
}

function TopBar({
  activeNav,
  onMenu,
  onCommand,
}: {
  activeNav: string;
  onMenu: () => void;
  onCommand: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 flex h-[58px] items-center gap-3 border-b border-slate-200 bg-white/90 px-3 backdrop-blur-xl sm:px-5">
      <Button className="lg:hidden" size="icon" variant="ghost" onClick={onMenu} aria-label="Open navigation">
        <Menu className="size-5" />
      </Button>

      <div className="hidden min-w-[238px] sm:block">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
          alex.northstar.link
          <Badge tone="green" className="h-5 rounded-full border-emerald-100 bg-emerald-50 text-[11px]">
            Live
          </Badge>
          <ChevronDown className="size-3.5 text-slate-400" />
        </div>
        <p className="text-xs text-slate-500">Last published 2h ago</p>
      </div>

      <button
        className="mx-auto hidden h-9 w-full max-w-[420px] items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 transition hover:border-slate-300 hover:bg-white md:flex"
        onClick={onCommand}
      >
        <Search className="size-4" />
        <span className="flex-1 text-left">Search Northstar or type a command...</span>
        <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[11px] text-slate-500">
          ⌘ K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="secondary" className="hidden sm:inline-flex" onClick={() => toast("Preview opened in a new tab.")}>
          <Eye className="size-4" />
          Preview
        </Button>
        <Button variant="secondary" className="hidden sm:inline-flex" onClick={() => toast.success("Share link copied.")}>
          <Upload className="size-4" />
          Share
        </Button>
        <Button size="icon" variant="ghost" aria-label="Notifications">
          <span className="relative">
            <Bell className="size-4" />
            <span className="absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
              3
            </span>
          </span>
        </Button>
        <Button variant="primary" onClick={() => toast.success(`${activeNav} changes published.`)}>
          <Share2 className="size-4" />
          Publish
        </Button>
      </div>
    </header>
  );
}

function ProfileStudio({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  const [links, setLinks] = useState<LinkItem[]>(linkItems);
  const [selectedTheme, setSelectedTheme] = useState(themeSwatches[0]);
  const [layout, setLayout] = useState("Stack");
  const activeLinks = links.filter((link) => link.enabled);

  function toggleLink(id: string) {
    setLinks((current) =>
      current.map((link) => (link.id === id ? { ...link, enabled: !link.enabled } : link)),
    );
  }

  function addLink() {
    setLinks((current) => [
      ...current,
      {
        id: `link-${current.length + 1}`,
        title: "Product audit",
        description: "Request a focused teardown",
        href: "northstar.link/alex/audit",
        icon: PanelRightOpen,
        clicks: 0,
        ctr: 0,
        enabled: true,
      },
    ]);
    toast.success("New link added.");
  }

  return (
    <div>
      <div className="overflow-x-auto border-b border-slate-200 px-4 sm:px-5">
        <div className="flex min-w-max gap-3">
          {profileTabs.map((tab) => {
            const Icon = tab.icon;
            const active = tab.label === activeTab;

            return (
              <button
                key={tab.label}
                className={cn(
                  "flex h-10 items-center gap-1.5 border-b-2 px-2 text-sm font-medium transition",
                  active
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-slate-500 hover:text-slate-950",
                )}
                onClick={() => onTabChange(tab.label)}
              >
                <Icon className="size-4 lg:hidden" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 border-b border-slate-200 xl:grid-cols-[400px_minmax(480px,1fr)_330px]">
        <section className="border-b border-slate-200 p-4 xl:border-b-0 xl:border-r">
          <ProfilePreview links={activeLinks} selectedTheme={selectedTheme} />
        </section>

        <section className="border-b border-slate-200 p-4 xl:border-b-0 xl:border-r">
          {activeTab === "Analytics" ? (
            <AnalyticsDeepDive />
          ) : activeTab === "Theme" ? (
            <ThemeEditor
              selectedTheme={selectedTheme}
              onThemeChange={setSelectedTheme}
              layout={layout}
              onLayoutChange={setLayout}
            />
          ) : (
            <LinkEditor
              links={links}
              layout={layout}
              selectedTheme={selectedTheme}
              onAdd={addLink}
              onToggle={toggleLink}
              onLayoutChange={setLayout}
              onThemeChange={setSelectedTheme}
            />
          )}
        </section>

        <section className="p-4">
          <AnalyticsRail />
        </section>
      </div>

      <CRMStrip />
    </div>
  );
}

function ProfilePreview({
  links,
  selectedTheme,
}: {
  links: LinkItem[];
  selectedTheme: string;
}) {
  return (
    <Card className="mx-auto max-w-[350px] overflow-hidden rounded-xl shadow-xl shadow-slate-950/10">
      <div className="relative h-28">
        <Image
          src="/assets/generated/profile-cover.png"
          alt="Coastal profile cover"
          fill
          className="object-cover"
          priority
          sizes="360px"
        />
        <div className="absolute right-3 top-3 flex gap-2">
          <Button size="sm" variant="secondary" className="h-7 bg-white/90 px-2 text-xs">
            <Mail className="size-3.5" />
            Subscribe
          </Button>
        </div>
      </div>

      <div className="relative px-5 pb-5 text-center">
        <div className="-mt-12 inline-flex rounded-full border-4 border-white bg-white shadow-md">
          <Image
            src="/assets/generated/alex-avatar.png"
            alt="Alex Morgan"
            width={76}
            height={76}
            className="size-[76px] rounded-full object-cover"
          />
        </div>
        <div className="mt-2 flex items-center justify-center gap-1.5">
          <h2 className="text-[22px] font-semibold tracking-[-0.03em]">Alex Morgan</h2>
          <CheckCircle2 className="size-4 fill-blue-600 text-white" />
        </div>
        <p className="mt-1 text-xs text-slate-500">Founder & Product Builder</p>
        <p className="mx-auto mt-1.5 max-w-[260px] text-xs leading-5 text-slate-600">
          I build digital products and share ideas on building, growth, and design.
        </p>

        <div className="mt-2.5 flex items-center justify-center gap-4 text-slate-700">
          <Mail className="size-4" />
          <LinkIcon className="size-4" />
          <Star className="size-4" />
          <ArrowUpRight className="size-4" />
        </div>

        <div className="mt-3 space-y-1.5">
          {links.slice(0, 5).map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-1.5 text-left text-white shadow-sm transition hover:-translate-y-0.5"
                style={{ background: selectedTheme }}
              >
                <span className="grid size-8 place-items-center rounded-md bg-white/95 text-slate-900">
                  <Icon className="size-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold">{link.title}</span>
                  <span className="block truncate text-[11px] text-white/75">{link.description}</span>
                </span>
                <MoreVertical className="size-4 text-white/70" />
              </button>
            );
          })}
        </div>

        <Button className="mt-3 h-8 w-full" variant="secondary">
          <Mail className="size-4" />
          Get in touch
        </Button>
        <p className="mt-3 text-[11px] text-slate-400">© 2026 Alex Morgan. All rights reserved.</p>
      </div>
    </Card>
  );
}

function LinkEditor({
  links,
  layout,
  selectedTheme,
  onAdd,
  onToggle,
  onLayoutChange,
  onThemeChange,
}: {
  links: LinkItem[];
  layout: string;
  selectedTheme: string;
  onAdd: () => void;
  onToggle: (id: string) => void;
  onLayoutChange: (layout: string) => void;
  onThemeChange: (theme: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold tracking-[-0.02em]">Links</h1>
          <p className="text-sm text-slate-500">Organize and manage the links on your profile.</p>
        </div>
        <Button variant="primary" onClick={onAdd}>
          <Plus className="size-4" />
          Add Link
        </Button>
      </div>

      <div className="space-y-1.5">
        {links.map((link, index) => {
          const Icon = link.icon;

          return (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={cn(
                "flex items-center gap-3 rounded-lg border bg-white p-2.5 transition",
                index === 0 ? "border-blue-500 ring-4 ring-blue-50" : "border-slate-200 hover:border-slate-300",
              )}
            >
              <GripVertical className="size-4 text-slate-400" />
              <span className="grid size-7 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700">
                <Icon className="size-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold leading-5 text-slate-950">{link.title}</div>
                <div className="truncate text-xs text-slate-500">{link.description}</div>
              </div>
              <Switch
                checked={link.enabled}
                onCheckedChange={() => onToggle(link.id)}
                aria-label={`Toggle ${link.title}`}
              />
              <Button size="icon" variant="ghost" aria-label={`More actions for ${link.title}`}>
                <MoreVertical className="size-4" />
              </Button>
            </motion.div>
          );
        })}
      </div>

      <button
        className="flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 text-sm font-medium text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        onClick={onAdd}
      >
        <Plus className="size-4" />
        Add New Link
      </button>

      <div>
        <ThemeEditor
          selectedTheme={selectedTheme}
          onThemeChange={onThemeChange}
          layout={layout}
          onLayoutChange={onLayoutChange}
          compact
        />
      </div>
    </div>
  );
}

function ThemeEditor({
  selectedTheme,
  onThemeChange,
  layout,
  onLayoutChange,
  compact = false,
}: {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
  layout: string;
  onLayoutChange: (layout: string) => void;
  compact?: boolean;
}) {
  return (
    <Card className={cn("rounded-xl p-4", compact && "border-0 p-0 shadow-none")}>
      <div className="grid gap-3 sm:grid-cols-[220px_1fr]">
        <div className="space-y-2.5">
          <div>
            <h2 className="text-sm font-semibold text-slate-950">Style</h2>
            <p className="text-xs text-slate-500">Tune layout, link styling, and corners.</p>
          </div>
          <Segmented
            label="Layout"
            options={["Stack", "Grid", "List"]}
            value={layout}
            onChange={onLayoutChange}
          />
          <Segmented
            label="Link style"
            options={["Solid", "Outline", "Soft"]}
            value="Solid"
            onChange={() => undefined}
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Corners</span>
              <span>8px</span>
            </div>
            <input
              aria-label="Corner radius"
              type="range"
              min="0"
              max="18"
              defaultValue="8"
              className="w-full accent-blue-600"
            />
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-950">Theme</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {themeSwatches.map((swatch) => (
                <button
                  key={swatch}
                  aria-label={`Select theme ${swatch}`}
                  className={cn(
                    "size-8 rounded-lg border p-1 transition",
                    selectedTheme === swatch ? "border-blue-600 ring-4 ring-blue-100" : "border-slate-200",
                  )}
                  onClick={() => onThemeChange(swatch)}
                >
                  <span className="block size-full rounded-md" style={{ background: swatch }} />
                </button>
              ))}
              <Button size="icon" variant="secondary" aria-label="Add theme">
                <Plus className="size-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 font-medium text-blue-700">
              Image background
            </button>
            <button className="rounded-lg border border-slate-200 px-3 py-2 font-medium text-slate-600">
              Solid color
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/assets/generated/profile-cover.png"
              alt="Current cover"
              width={90}
              height={46}
              className="h-10 w-24 rounded-lg object-cover"
            />
            <Button variant="secondary" onClick={() => toast("Background library opened.")}>
              Change
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Segmented({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className="grid grid-cols-3 rounded-lg border border-slate-200 bg-slate-50 p-1">
        {options.map((option) => (
          <button
            key={option}
            className={cn(
              "rounded-md px-2 py-1.5 text-xs font-medium transition",
              option === value ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-950",
            )}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function AnalyticsRail() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-[-0.02em]">Analytics</h2>
        <button className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-500">
          Last 7 days
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          ["Visitors", "2,841", "+18.2%"],
          ["Unique visitors", "1,892", "+15.6%"],
          ["Link clicks", "486", "+22.1%"],
          ["Conversion rate", "6.3%", "+8.7%"],
        ].map(([label, value, delta]) => (
          <Card key={label} className="rounded-lg p-2.5">
            <div className="text-xs text-slate-500">{label}</div>
            <div className="mt-2 flex items-end justify-between gap-2">
              <div className="text-lg font-semibold tracking-[-0.03em]">{value}</div>
              <div className="text-xs font-medium text-emerald-600">{delta}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="rounded-xl p-3">
        <ResponsiveContainer width="100%" height={135}>
          <LineChart data={analyticsSeries}>
            <CartesianGrid stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
            <YAxis hide domain={[0, 420]} />
            <Tooltip />
            <Line type="monotone" dataKey="visitors" stroke="#2563eb" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="unique" stroke="#14b8a6" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <TopLinks />

      <Card className="rounded-xl p-3">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-950">
          <Sparkles className="size-4 text-violet-600" />
          AI Suggestion
        </div>
        <p className="text-xs leading-5 text-slate-600">
          Add testimonials to build trust. Profiles with testimonials see 34% higher conversion rates.
        </p>
        <Button className="mt-3 w-full" variant="secondary">
          Add Testimonials Section
        </Button>
      </Card>
    </div>
  );
}

function TopLinks() {
  return (
    <Card className="rounded-xl p-3">
      <h3 className="text-sm font-semibold text-slate-950">Top links</h3>
      <div className="mt-3 space-y-2">
        {linkItems.slice(0, 5).map((link) => (
          <div key={link.id} className="grid grid-cols-[1fr_42px_42px] items-center gap-2 text-xs">
            <div className="flex min-w-0 items-center gap-2 text-slate-700">
              <LinkIcon className="size-3.5 text-slate-400" />
              <span className="truncate">{link.title}</span>
            </div>
            <span className="text-right tabular-nums text-slate-600">{link.clicks}</span>
            <span className="text-right tabular-nums text-slate-500">{link.ctr}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function CRMStrip() {
  return (
    <section className="grid grid-cols-1 gap-4 p-4 xl:grid-cols-[150px_240px_1fr_1fr_1fr]">
      <div className="flex flex-col justify-center">
        <h2 className="text-base font-semibold tracking-[-0.02em]">CRM Overview</h2>
        <p className="mt-1 text-sm text-slate-500">Focus on what matters most.</p>
        <Button className="mt-4 w-fit" variant="secondary" size="sm">
          View CRM
        </Button>
      </div>
      <Card className="rounded-xl p-4">
        <h3 className="text-sm font-semibold">Hottest Leads</h3>
        <div className="mt-3 space-y-3">
          {leads.slice(0, 5).map((lead) => (
            <div key={lead.email} className="flex items-center gap-2">
              <Avatar className="size-7">
                <AvatarFallback>{lead.avatar}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{lead.name}</p>
                <p className="truncate text-[11px] text-slate-500">{lead.company}</p>
              </div>
              <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                {lead.score}
              </span>
            </div>
          ))}
        </div>
      </Card>
      <SubmissionList />
      <FollowUpList />
      <TaskList compact />
    </section>
  );
}

function SubmissionList() {
  return (
    <Card className="rounded-xl p-4">
      <h3 className="text-sm font-semibold">Latest Form Submissions</h3>
      <div className="mt-3 divide-y divide-slate-100">
        {leads.slice(0, 5).map((lead) => (
          <div key={lead.email} className="py-2">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="truncate font-semibold text-slate-800">{lead.source}</span>
              <span className="text-slate-400">{lead.lastActivity.includes("Visited") ? "18m ago" : "2m ago"}</span>
            </div>
            <p className="mt-0.5 truncate text-xs text-slate-500">{lead.email}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function FollowUpList() {
  return (
    <Card className="rounded-xl p-4">
      <h3 className="text-sm font-semibold">Suggested Follow-ups</h3>
      <div className="mt-3 divide-y divide-slate-100">
        {leads.slice(0, 5).map((lead, index) => (
          <div key={lead.email} className="flex items-center gap-3 py-2">
            <span className="grid size-7 place-items-center rounded-lg bg-slate-50 text-slate-500">
              {index % 2 === 0 ? <Mail className="size-3.5" /> : <Star className="size-3.5" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">{lead.name}</p>
              <p className="truncate text-[11px] text-slate-500">{lead.lastActivity}</p>
            </div>
            <Button size="sm" variant="secondary" onClick={() => toast.success(`Follow-up queued for ${lead.name}.`)}>
              {index === 2 ? "Nudge" : "Send"}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TaskList({ compact = false }: { compact?: boolean }) {
  const [items, setItems] = useState<Task[]>(tasks);

  return (
    <Card className="rounded-xl p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold">Tasks</h3>
        <button className="text-xs font-medium text-blue-600">View all tasks</button>
      </div>
      <div className="mt-3 divide-y divide-slate-100">
        {items.slice(0, compact ? 5 : items.length).map((task) => (
          <label key={task.id} className="flex cursor-pointer items-center gap-3 py-2">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() =>
                setItems((current) =>
                  current.map((item) =>
                    item.id === task.id ? { ...item, done: !item.done } : item,
                  ),
                )
              }
              className="size-4 rounded border-slate-300 accent-blue-600"
            />
            <span className={cn("min-w-0 flex-1 truncate text-xs", task.done && "text-slate-400 line-through")}>
              {task.label}
            </span>
            <span className="text-[11px] text-slate-500">{task.due}</span>
          </label>
        ))}
      </div>
    </Card>
  );
}

function ModuleView({
  activeNav,
  onNavChange,
}: {
  activeNav: string;
  onNavChange: (nav: string) => void;
}) {
  if (activeNav === "Deals") return <DealsModule />;
  if (activeNav === "Analytics") return <AnalyticsModule />;
  if (activeNav === "AI Studio") return <AiStudioModule />;
  if (activeNav === "Tasks") return <TasksModule />;
  if (activeNav === "Settings") return <SettingsModule />;
  if (activeNav === "Activity") return <ActivityModule />;
  if (activeNav === "Leads" || activeNav === "CRM") return <LeadsModule activeNav={activeNav} />;

  return <DashboardModule onNavChange={onNavChange} activeNav={activeNav} />;
}

function DashboardModule({
  activeNav,
  onNavChange,
}: {
  activeNav: string;
  onNavChange: (nav: string) => void;
}) {
  return (
    <section className="space-y-5 p-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-blue-600">{activeNav}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em]">Good morning, Alex</h1>
          <p className="mt-2 text-sm text-slate-500">Here’s what’s happening across your profile and pipeline.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => onNavChange("Profile")}>
            Open Profile Studio
          </Button>
          <Button variant="primary" onClick={() => onNavChange("Deals")}>
            View Pipeline
          </Button>
        </div>
      </div>
      <MetricGrid />
      <div className="grid gap-5 xl:grid-cols-[1fr_330px]">
        <Card className="rounded-xl p-5">
          <h2 className="text-base font-semibold">Profile performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsSeries}>
              <defs>
                <linearGradient id="visitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <Tooltip />
              <Area type="monotone" dataKey="visitors" stroke="#2563eb" fill="url(#visitors)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="clicks" stroke="#10b981" fill="#10b98122" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <AnalyticsRail />
      </div>
      <CRMStrip />
    </section>
  );
}

function ActivityModule() {
  return (
    <section className="grid gap-5 p-5 xl:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.04em]">Activity Feed</h1>
          <p className="mt-2 text-sm text-slate-500">
            A timeline of visitor intent, profile engagement, CRM updates, and follow-up movement.
          </p>
        </div>
        <Card className="rounded-xl p-5">
          <div className="space-y-1">
            {activityFeed.concat(activityFeed).map((activity, index) => (
              <div key={`${activity.actor}-${index}`} className="grid grid-cols-[28px_1fr_auto] gap-3 py-3">
                <span className="mt-1 grid size-7 place-items-center rounded-lg bg-blue-50 text-blue-600">
                  {index % 3 === 0 ? <Eye className="size-3.5" /> : index % 3 === 1 ? <Mail className="size-3.5" /> : <Check className="size-3.5" />}
                </span>
                <div>
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold text-slate-950">{activity.actor}</span> {activity.event}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Source: smart profile analytics</p>
                </div>
                <span className="text-xs text-slate-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="space-y-5">
        <Card className="rounded-xl p-5">
          <h2 className="text-base font-semibold">Notification Rules</h2>
          <div className="mt-4 space-y-3">
            {["High-intent repeat visitor", "New contact form submission", "Deal moved stages", "No reply in 5 days"].map((rule) => (
              <div key={rule} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <span className="text-sm text-slate-700">{rule}</span>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </Card>
        <Card className="rounded-xl p-5">
          <h2 className="text-base font-semibold">Realtime Readiness</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            This surface is designed for Supabase Realtime events once the database project is connected.
          </p>
        </Card>
      </div>
    </section>
  );
}

function MetricGrid() {
  const metrics = [
    ["Visitors", "12,842", "+18.6%", BarChart3],
    ["Link clicks", "3,462", "+22.4%", MousePointerClick],
    ["CTR", "26.9%", "+3.1pp", LinkIcon],
    ["New leads", "186", "+15.7%", Mail],
    ["Conversion", "7.6%", "+1.2pp", CheckCircle2],
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {metrics.map(([label, value, delta, Icon]) => (
        <Card key={String(label)} className="rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">{String(label)}</span>
            <Icon className="size-4 text-slate-400" />
          </div>
          <div className="mt-3 flex items-end justify-between gap-3">
            <span className="text-2xl font-semibold tracking-[-0.04em]">{String(value)}</span>
            <span className="text-xs font-semibold text-emerald-600">{String(delta)}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

function LeadsModule({ activeNav }: { activeNav: string }) {
  return (
    <section className="space-y-5 p-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.04em]">{activeNav}</h1>
          <p className="mt-2 text-sm text-slate-500">
            Search, filter, score, and convert profile visitors into pipeline.
          </p>
        </div>
        <Button variant="primary">
          <Plus className="size-4" />
          Add Contact
        </Button>
      </div>
      <Card className="overflow-hidden rounded-xl">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input className="pl-9" placeholder="Search leads, companies, tags..." />
          </div>
          <Button variant="secondary">
            <Settings2 className="size-4" />
            Filters
          </Button>
          <Button variant="secondary">
            <Mail className="size-4" />
            Bulk Email
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Company</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Score</th>
                <th className="px-4 py-3 font-semibold">Intent</th>
                <th className="px-4 py-3 font-semibold">Last activity</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <tr key={lead.email} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback>{lead.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-slate-950">{lead.name}</div>
                        <div className="text-xs text-slate-500">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{lead.company}</td>
                  <td className="px-4 py-3 text-slate-600">{lead.source}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                      {lead.score}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={lead.intent === "High" ? "green" : lead.intent === "Medium" ? "amber" : "slate"}>
                      {lead.intent}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{lead.lastActivity}</td>
                  <td className="px-4 py-3">
                    <Badge tone={lead.status === "At risk" ? "red" : "blue"}>{lead.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}

function DealsModule() {
  const [items, setItems] = useState(deals);

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const stage = over.id as Deal["stage"];
    if (!stages.includes(stage)) return;

    setItems((current) =>
      current.map((deal) => (deal.id === active.id ? { ...deal, stage } : deal)),
    );
    toast.success("Deal moved.");
  }

  return (
    <section className="space-y-5 p-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.04em]">Deals Pipeline</h1>
          <p className="mt-2 text-sm text-slate-500">Drag opportunities through the revenue workflow.</p>
        </div>
        <Button variant="primary">
          <Plus className="size-4" />
          Deal
        </Button>
      </div>
      <MetricGrid />
      <DndContext onDragEnd={onDragEnd}>
        <div className="grid gap-3 overflow-x-auto pb-2 xl:grid-cols-5">
          {stages.map((stage) => (
            <DealColumn key={stage} stage={stage} deals={items.filter((deal) => deal.stage === stage)} />
          ))}
        </div>
      </DndContext>
    </section>
  );
}

function DealColumn({
  stage,
  deals,
}: {
  stage: Deal["stage"];
  deals: Deal[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  const total = deals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-[420px] rounded-xl border border-slate-200 bg-slate-50 p-3 transition",
        isOver && "border-blue-400 bg-blue-50",
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold">{stage}</h2>
          <p className="text-xs text-slate-500">
            {formatCurrency(total)} · {deals.length}
          </p>
        </div>
        <Button size="icon" variant="ghost" aria-label={`Add deal to ${stage}`}>
          <Plus className="size-4" />
        </Button>
      </div>
      <div className="space-y-3">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
}

function DealCard({ deal }: { deal: Deal }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: deal.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      className={cn(
        "rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition",
        isDragging && "z-50 rotate-1 shadow-xl",
      )}
      {...listeners}
      {...attributes}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">{deal.company}</h3>
          <p className="mt-1 text-xs text-slate-500">{deal.title}</p>
        </div>
        <span className="text-xs font-semibold text-slate-600">{formatCurrency(deal.value)}</span>
      </div>
      <p className="mt-4 text-xs text-slate-500">{deal.note}</p>
    </div>
  );
}

function AnalyticsModule() {
  return (
    <section className="space-y-5 p-5">
      <div>
        <h1 className="text-3xl font-semibold tracking-[-0.04em]">Analytics</h1>
        <p className="mt-2 text-sm text-slate-500">Understand visitors, clicks, conversion, countries, devices, and referrers.</p>
      </div>
      <MetricGrid />
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <Card className="rounded-xl p-5">
          <h2 className="text-base font-semibold">Visitors, clicks, and leads</h2>
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={analyticsSeries}>
              <CartesianGrid stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <Tooltip />
              <Line dataKey="visitors" stroke="#2563eb" strokeWidth={3} dot={false} />
              <Line dataKey="clicks" stroke="#14b8a6" strokeWidth={3} dot={false} />
              <Line dataKey="leads" stroke="#f59e0b" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <div className="space-y-5">
          <Card className="rounded-xl p-5">
            <h2 className="text-base font-semibold">Countries</h2>
            <div className="mt-4 space-y-4">
              {countries.map((country) => (
                <div key={country.country}>
                  <div className="flex justify-between text-sm">
                    <span>{country.country}</span>
                    <span className="font-medium">{country.value}%</span>
                  </div>
                  <Progress className="mt-2" value={country.value} />
                </div>
              ))}
            </div>
          </Card>
          <Card className="rounded-xl p-5">
            <h2 className="text-base font-semibold">Devices</h2>
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie data={devices} dataKey="value" nameKey="name" innerRadius={52} outerRadius={78} paddingAngle={4}>
                  {devices.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
      <TopLinks />
    </section>
  );
}

function AnalyticsDeepDive() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold tracking-[-0.02em]">Profile Analytics</h1>
        <p className="text-sm text-slate-500">Deep view of public profile engagement and conversion.</p>
      </div>
      <MetricGrid />
      <Card className="rounded-xl p-5">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsSeries}>
            <CartesianGrid stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
            <Tooltip />
            <Bar dataKey="clicks" fill="#2563eb" radius={[6, 6, 0, 0]} />
            <Bar dataKey="leads" fill="#14b8a6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function AiStudioModule() {
  return (
    <section className="grid gap-5 p-5 xl:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.04em]">AI Studio</h1>
          <p className="mt-2 text-sm text-slate-500">Generate lead summaries, email drafts, and page improvement ideas.</p>
        </div>
        <Card className="rounded-xl p-5">
          <h2 className="text-base font-semibold">Lead Summary</h2>
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            Jamie Parker is evaluating onboarding and activation improvements. They viewed the Northwind case study three times, opened the Work with me link, and submitted a project inquiry with a 30-day timeline.
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {["Pain: onboarding dropoff", "Budget: $25K-$50K", "Decision role: buyer"].map((item) => (
              <Badge key={item} tone="green" className="h-auto justify-center py-2">
                {item}
              </Badge>
            ))}
          </div>
        </Card>
        <Card className="rounded-xl p-5">
          <h2 className="text-base font-semibold">Email Draft</h2>
          <Textarea
            className="mt-4 min-h-52"
            defaultValue={`Hi Jamie,\n\nThanks for taking the time to explore the Northwind case study. Based on your interest in onboarding and activation, I put together a quick overview of how we can reduce friction in the first session and improve qualified conversions.\n\nHappy to walk through it this week.\n\nAlex`}
          />
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary">
              <Copy className="size-4" />
              Copy
            </Button>
            <Button variant="primary">
              <Send className="size-4" />
              Send
            </Button>
          </div>
        </Card>
      </div>
      <div className="space-y-5">
        <Card className="rounded-xl p-5">
          <h2 className="text-base font-semibold">Page Improvements</h2>
          <div className="mt-4 space-y-3">
            {[
              "Add testimonials below the first CTA.",
              "Move Resume below Work with me for higher intent.",
              "Create a dedicated product audit link.",
              "Add one project image to the portfolio tab.",
            ].map((item, index) => (
              <div key={item} className="flex gap-3 rounded-lg border border-slate-200 p-3">
                <span className="grid size-7 place-items-center rounded-lg bg-blue-50 text-xs font-semibold text-blue-700">
                  {index + 1}
                </span>
                <p className="text-sm leading-5 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="rounded-xl p-5">
          <h2 className="text-base font-semibold">Analytics Insight</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Case-study visitors convert 2.1x better than social traffic. Route those visitors to a dedicated follow-up sequence.
          </p>
        </Card>
      </div>
    </section>
  );
}

function TasksModule() {
  return (
    <section className="grid gap-5 p-5 xl:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.04em]">Tasks</h1>
            <p className="mt-2 text-sm text-slate-500">Plan follow-ups, launches, and CRM maintenance.</p>
          </div>
          <Button variant="primary">
            <Plus className="size-4" />
            New Task
          </Button>
        </div>
        <TaskList />
      </div>
      <Card className="rounded-xl p-5">
        <h2 className="text-base font-semibold">Calendar</h2>
        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs">
          {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
            <span key={day} className="py-2 font-medium text-slate-500">
              {day}
            </span>
          ))}
          {Array.from({ length: 35 }, (_, index) => (
            <button
              key={index}
              className={cn(
                "aspect-square rounded-lg border border-transparent text-slate-600 hover:border-slate-200",
                [6, 12, 18].includes(index) && "bg-blue-50 font-semibold text-blue-700",
              )}
            >
              {index + 1 <= 31 ? index + 1 : ""}
            </button>
          ))}
        </div>
      </Card>
    </section>
  );
}

function SettingsModule() {
  return (
    <section className="space-y-5 p-5">
      <div>
        <h1 className="text-3xl font-semibold tracking-[-0.04em]">Settings</h1>
        <p className="mt-2 text-sm text-slate-500">Manage profile, workspace, security, billing, and notifications.</p>
      </div>
      <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
        <Card className="rounded-xl p-4">
          {["Profile", "Workspace", "Security", "Billing", "Notifications", "API & Webhooks"].map((item, index) => (
            <button
              key={item}
              className={cn(
                "flex h-10 w-full items-center rounded-lg px-3 text-left text-sm font-medium",
                index === 0 ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50",
              )}
            >
              {item}
            </button>
          ))}
        </Card>
        <Card className="rounded-xl p-5">
          <h2 className="text-base font-semibold">Profile Settings</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="space-y-1.5">
              <span className="text-sm font-medium text-slate-700">Display name</span>
              <Input defaultValue="Alex Morgan" />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm font-medium text-slate-700">Public handle</span>
              <Input defaultValue="alex" />
            </label>
            <label className="space-y-1.5 md:col-span-2">
              <span className="text-sm font-medium text-slate-700">Bio</span>
              <Textarea defaultValue="I build digital products and share ideas on building, growth, and design." />
            </label>
          </div>
          <Separator className="my-6" />
          <div className="space-y-3">
            {["Email notifications", "Weekly analytics digest", "AI suggestions", "Public contact form"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <span className="text-sm font-medium text-slate-700">{item}</span>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
          <Button className="mt-6" variant="primary">
            Save changes
          </Button>
        </Card>
      </div>
    </section>
  );
}

function CommandPalette({
  open,
  onOpenChange,
  commands,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commands: string[];
  onSelect: (command: string) => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/20 px-4 pt-[12vh] backdrop-blur-sm">
      <Command className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20">
        <div className="flex items-center border-b border-slate-200 px-4">
          <Search className="size-4 text-slate-400" />
          <Command.Input
            autoFocus
            placeholder="Search views, leads, actions..."
            className="h-12 flex-1 bg-transparent px-3 text-sm outline-none"
          />
          <button className="text-slate-400 hover:text-slate-700" onClick={() => onOpenChange(false)}>
            <X className="size-4" />
          </button>
        </div>
        <Command.List className="max-h-[360px] overflow-y-auto p-2">
          <Command.Empty className="p-6 text-center text-sm text-slate-500">No results found.</Command.Empty>
          <Command.Group heading="Navigate" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-slate-400">
            {commands.map((command) => (
              <Command.Item
                key={command}
                value={command}
                onSelect={() => onSelect(command)}
                className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm aria-selected:bg-blue-50 aria-selected:text-blue-700"
              >
                <span>{command}</span>
                <kbd className="rounded border border-slate-200 px-1.5 py-0.5 text-[11px] text-slate-400">↵</kbd>
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Actions" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-slate-400">
            {["Create link", "Draft follow-up", "Invite teammate", "Publish profile"].map((command) => (
              <Command.Item
                key={command}
                value={command}
                onSelect={() => {
                  toast.success(`${command} queued.`);
                  onOpenChange(false);
                }}
                className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm aria-selected:bg-blue-50 aria-selected:text-blue-700"
              >
                <span>{command}</span>
                <ArrowUpRight className="size-4 text-slate-400" />
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
