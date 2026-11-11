import React from 'react';
import Image from 'next/image';
import { Section } from './Section';

export default function Credentials() {
  return (
    <Section id="credentials" className="py-12">
      {/* Título + descripción */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight">
          Built by experts. Executed by autonomous agents.
        </h2>
        <p className="mt-3 opacity-80">
          Our team engineered data-driven growth for Google, Amazon, BMW, and CVS. Now, our platform does it autonomously for your brand.
        </p>
      </div>

      {/* Logos */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center opacity-80">
        <Image src="/logos/google.png" alt="Google" width={100} height={40} className="h-10 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
        <Image src="/logos/amazon.png" alt="Amazon" width={100} height={40} className="h-10 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
        <Image src="/logos/bmw.png" alt="BMW" width={100} height={40} className="h-10 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
        <Image src="/logos/cvs.png" alt="CVS" width={100} height={40} className="h-10 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
        <Image src="/logos/nintendo.png" alt="Nintendo" width={100} height={40} className="h-10 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
      </div>

      {/* Caso destacado */}
      <div className="mt-10 bg-neutral-50 border rounded-xl p-6 shadow-sm text-center">
        <p className="italic text-neutral-700 max-w-2xl mx-auto">
          “Our multi-agent architecture processes millions of data points daily, turning raw behavioral data into an autonomous, high-converting revenue engine for enterprise brands.”
        </p>
      </div>
    </Section>
  );
}