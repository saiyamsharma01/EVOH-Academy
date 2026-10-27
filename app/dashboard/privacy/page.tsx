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
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Privacy Center</span>
        </div>
        <h1 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
          Privacy & Data Rights Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          DPDP Act, 2023 compliance center: Exercise your rights to data export, consent withdrawal, and deletion.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* 1. Data Export Box */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
              <Download className="w-5 h-5 text-blue-600" />
              <span>Export Personal Information</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-lg">
              Download a machine-readable JSON copy of your profile, active entitlements, purchase records, and consent timestamps.
            </p>
          </div>

          <button
            onClick={handleExport}
            className="py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors shrink-0"
          >
            {exported ? "✓ Data Export Downloaded" : "Download Data (JSON)"}
          </button>
        </div>

        {/* 2. Guardian Consent Oversight Box */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-600" />
              <span>Parental & Guardian Consent Status</span>
            </h2>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              VERIFIED
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Registered guardian email: <code className="text-blue-700 font-mono font-semibold">parent.sharma@example.com</code>. Consented to educational service delivery and watermarked PDF downloads.
          </p>
        </div>

        {/* 3. Account Deletion Request Box */}
        <div className="p-8 rounded-2xl bg-white border border-red-200 shadow-xs space-y-4">
          <h2 className="text-lg font-display font-bold text-red-600 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-600" />
            <span>Request Account Erasure</span>
          </h2>

          <p className="text-xs text-slate-600 leading-relaxed">
            Submitting an erasure request enters a 30-day statutory cooling-off period. Your personal profile, active sessions, and learning records will be anonymized. Mandatory tax and financial invoice records are retained for statutory audit compliance.
          </p>

          <button
            onClick={() => {
              if (confirm("Are you sure you want to request account erasure?")) {
                setDeleteRequested(true);
              }
            }}
            disabled={deleteRequested}
            className="py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-semibold text-red-700 transition-colors"
          >
            {deleteRequested ? "Erasure Request Submitted (30-day window)" : "Request Account Deletion"}
          </button>
        </div>

      </div>
    </div>
  );
}
