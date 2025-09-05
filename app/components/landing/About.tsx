import React from 'react';
import Image from 'next/image';
import { Section } from './Section';


export default function About() {
  return (
    <Section id="about" className="py-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Foto */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/10">
            <Image
              src="/jaime.png" // 📌 pon tu foto en /public/jaime.png
              alt="Jaime Parra Milic"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Texto */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight">Sobre mí</h2>
          <p className="mt-4 opacity-80 text-lg leading-relaxed">
            Soy <strong>Jaime Parra Milic</strong> y llevo más de <strong>13 años</strong> ayudando marcas a crecer
            con datos y marketing digital. Lideré equipos en <strong>Havas Media</strong> e <strong>IPG</strong>,
            trabajando con compañías como Amazon, BMW, CVS y Claro, logrando incrementos de hasta
            <strong> 200% en retorno</strong>.
          </p>
          <p className="mt-4 opacity-80 text-lg leading-relaxed">
            Hoy pongo esa experiencia al servicio de <strong>PyMEs y emprendedores</strong>: estructuramos campañas,
            implementamos medición precisa (GA4, píxeles, UTMs) y optimizamos semana a semana
            para que la inversión se traduzca en <strong>ventas reales y sostenibles</strong>.
          </p>
        </div>
      </div>
    </Section>
  );
}
