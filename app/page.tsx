'use client';

import Hero from './components/landing/Hero';
import Credentials from './components/landing/Credentials';
import Services from './components/landing/Services';
import Plans from './components/landing/Plans';
import Process from './components/landing/Process';
import FAQ from './components/landing/FAQ';
import About from './components/landing/About';
import Contact from './components/landing/Contact';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 text-neutral-900">
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

