import React from 'react';
import { Section } from './Section';

export default function About() {
  return (
    <Section id="about" className="py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight">Sobre mí</h2>
        <p className="mt-3 opacity-80">
          Soy Jaime Parra Milic, con más de 13 años liderando equipos de data y marketing digital en agencias globales
          como Havas Media e IPG. He trabajado con marcas como Amazon, BMW, CVS, Liberty Mutual y Claro, generando
          mejoras de hasta 200% en retorno. Hoy aplico ese conocimiento para ayudar a PyMEs a lograr resultados reales
          con estructura, datos y foco en ventas.
        </p>
      </div>
    </Section>
  );
}
