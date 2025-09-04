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
  const [roi, setRoi] = useState({ spend: 100, cpa: 10, targetCpa: 5 });

  const { totalSales, extraSales } = useMemo(() => {
    const { spend, cpa, targetCpa } = roi;
    if (!spend || !cpa || !targetCpa) return { totalSales: 0, extraSales: 0 };

    const conv = spend / cpa;
    const convTarget = spend / targetCpa;
    const gain = convTarget - conv;

    return {
      totalSales: Math.max(0, Math.round(convTarget)),
      extraSales: Math.max(0, Math.round(gain)),
    };
  }, [roi]);

  return (
    <Section className="pt-8 pb-8">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        
        {/* Bloque izquierdo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          // Márgenes negativos más fuertes para alinear con la tarjeta
          className="text-center flex flex-col items-center self-start -mt-4 md:-mt-6 lg:-mt-8"
        >
          {/* Logo + pill en la misma fila */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <img
              src="/logos/odds.png"
              alt="ODDS logo"
              className="h-20 w-auto lg:h-40"
            />
            <Pill>Servicios boutique de marketing digital</Pill>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-xl">
            Pauta que vende con{' '}
            <span className="underline decoration-4 decoration-black underline-offset-4">
              estructura y resultados
            </span>.
          </h1>

          <p className="mt-4 text-lg opacity-90 max-w-prose">
            Ayudamos a PyMEs y emprendedores que invierten en publicidad digital pero no logran que funcione.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
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

        {/* Bloque derecho (calculadora) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="self-start"
        >
          <Card className="ring-1 ring-black/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" /> Mini-proyección
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs">Pauta mensual (USD)</label>
                  <Input
                    type="number"
                    value={roi.spend}
                    onChange={(e) => setRoi({ ...roi, spend: +e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs">CPA actual (USD)</label>
                  <Input
                    type="number"
                    value={roi.cpa}
                    onChange={(e) => setRoi({ ...roi, cpa: +e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs">CPA objetivo (USD)</label>
                  <Input
                    type="number"
                    value={roi.targetCpa}
                    onChange={(e) => setRoi({ ...roi, targetCpa: +e.target.value })}
                  />
                </div>
              </div>

              {/* Ventas totales y adicionales en la misma fila */}
              <div className="rounded-xl border p-4 bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Ventas totales (estimadas)*</p>
                    <p className="text-2xl font-bold">
                      {totalSales.toLocaleString('en-US')} órdenes/mes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-80">Ventas adicionales*</p>
                    <p className="text-2xl font-bold text-green-600">
                      +{extraSales.toLocaleString('en-US')} órdenes/mes
                    </p>
                  </div>
                </div>
                <p className="text-xs opacity-60 mt-2">*Ejemplo ilustrativo.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}
