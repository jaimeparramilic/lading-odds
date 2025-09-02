import React from 'react';
import { Section } from './Section';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Check } from 'lucide-react';
import { Pill } from './Pill';

const planTiers = [
  {
    name: 'Base',
    tagline: 'Para arrancar con método',
    price: 'A demanda',
    badge: 'Sprint 4–5 semanas',
    features: [
      'Auditoría express de cuentas y sitio',
      'Plan táctico de palabras clave y audiencias',
      'Setup de campañas (search/paid social)',
      '2 creatividades por canal (estáticas/video)',
      'Medición simple del embudo (GA4 + píxeles)',
      'Dashboard básico de resultados',
    ],
  },
  {
    name: 'Growth',
    tagline: 'Escala con automatización + AI',
    price: 'Mensual',
    badge: 'Recomendado',
    featured: true,
    features: [
      'Optimización semanal (bids, budget, negativas)',
      'Testing estructurado (ads/landings/audiencias)',
      'Email & CRM: flows esenciales + integraciones',
      'CRO ligero: hipótesis + cambios rápidos',
      'Reportes ejecutivos y backlog priorizado',
      'Soporte de BI (Snowflake/Looker Studio)',
    ],
  },
  {
    name: 'Pro',
    tagline: 'Operación continua y ciencia de datos',
    price: 'Mensual',
    badge: 'Equipos en co-operación',
    features: [
      'Estrategia multi-canal con mix & MMM ligero',
      'Catálogos Shopping y feeds avanzados',
      'Segmentación de audiencias 1st/3rd party',
      'Modelos de atribución y pruebas de lift',
      'Automatizaciones (Zapier/API) + QA continuo',
      'Soporte C-Level y squads por objetivo',
    ],
  },
] as const;

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <Check className="h-5 w-5 shrink-0" aria-hidden />
      <span className="opacity-90">{children}</span>
    </li>
  );
}

export default function Plans() {
  return (
    <Section id="plans" className="py-12">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight">Planes y paquetes</h2>
        <p className="mt-2 opacity-80">
          Modular. Flexible. Accesible. Selecciona el nivel que mejor se ajusta a tu etapa.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {planTiers.map((p) => (
          <Card key={p.name} className={`flex flex-col ${p['featured'] ? 'border-2' : ''}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{p.name}</CardTitle>
                {p.badge && <Pill>{p.badge}</Pill>}
              </div>
              <p className="text-sm opacity-70">{p.tagline}</p>
              <div className="pt-4 text-3xl font-bold">{p.price}</div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm">
                {p.features.map((f) => (
                  <CheckItem key={f}>{f}</CheckItem>
                ))}
              </ul>
              <div className="mt-6">
                <a href="#contact">
                  <Button className="w-full">Solicitar propuesta</Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
