'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Sparkles, ChevronRight, ArrowRight } from 'lucide-react';
import { Section } from './Section';
import { Pill } from './Pill';

export default function Hero() {
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
    <Section className="pt-16 pb-8">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Pill>Servicios boutique de marketing digital</Pill>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Pauta que vende con{' '}
            <span className="underline decoration-4 decoration-black underline-offset-4">estructura y resultados</span>.
          </h1>
          <p className="mt-4 text-lg opacity-90 max-w-prose">
            Ayudamos a PyMEs y emprendedores que invierten en publicidad digital pero no logran que funcione.
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
                  <Input
                    type="number"
                    value={roi.spend}
                    onChange={(e) => setRoi({ ...roi, spend: +e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs">CPA actual (COP)</label>
                  <Input
                    type="number"
                    value={roi.cpa}
                    onChange={(e) => setRoi({ ...roi, cpa: +e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs">CPA objetivo (COP)</label>
                  <Input
                    type="number"
                    value={roi.targetCpa}
                    onChange={(e) => setRoi({ ...roi, targetCpa: +e.target.value })}
                  />
                </div>
              </div>
              <div className="rounded-xl border p-4 bg-white">
                <p className="text-sm opacity-80">Ventas extra (estimadas)*</p>
                <p className="text-3xl font-bold">{savings.toLocaleString('es-CO')} órdenes/mes</p>
                <p className="text-xs opacity-60">*Ejemplo ilustrativo.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}
