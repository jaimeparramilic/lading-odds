import React from 'react';
import { Section } from './Section';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { Pill } from './Pill';

export default function Contact() {
  return (
    <Section id="contact" className="py-12">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Conversemos</h2>
          <p className="mt-2 opacity-80 max-w-prose">
            Cuéntanos de tu negocio y armamos un diagnóstico gratuito de 20 minutos. Te proponemos el plan con mayor impacto de corto plazo.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
            <Pill><Phone className="h-3.5 w-3.5 mr-1" /> WhatsApp: +57 000 000 0000</Pill>
            <Pill><Mail className="h-3.5 w-3.5 mr-1" /> hola@odds.la</Pill>
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
                <option>400k - 2M COP</option>
                <option>2M - 10M COP</option>
                <option>10M+ COP</option>
              </select>
              <Textarea placeholder="Cuéntanos brevemente tu objetivo principal" rows={4} />
              <Button type="submit" className="gap-2">
                Enviar <MessageSquare className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
