"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Download, FileText, Receipt } from "lucide-react";

export default function PurchasesPage() {
  const orders = [
    {
      orderNumber: "EVOH-2026-00042",
      date: "October 24, 2026",
      items: "Class 11 Physics: Kinematics & 2D Vectors",
      amountFormatted: "₹199.00",
      taxFormatted: "₹30.36 (CGST+SGST 18%)",
      status: "PAID",
      invoiceNumber: "INV-2026-00042",
    },
    {
      orderNumber: "EVOH-2026-00018",
      date: "October 10, 2026",
      items: "Class 12 Chemistry: Electrochemistry & Nernst Equation",
      amountFormatted: "₹149.00",
      taxFormatted: "₹22.73 (CGST+SGST 18%)",
      status: "PAID",
      invoiceNumber: "INV-2026-00018",
    },
  ];

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
          <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
          <span>/</span>
          <span className="text-ink-primary font-bold">Purchases & Invoices</span>
        </div>
        <h1 className="text-3xl font-display font-extrabold text-ink-primary tracking-tight">
          Purchase History & Tax Invoices
        </h1>
        <p className="text-xs text-ink-muted">
          Download sequential GST tax invoices and receipts for all your educational transactions.
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div
            key={ord.orderNumber}
            className="p-6 rounded-2xl bg-white border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-xs font-mono">
                <span className="font-bold text-ink-primary">{ord.orderNumber}</span>
                <span>•</span>
                <span className="text-ink-muted">{ord.date}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  {ord.status}
                </span>
              </div>

              <h2 className="text-base font-display font-bold text-ink-primary">
                {ord.items}
              </h2>

              <div className="text-xs font-mono text-ink-muted flex items-center gap-4">
                <span>Amount: <strong className="text-ink-primary">{ord.amountFormatted}</strong></span>
                <span>Tax: {ord.taxFormatted}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => alert(`Downloading sequential Tax Invoice: ${ord.invoiceNumber}.pdf`)}
                className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-surface-muted hover:bg-surface-base border border-border text-xs font-semibold text-ink-primary transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-primary" />
                <span>Invoice PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
