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
  Mail,
  Phone,
  LineChart,
  Wrench,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

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

      {/* Hero */}
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
                  Agenda diagnóstico gratuito <ChevronRight className="h-4 w-4" />
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

      {/* Credenciales */}
      <Section id="credentials" className="py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">Experiencia que respalda</h2>
          <p className="mt-3 opacity-80">
            Más de 13 años liderando audiencias, performance y analítica para marcas globales en LATAM, EE.UU. y Canadá.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center opacity-80">
          <img src="/logos/amazon.svg" alt="Amazon" className="h-10" />
          <img src="/logos/bmw.svg" alt="BMW" className="h-10" />
          <img src="/logos/cvs.svg" alt="CVS" className="h-10" />
          <img src="/logos/nintendo.svg" alt="Nintendo" className="h-10" />
        </div>
        <div className="mt-10 bg-neutral-50 border rounded-xl p-6 shadow-sm">
          <p className="italic text-neutral-700">
            “Durante la pandemia, asesoramos a Jorge Enrique Abello en la creación e implementación de un modelo
            de monetización digital, combinando datos, estrategia y creatividad.”
          </p>
        </div>
      </Section>

      {/* Servicios */}
      <Section id="services" className="py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" /> Auditoría & Medición
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <CheckItem>Revisión de cuentas (Google, Meta, TikTok, LinkedIn)</CheckItem>
              <CheckItem>GA4, píxeles y eventos: implementación simple</CheckItem>
              <CheckItem>Mapa de embudo y oportunidades</CheckItem>
              <CheckItem>Dashboard en Looker Studio</CheckItem>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" /> Setup & Implementación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <CheckItem>Estructuras simples por objetivo</CheckItem>
              <CheckItem>Creatividades (estáticas y video) + copys</CheckItem>
              <CheckItem>Landing pages ligeras de alta conversión</CheckItem>
              <CheckItem>Integraciones con Shopify, Woo, VTEX, Tiendanube</CheckItem>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-5 w-5" /> Operación & Optimización
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <CheckItem>Optimización semanal con metodología clara</CheckItem>
              <CheckItem>Testing de anuncios, audiencias y landings</CheckItem>
              <CheckItem>Email & CRM: flows esenciales</CheckItem>
              <CheckItem>Reporte ejecutivo y backlog priorizado</CheckItem>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Planes */}
      <Section id="plans" className="py-12">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight">Planes y paquetes</h2>
          <p className="mt-2 opacity-80">Selecciona el nivel que mejor se ajusta a tu etapa. Podemos adaptar un paquete a la medida.</p>
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

      {/* Proceso */}
      <Section id="process" className="py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" /> 1) Discovery
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm opacity-90">
              Brief + acceso a cuentas. Auditoría rápida y mapa de oportunidades.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" /> 2) Plan & Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm opacity-90">
              Plan de medios simple, estructura de campañas, creatividades y medición.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-5 w-5" /> 3) Lanzar & Optimizar
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm opacity-90">
              Mejoras semanales, reportes claros y backlog priorizado por impacto.
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="py-12">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight">Preguntas frecuentes</h2>
          <div className="mt-6 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>¿Cuál es el presupuesto mínimo recomendado?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm opacity-90">
                Trabajamos muy bien con marcas que invierten desde $400.000 COP/mes en pauta. Si estás empezando,
                podemos hacer un sprint Base para dejar todo listo y crecer.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>¿Qué herramientas usan?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm opacity-90">
                GA4, Google Ads, Meta Ads, TikTok, LinkedIn, Looker Studio, y conectores/automatizaciones (Zapier/API).
                Para ecommerce, Shopify/Woo/VTEX/Tiendanube.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>¿Pueden trabajar solo auditoría?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm opacity-90">
                Sí. La auditoría deja un plan de acción claro que puedes ejecutar con tu equipo o con nosotros.
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Sobre mí */}
      <Section id="about" className="py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight">Sobre mí</h2>
          <p className="mt-3 opacity-80">
            Soy Jaime Parra Milic, con más de 13 años liderando equipos de data y marketing digital en agencias globales
            como Havas Media e IPG. He creado y escalado productos de audiencias y optimización en EE.UU., LATAM y Canadá,
            y hoy aplico esa metodología para ayudar a empresas a crecer con marketing basado en datos y resultados reales.
          </p>
        </div>
      </Section>

      {/* Contacto */}
      <Section id="contact" className="py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Conversemos</h2>
            <p className="mt-2 opacity-80 max-w-prose">
              Cuéntanos de tu negocio y armamos un diagnóstico gratuito de 20 minutos. Te proponemos el plan con mayor
              impacto de corto plazo.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
              <Pill>
                <Phone className="h-3.5 w-3.5 mr-1" /> WhatsApp: +57 000 000 0000
              </Pill>
              <Pill>
                <Mail className="h-3.5 w-3.5 mr-1" /> hola@odds.la
              </Pill>
            </div>
          </div>
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <form action="mailto:hola@odds.la" method="post" encType="text/plain" className="grid gap-3">
                <Input placeholder="Nombre" required />
                <Input type="email" placeholder="Email" required />
                <Input placeholder="Empresa / Tienda" />
                <select className="border rounded-md px-3 py-2 text-sm">
                  <option>Inversión mensual en pauta</option>
                  <option>400k – 2M COP</option>
                  <option>2M – 10M COP</option>
                  <option>10M+ COP</option>
                </select>
                <Textarea placeholder="Cuéntanos brevemente tu objetivo principal" rows={4} />
                <Button type="submit
                <Textarea placeholder="Cuéntanos brevemente tu objetivo principal" rows={4} />
                <Button type="submit" className="gap-2">
                  Enviar <MessageSquare className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}
