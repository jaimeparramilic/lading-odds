import React from 'react';
import { Section } from './Section';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { BarChart, Wrench, Workflow, Check } from 'lucide-react';

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      {/* Icono en Indigo para consistencia de marca */}
      <Check className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" aria-hidden />
      <span className="opacity-90 text-slate-700 leading-relaxed">{children}</span>
    </li>
  );
}

export default function Services() {
  return (
    <Section id="services" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* CARD 1: Auditoría (Diagnóstico de Rentabilidad) */}
        <Card className="border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="flex items-center gap-3 text-xl text-indigo-950">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <BarChart className="h-5 w-5 text-indigo-700" />
              </div>
              Diagnóstico de Rentabilidad
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4 text-sm">
              <CheckItem>
                <strong>Diagnóstico Profundo (1 Semana):</strong> Auditamos la salud financiera de su negocio a fondo, no por encima.
              </CheckItem>
              <CheckItem>
                Detectamos <strong>fugas de presupuesto</strong> y errores estructurales que nadie más vio.
              </CheckItem>
              <CheckItem>
                Auditoría forense de Data: Validamos que sus píxeles midan ventas reales, no clics fantasma.
              </CheckItem>
              <CheckItem>
                Entregable: Un <strong>Plan de Acción Táctico</strong> diseñado para recuperar dinero y escalar.
              </CheckItem>
            </ul>
          </CardContent>
        </Card>

        {/* CARD 2: Setup (Infraestructura de Ventas) */}
        <Card className="border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
          {/* Pequeño acento visual para diferenciar Setup (opcional en High-Ticket) */}
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600/10"></div>
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="flex items-center gap-3 text-xl text-indigo-950">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Wrench className="h-5 w-5 text-indigo-700" /> 
              </div>
              Infraestructura de Ventas
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4 text-sm">
              <CheckItem>
                Despliegue técnico avanzado sin que usted toque una línea de código.
              </CheckItem>
              <CheckItem>
                Estructura multicanal (Meta, Google, TikTok) configurada para <strong>conversión</strong>, no para tráfico.
              </CheckItem>
              <CheckItem>
                Integración nativa con su e-commerce (Shopify, VTEX, Woo) para trazar cada peso.
              </CheckItem>
              <CheckItem>
                Implementación de creativos de alto impacto validados por <strong>inteligencia de mercado</strong>.
              </CheckItem>
            </ul>
          </CardContent>
        </Card>

        {/* CARD 3: Operación (Ejecución & Escalamiento) */}
        <Card className="border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="flex items-center gap-3 text-xl text-indigo-950">
               <div className="p-2 bg-indigo-50 rounded-lg">
                <Workflow className="h-5 w-5 text-indigo-700" />
               </div>
               Ejecución & Escalamiento
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4 text-sm">
              <CheckItem>
                <strong>Optimización diaria (IA):</strong> Algoritmos que ajustan la puja 24/7 para bajar el CPA.
              </CheckItem>
              <CheckItem>
                <strong>Estrategia experta (Humanos):</strong> Ex-directivos supervisan la calidad del crecimiento.
              </CheckItem>
              <CheckItem>
                Reportes financieros en tiempo real. Eliminamos las métricas de vanidad.
              </CheckItem>
              <CheckItem>
                Actuamos como su equipo interno de Performance. <strong>Sin carga prestacional</strong> ni despidos.
              </CheckItem>
            </ul>
          </CardContent>
        </Card>

      </div>
    </Section>
  );
}
