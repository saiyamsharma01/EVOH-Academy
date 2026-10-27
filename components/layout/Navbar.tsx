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
    <header className="sticky top-0 z-50 w-full editorial-glass transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
            <Atom className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              {brandName}
            </span>
            <span className="text-[10px] font-medium tracking-wider text-slate-500 uppercase -mt-0.5">
              Curriculum Excellence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 text-sm font-medium">
          {items.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== "/" && pathname?.startsWith(item.path));
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? "text-blue-700 font-semibold bg-blue-50/80 border border-blue-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
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
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Search curriculum and notes"
          >
            <Search className="w-4 h-4" />
          </Link>

          <Link
            href="/cart"
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold hover:bg-blue-100 transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-all shadow-xs"
              >
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Student Login</span>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all hover:-translate-y-0.5"
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
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-white border-b border-slate-200 shadow-xl space-y-4">
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
                      ? "text-blue-700 font-bold bg-blue-50 border border-blue-100"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow-xs"
                >
                  Go to Student Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full text-center py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-semibold"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Student Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow-xs"
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
