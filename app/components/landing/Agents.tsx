'use client';

import React from 'react';
import { Section } from './Section';

type AgentCardProps = {
  title: string;
  desc: string;
  href: string;
  emoji: string;
};

function AgentCard({ title, desc, href, emoji }: AgentCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition ring-1 ring-black/10"
    >
      <div className="text-2xl mb-2">{emoji}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm opacity-80 mt-1">{desc}</p>
    </a>
  );
}

export default function Agents() {
  return (
    <Section id="agents" className="py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Prueba nuestros agentes de marketing
          </h2>
          <p className="mt-2 text-lg opacity-80">
            Demostraciones de agentes que automatizan tareas, con supervisión humana para garantizar calidad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AgentCard
            emoji="🔎"
            title="Diagnóstico de pauta"
            desc="Analiza tu inversión publicitaria y encuentra oportunidades de optimización."
            href="https://chatgpt.com/g/g-688f92ce8e00819187bcbbbf446a91bd-diagnostico-de-pauta-by-odds?model=gpt-4o"
          />
          <AgentCard
            emoji="🎨"
            title="Diseñador de posts"
            desc="Crea contenido atractivo para redes sociales en segundos."
            href="https://chatgpt.com/g/g-689bb9f9816c8191b22c80499f01fb60-odds-posts-designer"
          />
          <AgentCard
            emoji="💻"
            title="Asesor de webs & landings"
            desc="Ideas y mejoras para páginas que convierten."
            href="https://chatgpt.com/g/g-689bbee75ff08191b061126601feb3c7-asesor-creacion-webs-y-landings?model=gpt-4o"
          />
          <AgentCard
            emoji="📊"
            title="Madurez digital"
            desc="Evalúa qué tan preparada está tu empresa para escalar."
            href="https://chatgpt.com/g/g-68a89659f9548191ba2e4f9311dac4a5-marketing-digital-diagnostico-de-madurez-digital"
          />
          <AgentCard
            emoji="✍️"
            title="Escritor de posts (LinkedIn)"
            desc="Publica como un pro: ideas, estructura y redacción optimizada."
            href="https://chatgpt.com/g/g-689bb9f9816c8191b22c80499f01fb60-odds-posts-designer"
          />
        </div>
      </div>
    </Section>
  );
}
