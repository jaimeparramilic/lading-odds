import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Globe,
  Mail,
  Rocket,
  Sparkles,
} from 'lucide-react';
import { Pill } from '../components/landing/Pill';
import { Section } from '../components/landing/Section';

export const metadata = {
  title: 'ODDS Agents | Coming Soon',
  description:
    'ODDS Agents — Autonomous multi-agent AI workspace for media planning, creative automation, and receipt-level attribution.',
};

export default function AppHomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar */}
      <header className="bg-slate-50 border-b border-slate-200">
        <Section className="py-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative h-12 md:h-14 flex-shrink-0 flex items-center">
                <Image
                  src="/logos/odds.png"
                  alt="ODDS Logo"
                  width={56}
                  height={56}
                  className="h-full w-auto object-contain rounded-lg"
                  priority
                />
              </div>
              <Pill className="bg-white border-slate-200 shadow-sm text-slate-600 text-xs md:text-sm py-1.5 px-4">
                ODDS Agents · Autonomous Platform
              </Pill>
            </div>

            <div className="flex items-center gap-4 text-sm font-medium">
              <Link
                href="/terms"
                className="text-slate-600 hover:text-indigo-900 transition-colors no-underline hover:underline"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-slate-600 hover:text-indigo-900 transition-colors no-underline hover:underline"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </Section>
      </header>

      {/* Main Coming Soon Box matching Agents.tsx */}
      <main className="flex-1 flex items-center justify-center py-16 md:py-24">
        <Section className="w-full">
          <div className="max-w-xl mx-auto">
            <div className="group flex flex-col justify-center items-center p-8 md:p-12 bg-indigo-950 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1 text-center border border-indigo-900 relative overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 via-transparent to-transparent opacity-50 pointer-events-none" />

              {/* Coming Soon Badge */}
              <span className="relative z-10 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-200 bg-indigo-900/80 border border-indigo-700/60 mb-6">
                <Sparkles className="h-3.5 w-3.5 mr-1.5 text-indigo-300" />
                Coming Soon
              </span>

              <div className="relative z-10 flex flex-col items-center">
                <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-indigo-800/50 text-indigo-200 mb-6 group-hover:scale-105 group-hover:bg-indigo-800 group-hover:text-white transition-all duration-300 backdrop-blur-sm border border-indigo-700/50">
                  <Rocket className="h-8 w-8" strokeWidth={1.5} />
                </div>

                <h1 className="font-bold text-2xl md:text-3xl text-white mb-3 tracking-tight">
                  ODDS Agents Workspace
                </h1>

                <p className="text-sm md:text-base text-indigo-200 leading-relaxed mb-8 max-w-md">
                  Our multi-agent AI platform for autonomous strategy, media planning, creative generation, and receipt-level attribution is launching soon.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <a
                    href="https://www.oddsbots.online/#contact"
                    className="inline-flex items-center justify-center text-sm font-bold text-indigo-950 bg-indigo-100 hover:bg-white px-6 py-3 rounded-lg transition-colors duration-300 ring-1 ring-indigo-200 hover:ring-white no-underline hover:no-underline w-full sm:w-auto"
                  >
                    Request Early Access <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
                  <a
                    href="https://www.oddsbots.online"
                    className="inline-flex items-center justify-center text-sm font-semibold text-indigo-100 hover:text-white bg-indigo-900/60 hover:bg-indigo-900 px-5 py-3 rounded-lg border border-indigo-700/60 transition-colors duration-300 no-underline hover:no-underline w-full sm:w-auto"
                  >
                    Visit ODDS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
        <Section className="py-8">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm">
            <p className="text-slate-400">
              Optimal Dynamic Decision Systems S.A.S. (ODDS) · Bogotá D.C., Colombia
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/terms"
                className="text-slate-300 hover:text-white transition-colors no-underline hover:underline"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-slate-300 hover:text-white transition-colors no-underline hover:underline"
              >
                Privacy Policy
              </Link>
              <a
                href="https://www.oddsbots.online"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors no-underline hover:underline"
              >
                <Globe className="w-4 h-4 text-indigo-400" />
                oddsbots.online
              </a>
              <a
                href="mailto:jaime.parra@oddsbots.online"
                className="inline-flex items-center gap-1.5 text-indigo-300 hover:text-white transition-colors no-underline hover:underline"
              >
                <Mail className="w-4 h-4" />
                jaime.parra@oddsbots.online
              </a>
            </div>
          </div>
        </Section>
      </footer>
    </div>
  );
}
