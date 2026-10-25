"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Atom, Menu, Search, User, X } from "lucide-react";

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

  return (
    <header className="sticky top-0 z-50 w-full editorial-glass border-b border-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
            <Atom className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-ink-primary">
              {brandName}
            </span>
            <span className="text-[10px] font-mono tracking-wider text-ink-muted uppercase -mt-1">
              Physics • Chem • Math
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-primary">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="hover:text-primary transition-colors py-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/search"
            className="p-2 rounded-lg text-ink-muted hover:text-ink-primary hover:bg-surface-muted transition-colors"
            aria-label="Search curriculum and notes"
          >
            <Search className="w-4 h-4" />
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-white text-xs font-semibold text-ink-primary hover:border-primary/40 hover:text-primary transition-colors"
          >
            <User className="w-3.5 h-3.5 text-primary" />
            <span>Student Login</span>
          </Link>

          <Link
            href="/notes"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <span>Get Notes</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/search"
            className="p-2 rounded-lg text-ink-muted hover:text-ink-primary"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
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
        <div className="sm:hidden px-4 pt-3 pb-6 bg-white border-b border-border shadow-lg space-y-4">
          <nav className="flex flex-col space-y-3 pt-2">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-ink-primary hover:text-primary py-1"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-border flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg border border-border text-sm font-medium text-ink-primary"
            >
              Student Login
            </Link>
            <Link
              href="/notes"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-primary text-white text-sm font-semibold shadow"
            >
              Browse Notes
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
