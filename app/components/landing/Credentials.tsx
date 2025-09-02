import React from 'react';
import Image from 'next/image';
import { Section } from './Section';

export default function Credentials() {
  return (
    <Section id="credentials" className="py-12">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight">Experiencia que respalda</h2>
        <p className="mt-3 opacity-80">
          Más de 13 años liderando audiencias, performance y analítica para marcas globales en LATAM, EE.UU. y Canadá.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center opacity-80">
        <Image src="/logos/amazon.png" alt="Amazon" width={100} height={40} className="h-10 w-auto" />
        <Image src="/logos/bmw.png" alt="BMW" width={100} height={40} className="h-10 w-auto" />
        <Image src="/logos/cvs.png" alt="CVS" width={100} height={40} className="h-10 w-auto" />
        <Image src="/logos/nintendo.png" alt="Nintendo" width={100} height={40} className="h-10 w-auto" />
      </div>

      <div className="mt-10 bg-neutral-50 border rounded-xl p-6 shadow-sm">
        <p className="italic text-neutral-700">
          “Durante la pandemia, asesoramos la creación de un modelo de monetización digital para Jorge Enrique Abello,
          combinando datos, estrategia y creatividad.”
        </p>
      </div>
    </Section>
  );
}

