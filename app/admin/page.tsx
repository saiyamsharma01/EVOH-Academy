import React from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  DollarSign,
  FileText,
  Key,
  Layers,
  Settings,
  Shield,
  ShoppingBag,
  Users,
} from "lucide-react";
import { ROLE_PERMISSIONS } from "@/server/auth/permissions";

export const metadata = {
  title: "Admin CMS Dashboard | EVOH Academy",
};

export default function AdminDashboardPage() {
  // Real initial metrics (zero fabricated numbers, empty states when not yet populated per PRD Sec 20.1)
  const metrics = [
    { label: "Gross Sales (Paise)", value: "₹0", sub: "Sandbox Mode" },
    { label: "Refunds Issued", value: "₹0", sub: "0 Requests" },
    { label: "Registered Students", value: "0", sub: "New accounts" },
    { label: "Active Subscriptions", value: "0", sub: "Awaiting live activation" },
  ];

  const adminNav = [
    { label: "Site Settings & Theme", path: "/admin/settings", icon: Settings, desc: "Edit brand name, tagline, theme colors" },
    { label: "Curriculum & Syllabi", path: "/admin/curriculum", icon: Layers, desc: "Manage classes, subjects, chapters, topics" },
    { label: "Notes & Marketplace", path: "/admin/notes", icon: BookOpen, desc: "Upload PDFs, version files, set prices" },
    { label: "Orders & Invoices", path: "/admin/orders", icon: ShoppingBag, desc: "View payments, tax invoices, issue refunds" },
    { label: "Student Accounts", path: "/admin/students", icon: Users, desc: "Manage learners, sessions, guardian consent" },
    { label: "Roles & Permission Matrix", path: "/admin/roles", icon: Shield, desc: "Inspect granular RBAC permissions" },
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Admin Shell Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-3xl bg-surface-dark text-white border border-white/10 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-primary/20 text-accent-cyan border border-accent-cyan/30">
              ROLE: SUPER_ADMIN
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              TEST MODE ACTIVE
            </span>
          </div>
          <h1 className="text-3xl font-display font-extrabold tracking-tight">
            EVOH Content Management System
          </h1>
          <p className="text-xs text-slate-300 font-sans">
            Complete dynamic control over curriculum, pricing, notes, brand identity, and policies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-md transition-all"
          >
            <Settings className="w-4 h-4" />
            <span>Brand Settings</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 transition-colors"
          >
            <span>Live Site ↗</span>
          </Link>
        </div>
      </div>

      {/* Real Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-white border border-border shadow-sm space-y-2">
            <span className="text-xs font-mono text-ink-muted uppercase">{m.label}</span>
            <div className="text-2xl font-display font-bold text-ink-primary">{m.value}</div>
            <span className="text-[11px] font-mono text-ink-muted block">{m.sub}</span>
          </div>
        ))}
      </div>

      {/* Admin Modules Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-bold text-ink-primary">
          Administrative Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {adminNav.map((nav, idx) => {
            const Icon = nav.icon;
            return (
              <Link
                key={idx}
                href={nav.path}
                className="p-6 rounded-2xl bg-white border border-border hover:border-primary/40 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-ink-primary group-hover:text-primary transition-colors">
                      {nav.label}
                    </h3>
                    <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                      {nav.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Open Module</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* RBAC Permission Matrix Preview for SUPER_ADMIN (PRD Sec 3.2) */}
      <div className="p-8 rounded-3xl bg-white border border-border shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-display font-bold text-ink-primary flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>System Role & Permission Matrix (Live Enforced)</span>
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Centralized authorization matrix defined in <code>server/auth/permissions.ts</code> and enforced via <code>can()</code>.
            </p>
          </div>
          <span className="text-xs font-mono text-ink-muted">6 Defined Roles</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-muted">
                <th className="p-3 font-bold text-ink-primary">Role Name</th>
                <th className="p-3 font-bold text-ink-primary">Assigned Permissions Count</th>
                <th className="p-3 font-bold text-ink-primary">High-Privilege Access Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {Object.entries(ROLE_PERMISSIONS).map(([role, perms]) => (
                <tr key={role} className="hover:bg-surface-muted/50 transition-colors">
                  <td className="p-3 font-bold text-ink-primary">{role}</td>
                  <td className="p-3 text-ink-muted">{perms.length} permissions active</td>
                  <td className="p-3 text-ink-muted truncate max-w-xs">
                    {perms.slice(0, 4).join(", ")}
                    {perms.length > 4 ? ` + ${perms.length - 4} more` : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
