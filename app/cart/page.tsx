import React from "react";
import Link from "next/link";
import { ArrowRight, FileText, ShoppingBag, Trash2 } from "lucide-react";

export const metadata = {
  title: "Shopping Cart | EVOH Academy",
};

export default function CartPage() {
  const cartItems = [
    {
      id: "note-1",
      title: "Class 11 Physics: Kinematics & 2D Vectors",
      type: "Concept Notes",
      classLevel: 11,
      priceFormatted: "₹199",
      priceInPaise: 19900,
    },
  ];

  const subtotal = 199;
  const tax = Math.round((subtotal * 18) / 118); // GST included
  const total = subtotal;

  return (
    <div className="py-8 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-10">
      
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-ink-primary tracking-tight">
          Your Shopping Cart
        </h1>
        <p className="text-xs text-ink-muted">
          Review your selected study modules before proceeding to secure GST checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Cart Item List */}
        <div className="lg:col-span-7 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-surface-muted flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-ink-muted uppercase">
                    Class {item.classLevel} • {item.type}
                  </span>
                  <h3 className="text-sm font-display font-bold text-ink-primary">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60">
                <span className="text-base font-display font-bold text-ink-primary block">
                  {item.priceFormatted}
                </span>
                <span className="text-[10px] font-mono text-ink-muted">GST Inclusive</span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Checkout CTA */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-white border border-border shadow-lg space-y-5 sm:space-y-6">
          <h2 className="text-base font-display font-bold text-ink-primary">
            Order Summary
          </h2>

          <div className="space-y-2 text-xs font-mono text-ink-muted">
            <div className="flex justify-between">
              <span>Item Subtotal:</span>
              <span className="text-ink-primary">₹{subtotal - tax}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18% Inclusive):</span>
              <span className="text-ink-primary">₹{tax}</span>
            </div>
            <div className="pt-2 border-t border-border flex justify-between text-sm font-bold text-ink-primary font-display">
              <span>Total Payable:</span>
              <span>₹{total}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/notes"
            className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-ink-muted hover:text-ink-primary text-xs font-semibold transition-colors"
          >
            <span>← Continue Browsing Notes</span>
          </Link>

          <div className="pt-2 border-t border-border flex items-center justify-center gap-3 text-[10px] font-mono text-ink-muted">
            <span>🔒 256-bit Encrypted</span>
            <span>•</span>
            <span>⚡ Instant PDF Release</span>
          </div>
        </div>

      </div>

    </div>
  );
}
