"use client";

import Link from "next/link";
import { ShieldCheck, ExternalLink, Users, Package, Settings, ArrowRight } from "lucide-react";

export default function AdminPortalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-gray-900 via-neutral-900 to-black text-white p-8 md:p-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" /> Standalone Admin Portal
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            BeuPROS Admin Command Center
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
            The admin management system is deployed as an isolated application located in the <code className="text-emerald-400 bg-white/10 px-2 py-0.5 rounded font-mono text-xs">/admin</code> folder, running securely on port 3001 with direct access to user verification and catalog controls.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 space-y-8">
          {/* Quick Launch Card */}
          <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
                Launch Standalone Admin App
                <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded">PORT 3001</span>
              </h2>
              <p className="text-sm text-emerald-800 mt-1">
                Access the real-time dashboard to approve pending salon applications and manage the 4,200+ product catalog.
              </p>
            </div>
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md shadow-emerald-600/20 transition-all shrink-0 hover:scale-[1.02]"
            >
              Open Admin App
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Module Overviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Salon Verification & Approval</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Review incoming salon registrations, inspect business trade licenses, approve verified professionals, or decline with feedback.
              </p>
              <a
                href="http://localhost:3001/users"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                Go to Salon Approvals <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Product Catalog & Pricing</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Add, edit, or remove professional products, adjust salon trade wholesale pricing vs retail MRP, and manage stock quantities.
              </p>
              <a
                href="http://localhost:3001/products"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700"
              >
                Go to Products Catalog <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick CLI command tips */}
          <div className="p-6 rounded-2xl bg-gray-900 text-white space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="font-mono flex items-center gap-2">
                <Settings className="w-3.5 h-3.5 text-emerald-400" /> CLI Command to Start Admin
              </span>
              <span className="text-[11px] text-gray-500">Root folder</span>
            </div>
            <pre className="font-mono text-xs bg-black/50 p-3 rounded-lg text-emerald-300 overflow-x-auto">
              npm run admin:dev
            </pre>
            <p className="text-xs text-gray-400">
              Starts the admin Next.js server on <span className="text-white font-mono">http://localhost:3001</span>.
            </p>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
            >
              ← Return to BeuPROS Storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
