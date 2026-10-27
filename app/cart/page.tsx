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
    <div className="py-8 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
      
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
          Your Shopping Cart
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Review your selected study modules before proceeding to secure GST checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Cart Item List */}
        <div className="lg:col-span-7 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
            >
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-semibold text-blue-600 tracking-wider">
                    Class {item.classLevel} • {item.type}
                  </span>
                  <h3 className="text-sm font-display font-bold text-slate-900">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <span className="text-base font-display font-bold text-slate-900 block">
                  {item.priceFormatted}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">GST Inclusive</span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Checkout CTA */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-6">
          <h2 className="text-base font-display font-bold text-slate-900">
            Order Summary
          </h2>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Item Subtotal:</span>
              <span className="text-slate-800 font-medium">₹{subtotal - tax}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18% Inclusive):</span>
              <span className="text-slate-800 font-medium">₹{tax}</span>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between text-sm font-bold text-slate-900 font-display">
              <span>Total Payable:</span>
              <span className="text-blue-700 font-extrabold text-lg">₹{total}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/notes"
            className="w-full inline-flex items-center justify-center py-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            Continue Browsing Notes
          </Link>
        </div>

      </div>
    </div>
  );
}
