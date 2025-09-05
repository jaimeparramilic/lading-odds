'use client';

import React, { useState } from 'react';
import { Section } from './Section';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { Pill } from './Pill';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);

    const fd = new FormData(e.currentTarget);

    // Honeypot (anti-spam)
    if ((fd.get('website') as string)?.trim()) {
      setLoading(false);
      setOk(false);
      return;
    }

    const payload = {
      kind: 'lead', // 👈 nuevo, para que el router sepa que es un lead
      name: (fd.get('name') as string)?.trim(),
      email: (fd.get('email') as string)?.trim(),
      company: (fd.get('company') as string)?.trim(),
      budget: fd.get('budget'),
      goal: (fd.get('goal') as string)?.trim(),
      source: 'odds.la/contact',
    };


    if (!payload.name || !payload.email || !payload.goal || !payload.budget) {
      setLoading(false);
      setOk(false);
      return;
    }

    try {
      // ⬇️ POST al mismo folder (route en app/components/landing/route.ts)
      const res = await fetch('/components/landing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setOk(res.ok);
      if (res.ok) (e.target as HTMLFormElement).reset();
    } catch {
      setOk(false);
    } finally {
      setLoading(false);
    }
  }

  const whatsappHref =
    'https://wa.me/573134587775?text=Hola%20ODDS,%20quiero%20un%20diagn%C3%B3stico%20gratuito%20de%2020%20min.%20Mi%20negocio%20es%3A%20';

  return (
    <Section id="contact" className="py-12">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Texto + canales */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Conversemos</h2>
          <p className="mt-2 opacity-80 max-w-prose">
            Agenda un <strong>diagnóstico gratuito de 20 minutos</strong>. Te mostramos
            dónde se pierde tu inversión y proponemos el plan de mayor impacto a corto plazo.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <Pill><Phone className="h-3.5 w-3.5 mr-1" /> WhatsApp: +57&nbsp;313&nbsp;458&nbsp;7775</Pill>
            </a>
            <a href="mailto:jaimeparramilic@gmail.com">
              <Pill><Mail className="h-3.5 w-3.5 mr-1" /> jaimeparramilic@gmail.com</Pill>
            </a>
          </div>
        </div>

        {/* Formulario */}
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <form onSubmit={onSubmit} className="grid gap-3">
              {/* Honeypot (oculto) */}
              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

              <Input name="name" placeholder="Nombre" required autoComplete="name" />
              <Input type="email" name="email" placeholder="Email" required autoComplete="email" />
              <Input name="company" placeholder="Empresa / Tienda (opcional)" autoComplete="organization" />

              <select
                name="budget"
                className="border rounded-md px-3 py-2 text-sm"
                required
                defaultValue=""
              >
                <option value="" disabled>Inversión mensual en pauta (USD)</option>
                <option value="400-800">USD 400–800</option>
                <option value="800-1500">USD 800–1,500</option>
                <option value="1500-3000">USD 1,500–3,000</option>
                <option value="3000+">USD 3,000+</option>
              </select>

              <Textarea
                name="goal"
                placeholder="Cuéntanos tu objetivo principal (ej. más ventas, bajar CPA, mejorar medición)"
                rows={4}
                required
              />

              <Button type="submit" className="gap-2" disabled={loading} aria-busy={loading}>
                {loading ? 'Enviando…' : 'Enviar'} <MessageSquare className="h-4 w-4" />
              </Button>

              {/* Estados */}
              {ok === true && (
                <p className="text-sm text-green-600">¡Gracias! Te contactaremos en menos de 24&nbsp;h.</p>
              )}
              {ok === false && (
                <p className="text-sm text-red-600">
                  Ocurrió un problema al enviar. Escríbenos por WhatsApp o email mientras lo resolvemos.
                </p>
              )}

              <p className="text-xs opacity-60">
                Al enviar aceptas ser contactado por email o WhatsApp. Cuidamos tus datos; no hacemos spam.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

