import React from "react";
import { Atom, Wrench } from "lucide-react";

export const metadata = {
  title: "Scheduled Maintenance | EVOH Academy",
};

export default function MaintenancePage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-border shadow-xl text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <Wrench className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-display font-extrabold text-ink-primary">
            Scheduled Maintenance
          </h1>
          <p className="text-xs text-ink-muted leading-relaxed">
            EVOH Academy is currently undergoing routine curriculum and database optimization. Services will resume shortly.
          </p>
        </div>
        <div className="pt-2 text-xs font-mono text-ink-muted">
          Support: <code>support@evohacademy.com</code>
        </div>
      </div>
    </div>
  );
}
