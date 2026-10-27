import React from "react";
import Link from "next/link";
import { HelpCircle } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions | EVOH Academy",
  description: "Common questions regarding EVOH Academy science notes, watermarking, delivery, and refund policies.",
};

export default function FaqPage() {
  const faqs = [
    {
      category: "Content & Curriculum",
      items: [
        {
          q: "Are EVOH Academy notes officially endorsed by NCERT or CBSE?",
          a: "No. EVOH Academy is an independent educational initiative. Our materials are original academic syntheses written to explain foundational scientific principles with derivations and solved examples. We are not affiliated with or endorsed by NCERT or CBSE.",
        },
        {
          q: "What subjects and classes are currently covered?",
          a: "We currently provide chapter-level concept notes, formula sheets, and question banks for Physics, Chemistry, and Mathematics for Class 11 and Class 12 students.",
        },
        {
          q: "If a chapter is revised, do past purchasers receive the update?",
          a: "Yes! Purchasing a resource grants lifetime digital access to that specific resource edition, and any updated revisions published under that resource version are delivered automatically at no additional fee.",
        },
      ],
    },
    {
      category: "Delivery & Watermarking",
      items: [
        {
          q: "How does the dynamic watermarking work?",
          a: "To prevent unauthorized mass redistribution, every downloaded PDF is dynamically stamped with the purchasing student's name, masked email identifier, order reference, and timestamp. This provides clear digital traceability while keeping the document completely legible for studying.",
        },
        {
          q: "Can I read notes on my phone or tablet?",
          a: "Yes. All notes are standard searchable PDF files that can be opened in any PDF reader on mobile, tablet, or desktop, or viewed directly inside our browser-based web reader.",
        },
      ],
    },
    {
      category: "Purchases & Invoicing",
      items: [
        {
          q: "Will I receive a GST tax invoice for my purchase?",
          a: "Yes. Every verified purchase automatically generates a sequential, GST-compliant tax invoice (or bill of supply) that can be downloaded at any time from your Student Dashboard.",
        },
        {
          q: "What is your refund policy for digital notes?",
          a: "Per our digital delivery policy, digital materials that have already been downloaded or accessed are non-refundable unless the file is defective or corrupt. Subscriptions cancel at the end of the billing period. For details, please review our live Refund Policy.",
        },
      ],
    },
  ];

  return (
    <div className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80">
          Answers & Clarifications
        </span>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Find answers to common questions about study materials, digital licensing, device limits, and payments.
        </p>
      </div>

      <div className="space-y-12">
        {faqs.map((cat, idx) => (
          <div key={idx} className="space-y-6">
            <h2 className="text-xl font-display font-bold text-slate-900 border-b border-slate-200 pb-3">
              {cat.category}
            </h2>

            <div className="space-y-4">
              {cat.items.map((item, qIdx) => (
                <div
                  key={qIdx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 transition-all shadow-xs space-y-2.5"
                >
                  <h3 className="text-base font-display font-bold text-slate-900 flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                    <span>{item.q}</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6.5">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
        <h3 className="text-base font-display font-bold text-slate-900">
          Have an unaddressed academic question?
        </h3>
        <p className="text-xs text-slate-600">
          Our faculty advisory team is available to help clarify any doubts regarding notes or curriculum structure.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Contact Faculty Advisory
          </Link>
        </div>
      </div>

    </div>
  );
}
