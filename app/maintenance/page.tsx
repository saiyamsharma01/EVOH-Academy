import React from "react";
import { Atom, Wrench } from "lucide-react";

export const metadata = {
  title: "Scheduled Maintenance | EVOH Academy",
};

export default function MaintenancePage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 rounded-3xl bg-surface-card/85 border border-white/10 shadow-2xl text-center space-y-6 backdrop-blur-md">
        <div className="w-14 h-14 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-950/50">
          <Wrench className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-display font-extrabold text-white">
            Scheduled Maintenance
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            EVOH Academy is currently undergoing routine curriculum and database optimization. Services will resume shortly.
          </p>
        </div>
        <div className="pt-2 text-xs font-mono text-slate-400">
          Support: <code className="text-cyan-400 font-mono">support@evohacademy.com</code>
        </div>
      </div>
    </div>
  );
}
