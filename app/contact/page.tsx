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
        <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
          Student & Guardian Support
        </span>
        <h1 className="text-4xl font-display font-extrabold text-ink-primary tracking-tight">
          How Can We Help You?
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          Have questions about notes content, subscription access, billing, or minor account consent? Send us an inquiry and our team will respond within 1 business day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
        
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-2xl bg-white border border-border shadow-sm space-y-6">
            <h2 className="text-xl font-display font-bold text-ink-primary">
              Official Contact Channels
            </h2>

            <div className="space-y-4 text-xs font-mono text-ink-muted">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-ink-primary block font-sans">Academic & Order Enquiries</span>
                  <span>support@evohacademy.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-ink-primary block font-sans">Telephone Support</span>
                  <span>+91-9876543210 (Mon-Fri 10am-6pm IST)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-ink-primary block font-sans">Office Location</span>
                  <span>New Delhi, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface-muted border border-border text-xs text-ink-muted leading-relaxed">
            <span className="font-bold font-mono text-ink-primary block mb-1">
              Data Grievance & Minor Protection Officer
            </span>
            <span>
              For statutory requests under India&apos;s Digital Personal Data Protection Act, 2023 (DPDP) or parental consent inquiries, contact us with the subject line <code>[DPDP Grievance]</code>.
            </span>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="lg:col-span-7">
          <form className="p-8 rounded-2xl bg-white border border-border shadow-md space-y-6">
            <h2 className="text-xl font-display font-bold text-ink-primary flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span>Send an Official Inquiry</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-ink-primary font-semibold">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Student or Guardian Name"
                  className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-ink-primary font-semibold">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-ink-primary font-semibold">Subject</label>
              <input
                type="text"
                required
                placeholder="Curriculum question, refund request, or invoice inquiry"
                className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-ink-primary font-semibold">Message</label>
              <textarea
                rows={5}
                required
                placeholder="Please describe your query in detail..."
                className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-colors shadow-md shadow-primary/20"
            >
              Submit Inquiry
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
