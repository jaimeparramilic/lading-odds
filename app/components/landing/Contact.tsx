'use client';

import React, { useState } from 'react';
import { Section } from './Section';
import { Mail, MessageSquare, User, Building2, Globe, ArrowRight, CheckCircle2, Loader2, AlertCircle, DollarSign } from 'lucide-react';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);

    const fd = new FormData(e.currentTarget);

    // Honeypot
    if ((fd.get('website') as string)?.trim()) {
      setLoading(false);
      setOk(false);
      return;
    }

    const payload = {
      kind: 'lead',
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

  return (
    <Section id="contact" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Elementos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA: Copy de Venta */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="inline-flex items-center w-fit rounded-full px-3 py-1 text-xs font-bold text-indigo-300 bg-indigo-900/50 border border-indigo-700/50 mb-6 uppercase tracking-wider">
              <MessageSquare className="w-3 h-3 mr-2" />
              Contacto Directo
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Deje de adivinar.<br />
              Empiece a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">medir</span>.
            </h2>
            
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Agenda un diagnóstico gratuito. Te mostramos dónde se pierde tu inversión y proponemos el plan de mayor impacto a corto plazo.
            </p>

            {/* Lista de beneficios (Reduje el margen inferior mb-8 para acercar el email) */}
            <div className="space-y-3 mb-8 border-l-2 border-slate-800 pl-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                <span className="text-slate-300 text-sm">Auditoría técnica preliminar incluida</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                <span className="text-slate-300 text-sm">Respuesta en menos de 24h hábiles</span>
              </div>
            </div>

            {/* Email Link (Eliminé mt-auto y pt-8 para quitar el espaciado forzado) */}
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                O escriba directamente a:
              </p>
              <a 
                href="mailto:contacto@marketinagents-odds.com" 
                className="group flex items-center gap-4 text-white hover:text-indigo-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium border-b border-transparent group-hover:border-indigo-400 transition-all">
                  contacto@marketinagents-odds.com
                </span>
              </a>
            </div>
          </div>

          {/* COLUMNA DERECHA: El Formulario */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl shadow-black/20 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>

              {ok === true ? (
                 <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Mensaje Recibido!</h3>
                  <p className="text-slate-600 max-w-sm mb-6 leading-relaxed">
                    Gracias por contactarnos. Analizaremos sus datos y le contactaremos en menos de 24 horas hábiles.
                  </p>
                  <button 
                    onClick={() => setOk(null)}
                    className="text-indigo-600 font-bold hover:text-indigo-800 text-sm underline underline-offset-4"
                  >
                    Volver al formulario
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Solicitar Propuesta
                  </h3>
                  <p className="text-slate-500 text-sm mb-8">
                    Complete el formulario para calificar a una sesión estratégica.
                  </p>

                  <form onSubmit={onSubmit} className="space-y-5">
                    
                    <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Nombre completo</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            name="name"
                            placeholder="Nombre"
                            required
                            autoComplete="name"
                            className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Empresa</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <input
                            name="company"
                            placeholder="Empresa (Opcional)"
                            autoComplete="organization"
                            className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Correo corporativo</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="juan@suempresa.com"
                          required
                          autoComplete="email"
                          className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Inversión mensual en pauta</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <DollarSign className="w-4 h-4" />
                        </div>
                        <select
                          name="budget"
                          required
                          defaultValue=""
                          className="w-full h-11 pl-10 pr-8 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Seleccione un rango (USD)</option>
                          <option value="400-800">USD 400 – 800</option>
                          <option value="800-1500">USD 800 – 1,500</option>
                          <option value="1500-3000">USD 1,500 – 3,000</option>
                          <option value="3000+">Más de USD 3,000</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Objetivo principal</label>
                      <textarea
                        name="goal"
                        rows={4}
                        placeholder="Ej: Necesitamos escalar ventas en e-commerce y mejorar el ROAS..."
                        required
                        className="w-full p-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-lg shadow-lg shadow-indigo-200 hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Procesando...
                        </>
                      ) : (
                        <>
                          Enviar Solicitud <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {ok === false && (
                       <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg flex items-center gap-2 border border-red-100 animate-in fade-in">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        Ocurrió un error al conectar. Por favor intente de nuevo o escriba directo al WhatsApp.
                       </div>
                    )}

                    <p className="text-center text-[10px] text-slate-400">
                      Al enviar acepta ser contactado. Sus datos están protegidos.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}