import React from "react";
import { Atom, Wrench } from "lucide-react";

export const metadata = {
  title: "Scheduled Maintenance | EVOH Academy",
};

export default function MaintenancePage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-center space-y-6">
        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
          <Wrench className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-display font-extrabold text-slate-900">
            Scheduled Maintenance
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            EVOH Academy is currently undergoing routine curriculum and database optimization. Services will resume shortly.
          </p>
        </div>
        <div className="pt-2 text-xs text-slate-500">
          Support: <code className="text-blue-700 font-mono font-medium">support@evohacademy.com</code>
        </div>
      </div>
    </div>
  );
}
