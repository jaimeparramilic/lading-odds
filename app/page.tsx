'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Check,
  ChevronRight,
  Rocket,
  BarChart,
  Workflow,
  Calendar,
  Mail,
  Phone,
  Globe2,
  Store,
  ShoppingCart,
  LineChart,
  Wrench,
  Shield,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

// Helpers
const Section = ({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </section>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide">
    {children}
  </span>
);

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <Check className="h-5 w-5 shrink-0" aria-hidden />
      <span className="opacity-90">{children}</span>
    </li>
  );
}

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

export default function Page() {
  const [roi, setRoi] = useState({ spend: 1_000_000, cpa: 50_000, targetCpa: 40_000 });

  const savings = useMemo(() => {
    const { spend, cpa, targetCpa } = roi;
    if (!spend || !cpa || !targetCpa) return 0;
    const conv = spend / cpa;
    const convTarget = spend / targetCpa;
    const gain = convTarget - conv;
    return Math.max(0, Math.round(gain));
  }, [roi]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 text-neutral-900">
      {/* Hero Section */}
      <Section className="pt-16 pb-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Pill>Boutique LATAM para ecommerce y servicios</Pill>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
              Marketing de performance que{' '}
              <span className="underline decoration-4 decoration-black underline-offset-4">mueve el medidor</span>.
            </h1>
            <p className="mt-4 text-lg opacity-90 max-w-prose">
              Ejecutamos campañas y analítica con método: estructura simple, automatización con control humano y pruebas
              claras. Si inviertes <strong>≥ $400.000 COP/mes</strong> en pauta, optimizamos para más ventas y mejor
              ROAS.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact">
                <Button className="gap-2">
                  Habla con nosotros <ChevronRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#plans">
                <Button variant="outline" className="gap-2">
                  Ver planes <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Card className="ring-1 ring-black/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" /> Mini-proyección
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs">Pauta mensual (COP)</label>
                    <Input type="number" value={roi.spend} onChange={(e) => setRoi({ ...roi, spend: +e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs">CPA actual (COP)</label>
                    <Input type="number" value={roi.cpa} onChange={(e) => setRoi({ ...roi, cpa: +e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs">CPA objetivo (COP)</label>
                    <Input type="number" value={roi.targetCpa} onChange={(e) => setRoi({ ...roi, targetCpa: +e.target.value })} />
                  </div>
                </div>
                <div className="rounded-xl border p-4 bg-white">
                  <p className="text-sm opacity-80">Ventas extra (estimadas)*</p>
                  <p className="text-3xl font-bold">{savings.toLocaleString('es-CO')} órdenes/mes</p>
                  <p className="text-xs opacity-60">*Ejemplo ilustrativo. Ajustamos el modelo a tus datos reales.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
