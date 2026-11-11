'use client';

import React from 'react';
import { Section } from './Section';
import { ExternalLink, Sparkles, ArrowRight, ScanSearch, Palette, MonitorCheck, TrendingUp, PenLine, Rocket } from 'lucide-react';

// Definimos la interfaz para aceptar un componente de icono en lugar de un string de emoji
type AgentCardProps = {
  title: string;
  desc: string;
  href: string;
  Icon: React.ElementType; // Cambiado de emoji: string a Icon: React.ElementType
  tag?: string;
};

function AgentCard({ title, desc, href, Icon, tag }: AgentCardProps) {
  return (
    <a
      href={href}
      // UX: Altura completa (h-full), bordes y sombras índigo en hover para affordance
      className="group relative flex flex-col h-full p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-300 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Badge: Índigo corporativo */}
      {tag && (
        <span className="absolute top-4 right-12 text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
          {tag}
        </span>
      )}

      {/* Icono de enlace externo: Se enciende en índigo */}
      <div className="absolute top-4 right-4 text-slate-300 group-hover:text-indigo-500 transition-colors duration-300">
        <ExternalLink className="h-5 w-5" />
      </div>

      {/* Container del Icono: Fondo índigo claro, icono índigo oscuro */}
      <div className="h-14 w-14 flex items-center justify-center rounded-xl bg-indigo-50/80 text-indigo-600 mb-5 border border-indigo-100 group-hover:scale-105 group-hover:bg-indigo-100 group-hover:text-indigo-700 group-hover:border-indigo-200 transition-all duration-300">
        <Icon className="h-8 w-8" strokeWidth={1.5} />
      </div>
      
      <div className="flex-1">
        {/* Título: Se oscurece a índigo profundo en hover */}
        <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-900 transition-colors flex items-center gap-2">
          {title}
        </h3>
        
        <p className="text-sm text-slate-600 mt-3 leading-relaxed">
          {desc}
        </p>
      </div>

      {/* CTA textual: Aparece en índigo */}
      <div className="mt-5 pt-4 border-t border-slate-50 flex items-center text-xs font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0">
        Book a Demo <ArrowRight className="h-3 w-3 ml-1" />
      </div>
    </a>
  );
}

export default function Agents() {
  return (
    <Section id="agents" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header de Sección */}
        <div className="text-center mb-16 flex flex-col items-center">
          {/* Pill estilo índigo */}
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200 bg-indigo-50 mb-4">
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-indigo-500" />
            Agent Suite
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Meet Your New Media & Creative Team
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Why hire an agency? Deploy our specialized AI agents to execute strategy, media planning, and content creation in seconds.
          </p>
          
          {/* Disclaimer sutil */}
          <p className="mt-4 text-xs font-medium text-indigo-900/60 bg-indigo-50/50 px-4 py-1.5 rounded-full border border-indigo-100/30">
            * Enterprise SLA includes human-in-the-loop review by ex-Amazon data scientists.
          </p>
        </div>

        {/* Grid de Agentes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          <AgentCard
            Icon={ScanSearch} // Reemplazo de 🔎
            title="Ad Account Auditor"
            desc="Stop burning budget. Mathematically analyze your campaigns and detect leaks instantly."
            href="#contact"
            tag="Most Used"
          />
          
          <AgentCard
            Icon={Palette} // Reemplazo de 🎨
            title="Creative Generator"
            desc="Generate on-brand visual concepts and ad copy autonomously."
            href="#contact"
          />
          
          <AgentCard
            Icon={MonitorCheck} // Reemplazo de 💻
            title="Conversion Analyst"
            desc="Receive a brutally honest UX/UI audit with structural improvements to increase conversion rates."
            href="#contact"
          />
          
          <AgentCard
            Icon={TrendingUp} // Reemplazo de 📊
            title="Scale Diagnostic"
            desc="Evaluate if your current infrastructure can support hyper-growth."
            href="#contact"
          />
          
          <AgentCard
            Icon={PenLine} // Reemplazo de ✍️
            title="B2B Copywriter"
            desc="Structure and draft technical content optimized for B2B lead generation."
            href="#contact"
          />
          
          {/* Tarjeta CTA: Índigo profundo sólido */}
          <a
            href="#contact"
            className="group flex flex-col justify-center items-center h-full p-8 bg-indigo-950 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1 text-center border border-indigo-900 relative overflow-hidden"
          >
            {/* Gradiente sutil para dar profundidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 via-transparent to-transparent opacity-50"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-indigo-800/50 text-indigo-200 mb-6 group-hover:scale-105 group-hover:bg-indigo-800 group-hover:text-white transition-all duration-300 backdrop-blur-sm border border-indigo-700/50">
                <Rocket className="h-8 w-8" strokeWidth={1.5} /> {/* Reemplazo de 🚀 */}
              </div>
              <h3 className="font-bold text-xl text-white mb-2">
                Need a Custom Agent Pipeline?
              </h3>
              <p className="text-sm text-indigo-200 leading-relaxed mb-6">
                Let's build a customized multi-agent architecture for your enterprise.
              </p>
              <span className="inline-flex items-center text-sm font-bold text-indigo-950 bg-indigo-100 hover:bg-white px-5 py-2.5 rounded-lg transition-colors duration-300 ring-1 ring-indigo-200 hover:ring-white">
                Book a Demo <ArrowRight className="h-4 w-4 ml-2" />
              </span>
            </div>
          </a>

        </div>
      </div>
    </Section>
  );
}