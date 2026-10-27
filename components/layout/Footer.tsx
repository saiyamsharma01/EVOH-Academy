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
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 col-span-2 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <Atom className="w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                {brandName}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {tagline}
            </p>
            <div className="text-xs text-slate-400 space-y-1 pt-1 font-medium">
              <p>Email: {contactEmail}</p>
              {contactPhone && <p>Phone: {contactPhone}</p>}
            </div>
          </div>

          {/* Academic Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Curriculum Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/classes/11" className="text-slate-400 hover:text-white transition-colors py-1 inline-block">
                  Class 11 Science Modules
                </Link>
              </li>
              <li>
                <Link href="/classes/12" className="text-slate-400 hover:text-white transition-colors py-1 inline-block">
                  Class 12 Science Modules
                </Link>
              </li>
              <li>
                <Link href="/subjects/physics" className="text-slate-400 hover:text-white transition-colors py-1 inline-block">
                  Physics Derivations & Notes
                </Link>
              </li>
              <li>
                <Link href="/subjects/chemistry" className="text-slate-400 hover:text-white transition-colors py-1 inline-block">
                  Chemistry Mechanisms
                </Link>
              </li>
              <li>
                <Link href="/subjects/mathematics" className="text-slate-400 hover:text-white transition-colors py-1 inline-block">
                  Maths Formula Sheets
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Marketplace */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Learning Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/notes" className="text-slate-400 hover:text-white transition-colors py-1 inline-block">
                  Full Notes Catalog
                </Link>
              </li>
              <li>
                <Link href="/bundles" className="text-slate-400 hover:text-white transition-colors py-1 inline-block">
                  All-in-One Study Bundles
                </Link>
              </li>
              <li>
                <Link href="/free-resources" className="text-slate-400 hover:text-white transition-colors py-1 inline-block">
                  Free Concept Summaries
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors py-1 inline-block">
                  Pricing & Subscriptions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-white transition-colors py-1 inline-block">
                  Academic Strategy Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Legal & Compliance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors py-1 inline-block">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors py-1 inline-block">
                  Privacy Policy (DPDP)
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-slate-400 hover:text-white transition-colors py-1 inline-block">
                  Refund & Cancellations
                </Link>
              </li>
              <li>
                <Link href="/subscription-terms" className="text-slate-400 hover:text-white transition-colors py-1 inline-block">
                  Subscription Terms
                </Link>
              </li>
              <li>
                <Link href="/digital-delivery-policy" className="text-slate-400 hover:text-white transition-colors py-1 inline-block">
                  Watermark Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-slate-400 hover:text-white transition-colors py-1 inline-block">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Required Non-Affiliation Disclaimer (PRD Sec 27) */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-400 leading-relaxed space-y-3">
          <p>
            <strong>Disclaimer:</strong> {brandName} is an independent educational initiative and is not affiliated with, endorsed by, or associated with NCERT, CBSE, or any government education board. All study materials, formula sheets, and derivations are original educational syntheses created for student conceptual clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 pt-2 text-xs">
            <span>© {new Date().getFullYear()} {brandName}. All rights reserved.</span>
            <span>Secured with Dynamic Watermarking & GST Invoicing</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
