import React from 'react';
import { Section } from './Section';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Rocket, LineChart, Workflow } from 'lucide-react';

export default function Process() {
  return (
    <Section id="process" className="py-12">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Paso 1 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5" /> Diagnóstico express
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm opacity-90">
            En 72&nbsp;h auditamos campañas, sitio/tienda y datos (GA4, píxeles, UTMs).
            Entregamos un plan de 5 acciones priorizadas para recuperar ventas.
          </CardContent>
        </Card>

        {/* Paso 2 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" /> Setup & implementación
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm opacity-90">
            En 7&nbsp;días dejamos todo funcionando: medición correcta, UTMs consistentes
            y campañas en Meta/Google listas con creatividades aprobadas.
          </CardContent>
        </Card>

        {/* Paso 3 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5" /> Optimización mensual
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm opacity-90">
            Ajustes semanales para bajar CPA y subir ROAS. Reporte simple:
            qué cambiamos, qué funcionó y el siguiente paso.
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
