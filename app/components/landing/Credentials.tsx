import React from 'react';
import Image from 'next/image';
import { Section } from './Section';

export default function Credentials() {
  return (
    <Section id="credentials" className="py-12">
      {/* Título + descripción */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight">
          Tecnología probada por gigantes. Ahora al servicio de su PyME.
        </h2>
        <p className="mt-3 opacity-80">
          No improvisamos. Nuestro equipo ha gestionado presupuestos millonarios para Amazon,
          BMW y CVS. Traemos esa misma ingeniería de decisión (ODDS) para optimizar
          cada centavo de su inversión.
        </p>
      </div>

      {/* Logos */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center opacity-80">
        <Image src="/logos/amazon.png" alt="Amazon" width={100} height={40} className="h-10 w-auto" />
        <Image src="/logos/bmw.png" alt="BMW" width={100} height={40} className="h-10 w-auto" />
        <Image src="/logos/cvs.png" alt="CVS" width={100} height={40} className="h-10 w-auto" />
        <Image src="/logos/nintendo.png" alt="Nintendo" width={100} height={40} className="h-10 w-auto" />
      </div>

      {/* Caso destacado */}
      <div className="mt-10 bg-neutral-50 border rounded-xl p-6 shadow-sm text-center">
        <p className="italic text-neutral-700 max-w-2xl mx-auto">
          “Transformamos la marca personal de Jorge Enrique Abello en un{' '}
          <strong>activo digital rentable</strong>. Diseñamos <strong>Night Night</strong>, una
          estrategia de monetización que rompió récords de audiencia y venta en plena
          crisis global.”
        </p>
      </div>
    </Section>
  );
}