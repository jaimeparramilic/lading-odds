'use client';

import React from 'react';
import { Section } from './Section';
import { Pill } from './Pill';
import { Mail, MessageSquare, User, Building2, Globe, Send, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <Section id="contact" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Elementos de fondo para profundidad (Efecto 'Glow') */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* COLUMNA IZQUIERDA (5 columnas): El Pitch de venta */}
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
              Analizaremos su huella digital antes de la primera llamada. Llegaremos con datos duros y oportunidades de optimización, no con presentaciones genéricas.
            </p>

            {/* Lista de beneficios pequeña para reforzar confianza */}
            <div className="space-y-3 mb-10 border-l-2 border-slate-800 pl-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                <span className="text-slate-300 text-sm">Auditoría técnica preliminar incluida</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                <span className="text-slate-300 text-sm">Respuesta en menos de 24h hábiles</span>
              </div>
            </div>

            {/* Email Link (Más sutil y elegante) */}
            <div className="mt-auto">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                O escriba directamente a:
              </p>
              <a 
                href="mailto:contacto@marketinagents-odds.com" 
                className="group flex items-center gap-3 text-white hover:text-indigo-400 transition-colors"
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

          {/* COLUMNA DERECHA (7 columnas): El Formulario (Card Flotante) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl shadow-black/20 relative overflow-hidden">
               {/* Decoración superior sutil */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Solicitar Propuesta
              </h3>
              <p className="text-slate-500 text-sm mb-8">
                Complete el formulario para calificar a una sesión estratégica.
              </p>

              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Nombre */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Nombre completo
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Juan Pérez"
                        className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Empresa */}
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Empresa
                    </label>
                    <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Su Empresa SAS"
                        className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Correo corporativo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="juan@suempresa.com"
                      className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

                {/* Website */}
                <div className="space-y-1.5">
                  <label htmlFor="website" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Sitio Web / URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Globe className="w-4 h-4" />
                    </div>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://www.suempresa.com"
                      className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Mensaje */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Desafío actual
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Ej: Necesitamos mejorar el ROAS en Facebook..."
                    className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400 resize-none"
                    required
                  />
                </div>

                {/* Botón Submit - Full Width y Prominente */}
                <button
                  type="submit"
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-indigo-200 hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
                >
                  Enviar Solicitud <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[10px] text-slate-400">
                  Sus datos están protegidos bajo NDA.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}