import React from 'react';
import { Section } from './Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, LineChart, Workflow } from 'lucide-react';

export default function Process() {
  return (
    <Section id="process" className="py-12">
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5" /> Diagnóstico express
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm opacity-90">
            Revisamos campañas, tiendas y audiencias en 72h para detectar errores críticos y oportunidades.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" /> Setup & implementación
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm opacity-90">
            Ajustamos todo lo técnico: píxeles, apps, UTMs, embudos y creatividades.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5" /> Optimización mensual
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm opacity-90">
            Pruebas y mejoras semanales con reportes visuales y decisiones basadas en datos.
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
