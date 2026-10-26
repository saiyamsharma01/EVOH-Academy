"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Atom, LayoutDashboard, LogOut, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface NavItemData {
  id: string;
  label: string;
  path: string;
}

interface NavbarProps {
  brandName?: string;
  items?: NavItemData[];
}

export default function Navbar({
  brandName = "EVOH Academy",
  items = [
    { id: "1", label: "Classes", path: "/classes" },
    { id: "2", label: "Subjects", path: "/subjects" },
    { id: "3", label: "Notes", path: "/notes" },
    { id: "4", label: "Pricing", path: "/pricing" },
    { id: "5", label: "About", path: "/about" },
  ],
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const supabase = createClient();

    // Check current active user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-50 w-full editorial-glass border-b border-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent-blue flex items-center justify-center text-white shadow-md shadow-primary/25 group-hover:scale-105 transition-transform">
            <Atom className="w-5 h-5 text-white animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-ink-primary group-hover:text-primary transition-colors">
              {brandName}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-ink-muted uppercase -mt-0.5">
              Science & Mathematics
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium">
          {items.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== "/" && pathname?.startsWith(item.path));
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? "text-primary font-bold bg-primary/10 shadow-xs"
                    : "text-ink-secondary hover:text-ink-primary hover:bg-surface-muted"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/search"
            className="p-2 rounded-lg text-ink-muted hover:text-ink-primary hover:bg-surface-muted transition-colors"
            aria-label="Search curriculum and notes"
          >
            <Search className="w-4 h-4" />
          </Link>

          <Link
            href="/cart"
            className="relative p-2 rounded-lg text-ink-muted hover:text-ink-primary hover:bg-surface-muted transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-semibold hover:bg-primary/20 transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="p-2 rounded-lg text-ink-muted hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border bg-white text-xs font-semibold text-ink-primary hover:border-primary/40 hover:text-primary transition-colors"
              >
                <User className="w-3.5 h-3.5 text-primary" />
                <span>Student Login</span>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/cart"
            className="relative p-2 rounded-lg text-ink-muted hover:text-ink-primary"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-ink-primary hover:bg-surface-muted"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-white/95 backdrop-blur-md border-b border-border shadow-xl space-y-4">
          <nav className="flex flex-col space-y-1 pt-2">
            {items.map((item) => {
              const isActive =
                pathname === item.path ||
                (item.path !== "/" && pathname?.startsWith(item.path));
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "text-primary font-bold bg-primary/10"
                      : "text-ink-primary hover:bg-surface-muted"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-border flex flex-col gap-2.5">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-primary text-white text-sm font-semibold shadow"
                >
                  Go to Student Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full text-center py-2 rounded-lg border border-red-200 text-red-600 text-sm font-semibold"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg border border-border text-sm font-semibold text-ink-primary"
                >
                  Student Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-primary text-white text-sm font-semibold shadow"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
