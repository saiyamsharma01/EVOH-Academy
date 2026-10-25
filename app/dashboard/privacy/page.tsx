"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Download, Shield, Trash2, UserCheck } from "lucide-react";

export default function PrivacyCenterPage() {
  const [exported, setExported] = useState(false);
  const [deleteRequested, setDeleteRequested] = useState(false);

  const handleExport = () => {
    setExported(true);
    const dummyData = {
      user: { name: "Aarav Sharma", email: "aarav@example.com", classPreference: 11 },
      orders: ["EVOH-2026-00042", "EVOH-2026-00018"],
      consentRecords: [{ version: "DPDP-v1", date: "2026-10-24" }],
    };
    const blob = new Blob([JSON.stringify(dummyData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "evoh-student-data-export.json";
    a.click();
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
          <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
          <span>/</span>
          <span className="text-ink-primary font-bold">Privacy Center</span>
        </div>
        <h1 className="text-3xl font-display font-extrabold text-ink-primary tracking-tight">
          Privacy & Data Rights Center
        </h1>
        <p className="text-xs text-ink-muted">
          DPDP Act, 2023 compliance center: Exercise your rights to data export, consent withdrawal, and deletion.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* 1. Data Export Box */}
        <div className="p-8 rounded-3xl bg-white border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-lg font-display font-bold text-ink-primary flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              <span>Export Personal Information</span>
            </h2>
            <p className="text-xs text-ink-muted leading-relaxed max-w-lg">
              Download a machine-readable JSON copy of your profile, active entitlements, purchase records, and consent timestamps.
            </p>
          </div>

          <button
            onClick={handleExport}
            className="py-3 px-5 rounded-xl bg-surface-muted hover:bg-surface-base border border-border text-xs font-semibold text-ink-primary transition-colors shrink-0"
          >
            {exported ? "✓ Data Export Downloaded" : "Download Data (JSON)"}
          </button>
        </div>

        {/* 2. Guardian Consent Oversight Box */}
        <div className="p-8 rounded-3xl bg-white border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h2 className="text-lg font-display font-bold text-ink-primary flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-600" />
              <span>Parental & Guardian Consent Status</span>
            </h2>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              VERIFIED
            </span>
          </div>

          <p className="text-xs text-ink-muted leading-relaxed">
            Registered guardian email: <code>parent.sharma@example.com</code>. Consented to educational service delivery and watermarked PDF downloads.
          </p>
        </div>

        {/* 3. Account Deletion Request Box */}
        <div className="p-8 rounded-3xl bg-white border border-red-200 shadow-sm space-y-4">
          <h2 className="text-lg font-display font-bold text-red-600 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-600" />
            <span>Request Account Erasure</span>
          </h2>

          <p className="text-xs text-ink-muted leading-relaxed">
            Submitting an erasure request enters a 30-day statutory cooling-off period. Your personal profile, active sessions, and learning records will be anonymized. Mandatory tax and financial invoice records are retained for statutory audit compliance.
          </p>

          <button
            onClick={() => {
              if (confirm("Are you sure you want to request account erasure?")) {
                setDeleteRequested(true);
              }
            }}
            disabled={deleteRequested}
            className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors disabled:opacity-50"
          >
            {deleteRequested ? "Deletion Request Logged in Audit" : "Request Account Erasure"}
          </button>
        </div>

      </div>

    </div>
  );
}
