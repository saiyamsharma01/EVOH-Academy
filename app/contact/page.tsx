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
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
          Student & Guardian Support
        </span>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          How Can We Help You?
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Have questions about notes content, subscription access, billing, or minor account consent? Send us an inquiry and our team will respond within 1 business day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
        
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-2xl bg-surface-card/70 border border-white/10 shadow-lg space-y-6 backdrop-blur-md">
            <h2 className="text-xl font-display font-bold text-white">
              Official Contact Channels
            </h2>

            <div className="space-y-4 text-xs font-mono text-slate-400">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <span className="font-bold text-white block font-sans">Academic & Order Enquiries</span>
                  <span>support@evohacademy.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <span className="font-bold text-white block font-sans">Telephone Support</span>
                  <span>+91-9876543210 (Mon-Fri 10am-6pm IST)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <span className="font-bold text-white block font-sans">Office Location</span>
                  <span>New Delhi, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface-card/50 border border-white/10 text-xs text-slate-400 leading-relaxed backdrop-blur-md">
            <span className="font-bold font-mono text-white block mb-1">
              Data Grievance & Minor Protection Officer
            </span>
            <span>
              For statutory requests under India&apos;s Digital Personal Data Protection Act, 2023 (DPDP) or parental consent inquiries, contact us with the subject line <code className="text-cyan-400 font-mono">[DPDP Grievance]</code>.
            </span>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="lg:col-span-7">
          <form className="p-8 rounded-2xl bg-surface-card/80 border border-white/10 shadow-xl space-y-6 backdrop-blur-md">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span>Send an Official Inquiry</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-semibold">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Student or Guardian Name"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-surface-muted/90 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-semibold">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-surface-muted/90 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 font-semibold">Subject</label>
              <input
                type="text"
                required
                placeholder="Curriculum question, refund request, or invoice inquiry"
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-surface-muted/90 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 font-semibold">Message</label>
              <textarea
                rows={5}
                required
                placeholder="Please describe your query in detail..."
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-surface-muted/90 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:-translate-y-0.5"
            >
              Submit Inquiry
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
