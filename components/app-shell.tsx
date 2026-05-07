"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Map,
  Settings,
  Shield,
  Upload,
  GitCompare
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/map", label: "Map Search", icon: Map },
  { href: "/compare", label: "Compare", icon: GitCompare },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/admin/upload", label: "Admin Upload", icon: Upload },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-ink p-5 text-white lg:block">
        <Link href="/" className="mb-8 flex items-center gap-3 text-xl font-semibold">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-500">
            <Map size={20} />
          </span>
          LocIntel
        </Link>

        <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Shield size={16} />
            Synthetic Demo Mode
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-300">
            Uses mock traffic and visitor-origin data for safe product exploration.
          </p>
        </div>

        <nav className="space-y-2">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                  active
                    ? "bg-white text-ink"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="lg:pl-72">
        <div className="mx-auto min-h-screen max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
