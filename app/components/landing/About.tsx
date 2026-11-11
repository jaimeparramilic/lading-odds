'use client';

import React from 'react';
import Image from 'next/image';
import { Section } from './Section';
import { Rocket, Brain, LineChart, Layers, Code, Linkedin } from 'lucide-react';

// Tipo de dato para los miembros
type TeamMember = {
  name: string;
  role: string;
  icon: React.ReactNode;
  bio: string;
  image: string;
  linkedin: string;
};

const teamMembers: TeamMember[] = [
  {
    name: 'Jaime Parra Milic',
    role: 'CEO & Strategy Director',
    icon: <Rocket className="w-4 h-4" />,
    bio: 'CEO & Strategy Director. Current Associate Director of Client Analytics at WPP (Media Futures Group), leading data and analytics initiatives for Google & Android operations. 13+ years engineering growth for Amazon, BMW, and CVS. Mathematician building the multi-agent systems that replace traditional agencies.',
    image: '/jaime.png', 
    linkedin: 'https://www.linkedin.com/in/jaime-parra-milic/' 
  },
  {
    name: 'Carlos Pinilla, PhD',
    role: 'Head of AI & Science',
    icon: <Brain className="w-4 h-4" />,
    bio: 'PhD in Mathematics & Researcher at UCL. Designs the probabilistic models that allow our agents to bid with mathematical certainty.',
    image: '/carlos.jpeg', 
    linkedin: 'https://www.linkedin.com/in/carlos-pinilla-s/'
  },
  {
    name: 'Manuel Oviedo',
    role: 'Head of Performance',
    icon: <LineChart className="w-4 h-4" />,
    bio: 'Former IPG & Publicis. Managed enterprise media strategies for brands like Nestlé, now translating that logic into algorithmic workflows.',
    image: '/manuel.jpeg', 
    linkedin: 'https://www.linkedin.com/in/manueloviedo-marketing/'
  },
  {
    name: 'Daniel Restrepo',
    role: 'Head of Operations',
    icon: <Layers className="w-4 h-4" />,
    bio: 'Global process architect. Optimized operations for Liberty Mutual and Amazon. Ensures military-grade execution for our agent pipelines.',
    image: '/daniel.jpeg', 
    linkedin: 'https://www.linkedin.com/in/daniel-restrepo-jimenez-425439194/'
  },
  {
    name: 'Diego Forero',
    role: 'CTO & Tech Lead',
    icon: <Code className="w-4 h-4" />,
    bio: 'High-traffic systems engineer. Connects your ecosystem (Shopify, VTEX) with our AI models ensuring real-time data flow.',
    image: '/diego.jpeg', 
    linkedin: 'https://www.linkedin.com/in/diego-nicolas-forero/'
  },
];

export default function Team() {
  return (
    <Section id="team" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header de Sección */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            World-Class Engineers & Strategists.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Industry veterans who have managed enterprise budgets, now building the AI infrastructure to automate it.
          </p>
        </div>

        {/* Grid del Equipo */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.name} 
              className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Barra de color superior (accent) */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 group-hover:from-indigo-400 group-hover:to-indigo-600 transition-all duration-500" />

              {/* Imagen con anillo */}
              <div className="relative w-32 h-32 mb-6 rounded-full p-1 bg-slate-100 group-hover:bg-indigo-100 transition-colors duration-300">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Contenido */}
              <div className="flex flex-col items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                  {member.name}
                </h3>
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 text-xs font-semibold text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors border border-slate-100">
                  {member.icon}
                  {member.role}
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {/* Lógica simple para resaltar marcas en negrita si es necesario, 
                    o simplemente renderizar el texto limpio */}
                {member.bio}
              </p>

              {/* Footer de la tarjeta: LinkedIn */}
              <div className="mt-auto pt-4 w-full border-t border-slate-50">
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-[#0077b5] transition-colors"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}