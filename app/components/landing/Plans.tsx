import React from 'react';
import { Section } from './Section';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Check } from 'lucide-react';
import { Pill } from './Pill';

const SHOW_PRICES = true;

type Plan = {
  name: string;
  tagline: string;
  price?: string;
  priceNote?: string;
  badge?: string;
  featured?: boolean;
  features: string[];
};

const planTiers: Plan[] = [
  {
    name: 'Base',
    tagline: 'Empieza con control y método',
    price: 'Desde USD 100 (único)',
    priceNote: 'Incluye auditoría y setup inicial',
    badge: 'Sprint 4–5 semanas',
    features: [
      'Revisamos tus cuentas y sitio web para detectar fugas de inversión',
      'Configuramos GA4, píxeles y UTMs para medir lo que importa',
      'Dejamos campañas listas en Meta y Google para arrancar',
      'Entregamos 2 creatividades por canal listas para correr',
      'Integramos la medición básica de tu sitio web y tienda online',
      'Dashboard simple con próximos pasos claros',
    ],
  },
  {
    name: 'Growth',
    tagline: 'Escala con automatización + IA',
    price: 'USD 800–1,500 / mes',
    priceNote: 'Depende de canales y presupuesto',
    badge: 'Recomendado',
    featured: true,
    features: [
      'Optimizamos semanalmente tus campañas en Meta, Google y TikTok',
      'Probamos anuncios y landings para mejorar conversión real',
      'Activamos email marketing y CRM para retener clientes',
      'Integramos tu tienda Shopify, Woo o VTEX para seguimiento de ventas',
      'Reportes ejecutivos en Looker Studio: ventas y rentabilidad, no solo clics',
      'Automatizamos procesos con UTMs y flujos simples para ahorrar tiempo',
    ],
  },
  {
    name: 'Pro',
    tagline: 'Operación continua con ciencia de datos',
    price: 'USD 2,000–5,000 / mes',
    priceNote: 'Ideal para catálogos y multicanal avanzados',
    badge: 'Equipos en co-operación',
    features: [
      'Diseñamos estrategia multicanal con Google, Meta y LinkedIn',
      'Gestionamos catálogos Shopping y feeds avanzados para escalar productos',
      'Segmentamos audiencias con datos propios + 3rd party',
      'Medimos el impacto real con modelos de atribución y lift tests',
      'Automatizamos reportes y QA continuo con Zapier y APIs',
      'Soporte directo a nivel C-Level con visión de negocio',
    ],
  },
];

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
          Modular. Flexible. Accesible. Elige el plan que mejor acompaña tu etapa de negocio.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {planTiers.map((p) => (
          <Card key={p.name} className={`flex flex-col ${p.featured ? 'border-2' : ''}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{p.name}</CardTitle>
                {p.badge && <Pill>{p.badge}</Pill>}
              </div>
              <p className="text-sm opacity-70">{p.tagline}</p>

              {SHOW_PRICES ? (
                <>
                  <div className="pt-4 text-3xl font-bold">{p.price}</div>
                  {p.priceNote && (
                    <div className="text-xs opacity-70 pt-1">{p.priceNote}</div>
                  )}
                </>
              ) : (
                <div className="pt-4 text-3xl font-bold">A demanda</div>
              )}
            </CardHeader>

            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm">
                {p.features.map((f) => (
                  <CheckItem key={f}>{f}</CheckItem>
                ))}
              </ul>

              <div className="mt-6">
                <a href="#contact">
                  <Button className="w-full">
                    {p.name === 'Base' ? 'Solicitar diagnóstico' : 'Solicitar propuesta'}
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
