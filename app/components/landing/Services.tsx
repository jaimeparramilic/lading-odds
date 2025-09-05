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
        
        {/* Auditoría */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" /> Auditoría & Medición
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <CheckItem>Revisamos tus campañas y tienda en menos de 72h</CheckItem>
            <CheckItem>Detectamos fugas de inversión y audiencias clave</CheckItem>
            <CheckItem>Validamos que tus píxeles y eventos estén bien configurados</CheckItem>
            <CheckItem>Entregamos un reporte claro con acciones concretas</CheckItem>
          </CardContent>
        </Card>

        {/* Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" /> Setup & Implementación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <CheckItem>Configuramos píxeles, UTMs y apps sin enredos técnicos</CheckItem>
            <CheckItem>Montamos campañas en Meta, Google, TikTok y LinkedIn</CheckItem>
            <CheckItem>Integramos tu tienda (Shopify, Woo, VTEX, Tiendanube)</CheckItem>
            <CheckItem>Creamos anuncios listos para convertir en ventas</CheckItem>
          </CardContent>
        </Card>

        {/* Operación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5" /> Operación & Optimización
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <CheckItem>Optimizamos tus campañas cada semana</CheckItem>
            <CheckItem>Hacemos pruebas A/B para mejorar resultados</CheckItem>
            <CheckItem>Reportamos ventas y métricas en tableros simples</CheckItem>
            <CheckItem>Te acompañamos como equipo experto sin contratar más personal</CheckItem>
          </CardContent>
        </Card>

      </div>
    </Section>
  );
}
