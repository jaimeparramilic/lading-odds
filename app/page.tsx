'use client';

import Hero from '../app/components/landing/Hero';
import Credentials from '../app/components/landing/Credentials';
import Services from '../app/components/landing/Services';
import Agents from '../app/components/landing/Agents'; // 👈 nuevo
import Plans from '../app/components/landing/Plans';
import Process from '../app/components/landing/Process';
import FAQ from '../app/components/landing/FAQ';
import About from '../app/components/landing/About';
import Contact from '../app/components/landing/Contact';
import Analytics from '../app/components/landing/Analytics';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 text-neutral-900">
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
      <Hero />
      <Credentials />
      <Services />
      <Agents />     
      <Plans />
      <About />
      <FAQ />
      <Contact />
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm">
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} Optimal Dynamic Decision Systems S.A.S. (ODDS). All rights reserved.
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
              href="https://app.oddsbots.online"
              className="text-indigo-400 hover:text-indigo-300 transition-colors no-underline hover:underline"
            >
              app.oddsbots.online
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
