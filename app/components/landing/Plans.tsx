'use client';

import React from 'react';
import { Section } from './Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';

const SHOW_PRICES = false;

type Plan = {
  name: string;
  tagline: string;
  price?: string;
  priceNote?: string;
  badge?: string;
  featured?: boolean;
  features: string[];
  buttonText: string;
};

const planTiers: Plan[] = [
  {
    name: 'Auditoría de Desbloqueo',
    tagline: 'Para el que duda o quiere probar antes de casarse.',
    badge: 'Sin Compromiso',
    features: [
      'Diagnóstico profundo de cuentas publicitarias (Meta/Google)',
      'Análisis forense de estructura de costos y fugas',
      'Revisión técnica de medición (Píxeles/CAPI)',
      'Entregable: Plan de Acción Táctico para su equipo',
      'Ideal para validar la calidad de ODDS sin ataduras',
    ],
    buttonText: 'Solicitar Auditoría Única',
  },
  {
    name: 'Growth Partner (ODDS)',
    tagline: 'Para el que quiere delegar y facturar.',
    badge: 'Socio de Crecimiento',
    featured: true,
    features: [
      'Ejecución total de campañas con IA + Estrategas Humanos',
      'Optimización diaria de presupuesto y creativos',
      'Reuniones de estrategia quincenales',
      'Reportes de rentabilidad en tiempo real',
      'Acceso total a nuestro stack tecnológico enterprise',
    ],
    buttonText: 'Aplicar para ser Partner',
  },
  {
    name: 'Consultoría In-House',
    tagline: 'Para marcas que necesitan cerebro, no manos.',
    badge: 'Solo bajo cupo',
    features: [
      'Intervención estratégica a nivel directivo',
      'Diseño de modelos de atribución complejos',
      'Formación y estructuración de su equipo interno',
      'Estrategias de expansión internacional',
      'Soporte directo vía Slack/WhatsApp con Dirección',
    ],
    buttonText: 'Consultar Disponibilidad',
  },
];

function CheckItem({ children, featured }: { children: React.ReactNode, featured?: boolean }) {
  return (
    <li className="flex gap-3 items-start">
      <Check 
        className={`h-5 w-5 shrink-0 mt-0.5 ${featured ? 'text-indigo-600' : 'text-slate-400'}`} 
        aria-hidden 
      />
      <span className="text-slate-600 text-sm leading-relaxed">{children}</span>
    </li>
  );
}

export default function Plans() {
  return (
    <Section id="plans" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto text-center mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          ¿Cómo prefiere iniciar?
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          No creemos en las tallas únicas. Elija la velocidad y el nivel de profundidad que su negocio necesita hoy.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-4">
        {planTiers.map((p) => (
          <Card 
            key={p.name} 
            className={`flex flex-col relative transition-all duration-300 hover:-translate-y-1 overflow-visible ${
              p.featured 
                ? 'border-2 border-indigo-600 shadow-xl shadow-indigo-100 z-10' 
                : 'border border-slate-200 shadow-sm hover:shadow-lg'
            }`}
          >
            {/* Badge flotante corregido: ajustado top y z-index */}
            {p.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center shadow-md whitespace-nowrap z-20">
                <Sparkles className="w-3 h-3 mr-1" />
                Opción Recomendada
              </div>
            )}

            {/* Header con PADDING explícito (p-6 md:p-8) */}
            <CardHeader className="p-6 md:p-8 pb-4">
              <div className="flex flex-col gap-4">
                
                <div className="flex justify-between items-start">
                   <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide border ${
                     p.featured 
                       ? "bg-indigo-50 text-indigo-700 border-indigo-100" 
                       : "bg-slate-100 text-slate-600 border-slate-200"
                   }`}>
                     {p.badge}
                   </span>
                </div>
                
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900">{p.name}</CardTitle>
                  <p className="text-sm text-slate-500 mt-3 min-h-[40px] leading-relaxed">
                    {p.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-2">
                  {SHOW_PRICES ? (
                    <>
                      <div className="text-3xl font-bold text-slate-900">{p.price}</div>
                      {p.priceNote && (
                        <div className="text-xs text-slate-500 mt-1">{p.priceNote}</div>
                      )}
                    </>
                  ) : (
                    <div className="text-2xl font-bold text-slate-900 tracking-tight">
                      Cotización a Medida
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>

            {/* Content con PADDING explícito y fondo sutil si es necesario */}
            <CardContent className="flex-1 flex flex-col justify-between gap-8 p-6 md:p-8 pt-0">
              <ul className="space-y-4 mt-2">
                {p.features.map((f) => (
                  <CheckItem key={f} featured={p.featured}>{f}</CheckItem>
                ))}
              </ul>

              <div className="pt-4 mt-auto">
                <a href="#contact" className="block w-full">
                  <Button 
                    className={`w-full h-12 text-sm font-bold uppercase tracking-wide transition-all duration-300 ${
                      p.featured 
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 hover:shadow-lg' 
                        : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-sm'
                    }`}
                    variant={p.featured ? "default" : "outline"} 
                  >
                    {p.buttonText}
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}