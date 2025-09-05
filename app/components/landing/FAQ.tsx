'use client';

import React, { useState } from 'react';
import { Section } from './Section';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { ChevronDown } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

const faqs: FAQItem[] = [
  { question: '¿Cuál es el presupuesto mínimo recomendado?', answer: <>Trabajamos bien con marcas que invierten <strong>desde USD 400/mes</strong> en pauta digital. También ofrecemos sprints únicos para quienes recién comienzan y quieren probar antes de escalar.</> },
  { question: '¿Hay contrato mínimo o permanencia?', answer: <>No exigimos contratos largos. Puedes empezar con un <strong>sprint de 4–5 semanas</strong> o trabajar mes a mes. Así reduces riesgo y ves valor antes de comprometerte.</> },
  { question: '¿Qué está incluido en la tarifa?', answer: <>Nuestra tarifa cubre estrategia, setup, optimización y reportes. La inversión en medios (<strong>Google, Meta, TikTok</strong>, etc.) se paga directo a cada plataforma, sin comisiones ocultas.</> },
  { question: '¿En cuánto tiempo veo resultados?', answer: <>El diagnóstico está listo en <strong>72 horas</strong>. Las campañas arrancan en menos de una semana y desde la primera optimización semanal puedes empezar a notar mejoras en ventas y retorno.</> },
  { question: '¿Necesito un equipo interno de marketing?', answer: <>No. Nos integramos como tu <strong>equipo experto</strong>, sin que tengas que contratar más personal. Tú te enfocas en el negocio, nosotros en que la pauta venda.</> },
  { question: '¿Qué herramientas usan?', answer: <>Trabajamos con <strong>GA4</strong>, <strong>Google Ads</strong>, <strong>Meta</strong>, <strong>TikTok</strong>, <strong>LinkedIn</strong> y <strong>Looker Studio</strong>. Para ecommerce: <strong>Shopify</strong>, <strong>WooCommerce</strong>, <strong>VTEX</strong> y <strong>Tiendanube</strong>. Usamos UTMs y píxeles para medir resultados en tu sitio web con precisión.</> },
  { question: '¿Pueden trabajar solo auditoría?', answer: <>Sí. La <strong>auditoría express</strong> entrega un plan de acción con quick wins y recomendaciones que puedes ejecutar con tu equipo o continuar con nosotros.</> },
];

function FAQItemComponent({ question, answer }: FAQItem) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="overflow-hidden transition-shadow">
      <CardHeader
        className="cursor-pointer flex flex-row items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <CardTitle className="text-base md:text-lg font-medium">{question}</CardTitle>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </CardHeader>
      <div
        className={`transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <CardContent className="text-sm opacity-90">{answer}</CardContent>
      </div>
    </Card>
  );
}

export default function FAQ() {
  return (
    <Section id="faq" className="py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight">Preguntas frecuentes</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {faqs.map((f, i) => (
            <FAQItemComponent key={i} {...f} />
          ))}
        </div>
      </div>
    </Section>
  );
}