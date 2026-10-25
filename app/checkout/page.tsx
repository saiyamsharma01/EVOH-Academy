"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Lock, ShieldCheck, Tag } from "lucide-react";
import { calculateTaxAndTotal } from "@/server/commerce/tax-calculator";

export default function CheckoutPage() {
  const [billingState, setBillingState] = useState("Delhi");
  const [couponCode, setCouponCode] = useState("");
  const [discountPaise, setDiscountPaise] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Subtotal: 199 INR = 19900 paise
  const subtotalPaise = 19900;
  const taxResult = calculateTaxAndTotal({
    subtotalInPaise: subtotalPaise,
    discountInPaise: discountPaise,
    sellerState: "Delhi",
    customerBillingState: billingState,
    taxRatePercent: 18,
    priceMode: "TAX_INCLUSIVE",
  });

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "EVOH50") {
      setDiscountPaise(5000); // 50 INR
    }
  };

  const handlePayment = () => {
    if (!termsAccepted) {
      alert("Please accept the Terms & Conditions and Digital Delivery Policy to proceed.");
      return;
    }
    setProcessing(true);
    // Simulate Razorpay checkout test boundary
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
    }, 1500);
  };

  if (completed) {
    return (
      <div className="py-20 max-w-lg mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-extrabold text-ink-primary">
            Payment Successful!
          </h1>
          <p className="text-xs font-mono text-ink-muted">
            Order Reference: EVOH-2026-00042 • Invoice Issued
          </p>
          <p className="text-sm text-ink-muted">
            Your entitlements have been activated. Your watermarked PDF is ready in your student library.
          </p>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard/library"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-white text-xs font-semibold shadow"
          >
            Go to My Library
          </Link>
          <Link
            href="/dashboard/purchases"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-surface-muted border border-border text-xs font-semibold text-ink-primary"
          >
            Download Invoice PDF
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-10">
      
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-ink-primary tracking-tight">
          Secure Checkout
        </h1>
        <p className="text-xs text-ink-muted">
          All orders are verified and fulfilled with dynamic student watermarking and sequential tax invoicing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column: Customer Info & Place of Supply */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          <div className="p-5 sm:p-8 rounded-2xl bg-white border border-border shadow-sm space-y-4 sm:space-y-5">
            <h2 className="text-base sm:text-lg font-display font-bold text-ink-primary">
              1. Student Details & Billing State
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-mono text-ink-primary font-semibold block mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  defaultValue="Aarav Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-ink-primary font-semibold block mb-1">
                  Email (Receives Invoices & Download Links)
                </label>
                <input
                  type="email"
                  defaultValue="aarav@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm outline-none"
                />
              </div>

              {/* Place of Supply State Selector for GST Math */}
              <div>
                <label className="font-mono text-ink-primary font-semibold block mb-1">
                  Billing State (Determines CGST+SGST vs IGST)
                </label>
                <select
                  value={billingState}
                  onChange={(e) => setBillingState(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm outline-none bg-white"
                >
                  <option value="Delhi">Delhi (Intra-state: CGST + SGST)</option>
                  <option value="Maharashtra">Maharashtra (Inter-state: IGST)</option>
                  <option value="Karnataka">Karnataka (Inter-state: IGST)</option>
                  <option value="Uttar Pradesh">Uttar Pradesh (Inter-state: IGST)</option>
                  <option value="Haryana">Haryana (Inter-state: IGST)</option>
                  <option value="Other">Other States & UTs (Inter-state: IGST)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Coupon Code Input with Mobile Stack Safety */}
          <form onSubmit={handleApplyCoupon} className="p-4 sm:p-6 rounded-2xl bg-white border border-border shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon Code (e.g. EVOH50)"
                className="w-full px-3 py-2 rounded-xl border border-border text-xs uppercase font-mono outline-none"
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-4 rounded-xl bg-surface-muted hover:bg-surface-base border border-border text-xs font-semibold text-ink-primary shrink-0"
            >
              Apply
            </button>
          </form>
        </div>

        {/* Right Column: Server-Calculated Tax Summary */}
        <div className="lg:col-span-5 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-border shadow-xl space-y-5 sm:space-y-6">
          <h2 className="text-lg font-display font-bold text-ink-primary">
            Payment Breakdown
          </h2>

          <div className="space-y-2.5 text-xs font-mono text-ink-muted">
            <div className="flex justify-between">
              <span>Catalog Subtotal:</span>
              <span className="text-ink-primary font-bold">
                ₹{subtotalPaise / 100}
              </span>
            </div>

            {discountPaise > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Coupon Discount:</span>
                <span>-₹{discountPaise / 100}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Taxable Base Value:</span>
              <span>₹{(taxResult.taxableValueInPaise / 100).toFixed(2)}</span>
            </div>

            {taxResult.isIntraState ? (
              <>
                <div className="flex justify-between">
                  <span>CGST (9%):</span>
                  <span>₹{(taxResult.cgstInPaise / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>SGST (9%):</span>
                  <span>₹{(taxResult.sgstInPaise / 100).toFixed(2)}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between">
                <span>IGST (18%):</span>
                <span>₹{(taxResult.igstInPaise / 100).toFixed(2)}</span>
              </div>
            )}

            <div className="pt-3 border-t border-border flex justify-between text-base font-bold text-ink-primary font-display">
              <span>Total Amount:</span>
              <span>₹{(taxResult.totalInPaise / 100).toFixed(2)}</span>
            </div>
          </div>

          {/* Mandatory acceptance checkbox per PRD Sec 27 */}
          <div className="pt-2 flex items-start gap-2.5 text-[11px] text-ink-muted">
            <input
              type="checkbox"
              id="terms-check"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-0.5"
            />
            <label htmlFor="terms-check" className="leading-tight cursor-pointer">
              I agree to the{" "}
              <Link href="/terms" target="_blank" className="text-primary hover:underline">
                Terms of Service
              </Link>
              ,{" "}
              <Link href="/digital-delivery-policy" target="_blank" className="text-primary hover:underline">
                Watermark Policy
              </Link>
              , and{" "}
              <Link href="/refund-policy" target="_blank" className="text-primary hover:underline">
                Refund Terms
              </Link>
              .
            </label>
          </div>

          <button
            onClick={handlePayment}
            disabled={processing}
            className="w-full py-4 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Lock className="w-4 h-4" />
            <span>{processing ? "Processing via Razorpay..." : `Pay ₹${(taxResult.totalInPaise / 100).toFixed(2)}`}</span>
          </button>

          <div className="text-center text-[10px] font-mono text-ink-muted flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Razorpay Sandbox Integration • Test Mode</span>
          </div>
        </div>

      </div>

    </div>
  );
}
