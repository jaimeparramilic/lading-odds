'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TrendingUp, Calculator, ArrowRight, UserCheck } from 'lucide-react';
import { Section } from './Section';
import { Pill } from './Pill';

export default function Hero() {
  // --- Lógica de Negocio (Calculadora) ---
  const [roi, setRoi] = useState({ spend: 1000, cpa: 25, targetCpa: 15 });

  const { totalSales, extraSales } = useMemo(() => {
    const { spend, cpa, targetCpa } = roi;
    if (!spend || !cpa || !targetCpa) return { totalSales: 0, extraSales: 0 };

    const projectedSales = spend / targetCpa;
    const currentSales = spend / cpa;
    const gain = projectedSales - currentSales;
    
    return {
      totalSales: Math.floor(projectedSales),
      extraSales: Math.floor(gain),
    };
  }, [roi]);

  const scrollToCalculator = () => {
    const element = document.getElementById('profit-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-2', 'ring-indigo-900', 'transition-all', 'duration-500');
      setTimeout(() => element.classList.remove('ring-2', 'ring-indigo-900'), 1000);
    }
  };

  return (
    <Section className="bg-slate-50 pt-12 pb-20 md:pt-20 md:pb-32 border-b border-slate-200">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* --- COLUMNA IZQUIERDA (7/12) --- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
        >
          {/* HEADER: LOGO + PILL */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full justify-center lg:justify-start">
             {/* Logo Container */}
             <div className="relative h-12 md:h-16 flex-shrink-0 flex items-center">
                <img
                  src="/logos/odds.png"
                  alt="ODDS Logo"
                  className="h-full w-auto object-contain"
                  onError={(e) => {
                    // Fallback visual si falla la imagen
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                {/* Fallback Text Logo */}
                <span className="hidden text-3xl font-bold tracking-tighter text-slate-900">
                  ODDS<span className="text-indigo-600">.</span>
                </span>
             </div>
             
             {/* Pill (Badge) */}
             <Pill className="bg-white border-slate-200 shadow-sm text-slate-600 text-xs md:text-sm py-1.5 px-4">
                Tecnología de Grandes. Resultados Reales.
             </Pill>
          </div>

          {/* H1: COPY PRINCIPAL */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight max-w-4xl">
            ODDS. IA para humanos.{' '}
            <span className="block text-indigo-900 mt-2">
              Hacemos crecer tu negocio.
            </span>
          </h1>

          {/* P: COPY SECUNDARIO */}
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
            Su empresa no vive de "likes", vive de <strong className="text-slate-900 font-semibold">matemática financiera</strong>. 
            Deje de apostar en pauta y active un sistema de ventas predecible. Nosotros ponemos la IA para maximizar la eficiencia y los expertos (ex-Amazon) para asegurar el retorno de inversión.
          </p>

          {/* CTAs */}
          <div className="flex flex-col w-full sm:w-auto items-center lg:items-start gap-4 pt-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Botón Principal */}
              <Button 
                onClick={scrollToCalculator}
                className="h-14 px-8 text-base font-bold bg-indigo-950 hover:bg-indigo-900 text-white shadow-xl shadow-indigo-900/20 rounded-xl transition-all hover:-translate-y-0.5 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                Calcular mi Potencial
                <Calculator className="h-5 w-5 text-indigo-200" />
              </Button>

              {/* Botón Secundario */}
              <a href="#contact" className="w-full sm:w-auto">
                <Button 
                  variant="outline"
                  className="h-14 px-8 text-base font-bold bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400 hover:text-slate-900 rounded-xl transition-all w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  Hablar con un Estratega
                  <UserCheck className="h-5 w-5" />
                </Button>
              </a>
            </div>
            
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-2">
              <TrendingUp className="h-3.5 w-3.5" /> Proyección basada en datos reales a la derecha
            </p>
          </div>
        </motion.div>

        {/* --- COLUMNA DERECHA (5/12) - CALCULADORA --- */}
        <motion.div
          id="profit-calculator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 w-full max-w-md mx-auto lg:ml-auto"
        >
          <Card className="border border-slate-200 shadow-2xl shadow-slate-300/50 bg-white rounded-2xl overflow-hidden ring-1 ring-black/5">
            {/* Header Calculadora */}
            <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
              <CardTitle className="flex items-center gap-3 text-indigo-950 text-lg font-bold">
                <div className="p-2 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-indigo-700" />
                </div>
                Simulador de Impacto
              </CardTitle>
            </CardHeader>
            
            {/* Cuerpo Calculadora con Padding Correcto */}
            <CardContent className="p-6 md:p-8 space-y-8">
              {/* Inputs */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Inversión (USD)
                    </label>
                    <Input
                      type="number"
                      className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 font-medium text-slate-900 h-11 text-base rounded-lg transition-all"
                      value={roi.spend}
                      onChange={(e) => setRoi({ ...roi, spend: +e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      CPA Actual
                    </label>
                    <Input
                      type="number"
                      className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 font-medium text-slate-900 h-11 text-base rounded-lg transition-all"
                      value={roi.cpa}
                      onChange={(e) => setRoi({ ...roi, cpa: +e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                      CPA Optimizado (ODDS)
                    </label>
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full font-bold border border-indigo-100 uppercase tracking-wide">
                      Meta Estimada
                    </span>
                  </div>
                  <Input
                    type="number"
                    className="bg-indigo-50/50 border-indigo-200 text-indigo-900 font-bold focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 h-12 text-lg rounded-lg transition-all"
                    value={roi.targetCpa}
                    onChange={(e) => setRoi({ ...roi, targetCpa: +e.target.value })}
                  />
                </div>
              </div>

              {/* Panel de Resultados */}
              <div className="relative overflow-hidden rounded-xl bg-slate-900 text-white p-6 shadow-inner ring-1 ring-white/10">
                {/* Efecto de fondo */}
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

                <div className="relative z-10 flex items-end justify-between mb-6">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                      Ventas Proyectadas
                    </p>
                    <p className="text-4xl font-bold tracking-tight text-white leading-none">
                      {totalSales.toLocaleString('en-US')} 
                      <span className="text-base font-medium text-slate-500 ml-1.5">pedidos</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1.5 text-emerald-400 mb-1">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wide">Growth</span>
                    </div>
                    <p className="text-3xl font-bold text-emerald-400 tracking-tight leading-none">
                      +{extraSales.toLocaleString('en-US')}
                    </p>
                  </div>
                </div>

                {/* Barra de Progreso Simulada */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
                  <motion.div 
                    className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
                
                <p className="text-[10px] text-slate-400 text-center font-medium">
                  Resultados estimados manteniendo su presupuesto actual.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}