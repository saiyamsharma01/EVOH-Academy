import React from "react";
import Link from "next/link";
import { Atom } from "lucide-react";

interface FooterProps {
  brandName?: string;
  tagline?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export default function Footer({
  brandName = "EVOH Academy",
  tagline = "Understand the Concepts. Master the Science.",
  contactEmail = "support@evohacademy.com",
  contactPhone = "+91-9876543210",
}: FooterProps) {
  return (
    <footer className="bg-surface-dark text-slate-300 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <Atom className="w-4 h-4" />
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                {brandName}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              {tagline}
            </p>
            <div className="text-xs font-mono text-slate-400 space-y-1 pt-2">
              <p>Email: {contactEmail}</p>
              {contactPhone && <p>Phone: {contactPhone}</p>}
            </div>
          </div>

          {/* Academic Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Curriculum Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/classes/11" className="hover:text-accent-cyan transition-colors">
                  Class 11 Science Modules
                </Link>
              </li>
              <li>
                <Link href="/classes/12" className="hover:text-accent-cyan transition-colors">
                  Class 12 Science Modules
                </Link>
              </li>
              <li>
                <Link href="/subjects/physics" className="hover:text-accent-cyan transition-colors">
                  Physics Derivations & Notes
                </Link>
              </li>
              <li>
                <Link href="/subjects/chemistry" className="hover:text-accent-cyan transition-colors">
                  Chemistry Mechanisms & Orbitals
                </Link>
              </li>
              <li>
                <Link href="/subjects/mathematics" className="hover:text-accent-cyan transition-colors">
                  Mathematics Formula Sheets
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Marketplace */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Learning Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/notes" className="hover:text-accent-cyan transition-colors">
                  Full Notes Catalog
                </Link>
              </li>
              <li>
                <Link href="/bundles" className="hover:text-accent-cyan transition-colors">
                  All-in-One Study Bundles
                </Link>
              </li>
              <li>
                <Link href="/free-resources" className="hover:text-accent-cyan transition-colors">
                  Free Concept Summaries
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-accent-cyan transition-colors">
                  Pricing & Subscriptions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent-cyan transition-colors">
                  Academic Strategy Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Legal & Compliance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/terms" className="hover:text-accent-cyan transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-accent-cyan transition-colors">
                  Privacy Policy (DPDP 2023)
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-accent-cyan transition-colors">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/subscription-terms" className="hover:text-accent-cyan transition-colors">
                  Subscription Terms
                </Link>
              </li>
              <li>
                <Link href="/digital-delivery-policy" className="hover:text-accent-cyan transition-colors">
                  Digital Delivery & Watermark Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-accent-cyan transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Required Non-Affiliation Disclaimer (PRD Sec 27) */}
        <div className="pt-8 border-t border-white/10 text-[11px] text-slate-400 font-mono leading-relaxed space-y-3">
          <p>
            <strong>Disclaimer:</strong> {brandName} is an independent educational initiative and is not affiliated with, endorsed by, or associated with NCERT, CBSE, or any government education board. All study materials, formula sheets, and derivations are original educational syntheses created for student conceptual clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 pt-2">
            <span>© {new Date().getFullYear()} {brandName}. All rights reserved.</span>
            <span>Secured with Dynamic Watermarking & GST Invoicing</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
