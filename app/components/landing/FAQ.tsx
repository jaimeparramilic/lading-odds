import React from 'react';
import { Section } from './Section';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

export default function FAQ() {
  return (
    <Section id="faq" className="py-12">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight">Preguntas frecuentes</h2>
        <div className="mt-6 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>¿Cuál es el presupuesto mínimo recomendado?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm opacity-90">
              Trabajamos muy bien con marcas que invierten desde 400.000 COP/mes en pauta. También tenemos sprints para quienes recién empiezan.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>¿Qué herramientas usan?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm opacity-90">
              GA4, Google Ads, Meta, TikTok, LinkedIn, Looker Studio y automatizaciones. Para ecommerce: Shopify, Woo, VTEX, Tiendanube.
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
  );
}
