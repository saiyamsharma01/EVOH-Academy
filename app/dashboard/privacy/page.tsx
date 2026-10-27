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
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
          <span>/</span>
          <span className="text-white font-bold">Privacy Center</span>
        </div>
        <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
          Privacy & Data Rights Center
        </h1>
        <p className="text-xs text-slate-400">
          DPDP Act, 2023 compliance center: Exercise your rights to data export, consent withdrawal, and deletion.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* 1. Data Export Box */}
        <div className="p-8 rounded-3xl bg-surface-card/75 border border-white/10 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6 backdrop-blur-md">
          <div className="space-y-2">
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-cyan-400" />
              <span>Export Personal Information</span>
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              Download a machine-readable JSON copy of your profile, active entitlements, purchase records, and consent timestamps.
            </p>
          </div>

          <button
            onClick={handleExport}
            className="py-3 px-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-cyan-400 transition-colors shrink-0"
          >
            {exported ? "✓ Data Export Downloaded" : "Download Data (JSON)"}
          </button>
        </div>

        {/* 2. Guardian Consent Oversight Box */}
        <div className="p-8 rounded-3xl bg-surface-card/75 border border-white/10 shadow-lg space-y-4 backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <span>Parental & Guardian Consent Status</span>
            </h2>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-500/20">
              VERIFIED
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Registered guardian email: <code className="text-cyan-400 font-mono">parent.sharma@example.com</code>. Consented to educational service delivery and watermarked PDF downloads.
          </p>
        </div>

        {/* 3. Account Deletion Request Box */}
        <div className="p-8 rounded-3xl bg-surface-card/75 border border-red-500/30 shadow-lg space-y-4 backdrop-blur-md">
          <h2 className="text-lg font-display font-bold text-red-400 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-400" />
            <span>Request Account Erasure</span>
          </h2>

          <p className="text-xs text-slate-400 leading-relaxed">
            Submitting an erasure request enters a 30-day statutory cooling-off period. Your personal profile, active sessions, and learning records will be anonymized. Mandatory tax and financial invoice records are retained for statutory audit compliance.
          </p>

          <button
            onClick={() => {
              if (confirm("Are you sure you want to request account erasure?")) {
                setDeleteRequested(true);
              }
            }}
            disabled={deleteRequested}
            className="py-2.5 px-4 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold transition-colors disabled:opacity-50"
          >
            {deleteRequested ? "Deletion Request Logged in Audit" : "Request Account Erasure"}
          </button>
        </div>

      </div>

    </div>
  );
}
