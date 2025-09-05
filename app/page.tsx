'use client';

import Hero from '../app/components/landing/Hero';
import Credentials from '../app/components/landing/Credentials';
import Services from '../app/components/landing/Services';
import Plans from '../app/components/landing/Plans';
import Process from '../app/components/landing/Process';
import FAQ from '../app/components/landing/FAQ';
import About from '../app/components/landing/About';
import Contact from '../app/components/landing/Contact';
import Analytics from '../app/components/landing/Analytics';
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
      <Plans />
      <Process />
      <FAQ />
      <About />
      <Contact />
    </div>
  );
}

