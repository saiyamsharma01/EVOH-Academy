import React from "react";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";

export const metadata = {
  title: "Contact & Student Support | EVOH Academy",
  description: "Reach the EVOH Academy academic and support team for curriculum inquiries, purchase assistance, or technical questions.",
};

export default function ContactPage() {
  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80">
          Student & Guardian Support
        </span>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          How Can We Help You?
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Have questions about notes content, subscription access, billing, or minor account consent? Send us an inquiry and our team will respond within 1 business day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
        
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-6">
            <h2 className="text-xl font-display font-bold text-slate-900">
              Official Contact Channels
            </h2>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block font-sans">Academic & Order Enquiries</span>
                  <span>support@evohacademy.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block font-sans">Telephone Support</span>
                  <span>+91-9876543210 (Mon-Fri 10am-6pm IST)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block font-sans">Office Location</span>
                  <span>New Delhi, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-900 block mb-1">
              Data Grievance & Minor Protection Officer
            </span>
            <span>
              For statutory requests under India&apos;s Digital Personal Data Protection Act, 2023 (DPDP) or parental consent inquiries, contact us with the subject line <code className="text-blue-700 font-mono font-semibold">[DPDP Grievance]</code>.
            </span>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="lg:col-span-7">
          <form className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span>Send an Official Inquiry</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-700 font-medium">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Student or Guardian Name"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-700 font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="email@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-700 font-medium">Subject Category</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600">
                <option>General Curriculum Inquiry</option>
                <option>Order & Payment Clarification</option>
                <option>Watermarked PDF Technical Issue</option>
                <option>Parental Consent & Minor Account</option>
                <option>Institutional Partnership</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-700 font-medium">Message Details</label>
              <textarea
                required
                rows={5}
                placeholder="Please describe your question or issue in detail..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm outline-none transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xs transition-colors"
            >
              Submit Support Request
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
