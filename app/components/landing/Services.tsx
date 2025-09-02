import React from 'react';
import { Section } from './Section';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { BarChart, Wrench, Workflow } from 'lucide-react';
import { Check } from 'lucide-react';

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <Check className="h-5 w-5 shrink-0" aria-hidden />
      <span className="opacity-90">{children}</span>
    </li>
  );
}

export default function Services() {
  return (
    <Section id="services" className="py-12">
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" /> Auditoría & Medición
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <CheckItem>Diagnóstico express de campañas y tiendas</CheckItem>
            <CheckItem>Análisis de audiencias y embudos</CheckItem>
            <CheckItem>Eventos y píxeles implementados en 72h</CheckItem>
            <CheckItem>Reporte claro con oportunidades reales</CheckItem>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" /> Setup & Implementación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <CheckItem>Configuración de píxeles, UTMs y apps</CheckItem>
            <CheckItem>Campañas en Meta, Google, TikTok y LinkedIn</CheckItem>
            <CheckItem>Integración con Shopify, Woo, VTEX, Tiendanube</CheckItem>
            <CheckItem>Creatividades listas para rendir</CheckItem>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5" /> Operación & Optimización
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <CheckItem>Optimización semanal y pruebas A/B</CheckItem>
            <CheckItem>Reportes visuales con foco en ventas</CheckItem>
            <CheckItem>Acompañamiento experto sin contratar equipo</CheckItem>
            <CheckItem>Backlog priorizado de mejoras</CheckItem>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
