import React from 'react';
import { Section } from './Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Ajusta la ruta si usas ../../../
import { BarChart, Wrench, Workflow, Check } from 'lucide-react';

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      {/* Icono en Indigo para consistencia de marca */}
      <Check className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" aria-hidden />
      <span className="opacity-90 text-slate-700 leading-relaxed text-sm md:text-base">
        {children}
      </span>
    </li>
  );
}

export default function Services() {
  return (
    <Section id="services" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-3 gap-8">
        
        {/* CARD 1: Auditoría (Diagnóstico de Rentabilidad) */}
        <Card className="border border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
          {/* HEADER: Padding completo (p-6 md:p-8) */}
          <CardHeader className="p-6 md:p-8 border-b border-slate-100">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-indigo-950">
              <div className="p-2.5 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                <BarChart className="h-6 w-6 text-indigo-700" />
              </div>
              Receipt-Level Intelligence
            </CardTitle>
          </CardHeader>
          
          {/* CONTENT: Padding completo (p-6 md:p-8) */}
          <CardContent className="p-6 md:p-8">
            <ul className="space-y-4">
              <CheckItem>
                Ingest deterministic sales data at a person and receipt level
              </CheckItem>
              <CheckItem>
                Real-time automated auditing of ad accounts
              </CheckItem>
              <CheckItem>
                Profitability analysis driven by LLMs
              </CheckItem>
            </ul>
          </CardContent>
        </Card>

        {/* CARD 2: Setup (Infraestructura de Ventas) */}
        <Card className="border border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
          {/* Acento visual superior */}
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>
          
          <CardHeader className="p-6 md:p-8 border-b border-slate-100">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-indigo-950">
              <div className="p-2.5 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                <Wrench className="h-6 w-6 text-indigo-700" /> 
              </div>
              AI Strategy & Creative
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            <ul className="space-y-4">
              <CheckItem>
                Automated generation of communication strategies
              </CheckItem>
              <CheckItem>
                Dynamic creation of ad creatives and web content
              </CheckItem>
              <CheckItem>
                Native integrations with Shopify, VTEX, and CMS
              </CheckItem>
            </ul>
          </CardContent>
        </Card>

        {/* CARD 3: Operación (Ejecución & Escalamiento) */}
        <Card className="border border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
          <CardHeader className="p-6 md:p-8 border-b border-slate-100">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-indigo-950">
               <div className="p-2.5 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                <Workflow className="h-6 w-6 text-indigo-700" />
               </div>
               Autonomous Media Planning
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8">
            <ul className="space-y-4">
              <CheckItem>
                Instant generation of cross-platform media plans
              </CheckItem>
              <CheckItem>
                24/7 algorithmic campaign optimization
              </CheckItem>
              <CheckItem>
                Direct API connections to Meta and Google Ads
              </CheckItem>
            </ul>
          </CardContent>
        </Card>

      </div>
    </Section>
  );
}
