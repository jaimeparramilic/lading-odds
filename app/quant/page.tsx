import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Activity,
  ArrowRight,
  Cpu,
  GitBranch,
  Layers,
  Mail,
  Terminal,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill } from '../components/landing/Pill';
import { Section } from '../components/landing/Section';

export const metadata: Metadata = {
  title: 'ODDS Quant | L2 MEV, Liquidity Routing & Arbitrage Infrastructure',
  description:
    'Low-Latency MEV, Liquidity Routing & Atomic Arbitrage Infrastructure behind Optimal Dynamic Decision Systems S.A.S. Active on Arbitrum One and Base.',
  openGraph: {
    title: 'ODDS Quant | L2 MEV, Liquidity Routing & Arbitrage Infrastructure',
    description:
      'Low-Latency MEV, Liquidity Routing & Atomic Arbitrage Infrastructure behind Optimal Dynamic Decision Systems S.A.S. Active on Arbitrum One and Base.',
    type: 'website',
  },
};

const architecturePillars = [
  {
    code: '01 / Atomic Execution & MEV Layer',
    Icon: Cpu,
    accent: false,
    description:
      'Custom Solidity smart contracts engineered for deterministic, single-transaction MEV capture and atomic arbitrage. Utilizes flash loans and strict slippage guards with zero directional market exposure.',
  },
  {
    code: '02 / Off-Chain Predictive Routing',
    Icon: GitBranch,
    accent: true,
    description:
      'Low-latency execution engine engineered for real-time liquidity graph traversal, multi-hop pathfinding, and dynamic gas optimization across major Layer-2 decentralized exchanges.',
  },
  {
    code: '03 / Real-Time State & Telemetry',
    Icon: Activity,
    accent: false,
    description:
      'Low-latency RPC indexing pipeline leveraging WebSocket event subscriptions, pre-execution eth_call simulations, and granular block-level transaction receipt analytics.',
  },
];

const roadmapPhases = [
  {
    phase: 'Phase 01 — Core L2 Execution',
    status: '[LIVE]',
    statusStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description:
      'Single-chain atomic arbitrage, flash loan settlement, and real-time pool indexing active on Arbitrum One and Base.',
  },
  {
    phase: 'Phase 02 — Multi-Exchange Smart Routing',
    status: '[IN PROGRESS]',
    statusStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    description:
      'Unified liquidity aggregation and multi-hop swap optimization across concentrated liquidity AMMs, orderbook DEXs, and RFQ pools.',
  },
  {
    phase: 'Phase 03 — Multi-L2 Expansion & Cross-Venue Execution',
    status: '[NEXT]',
    statusStyle: 'bg-slate-100 text-slate-700 border-slate-200',
    description:
      'Expanding low-latency execution pipelines to additional EVM Layer-2 networks (Optimism, Polygon) with automated cross-venue inventory rebalancing.',
  },
  {
    phase: 'Phase 04 — Algorithmic Treasury & Systematic Asset Allocation',
    status: '[PLANNED]',
    statusStyle: 'bg-slate-100 text-slate-600 border-slate-200',
    description:
      'Automated portfolio vaults deploying MEV-generated yield into algorithmic token accumulation, concentrated liquidity provisioning (LP), and systematic on-chain asset management alongside enterprise AI R&D funding.',
  },
];

export default function QuantPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-neutral-50 text-neutral-900">
      {/* Header: Same repo header structure, minimal ODDS // QUANT branding only */}
      <header className="bg-slate-50 border-b border-slate-200">
        <Section className="py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative h-12 md:h-14 flex-shrink-0 flex items-center">
                <Image
                  src="/logos/odds.png"
                  alt="ODDS // QUANT"
                  width={56}
                  height={56}
                  className="h-full w-auto object-contain rounded-lg"
                  priority
                />
              </div>
              <Pill className="bg-white border-slate-200 shadow-sm text-slate-700 font-semibold tracking-wider text-xs md:text-sm py-1.5 px-4">
                ODDS // QUANT
              </Pill>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <Terminal className="w-4 h-4 text-indigo-700" />
              <span>Quantitative Infrastructure</span>
            </div>
          </div>
        </Section>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <Section className="bg-slate-50 pt-14 pb-20 md:pt-24 md:pb-28 border-b border-slate-200">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
            <Pill className="bg-white border-slate-200 shadow-sm text-slate-600 text-xs md:text-sm py-1.5 px-4 font-semibold tracking-wider">
              ARBITRUM ONE • BASE • EVM MEV INFRASTRUCTURE
            </Pill>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
              Low-Latency MEV, Liquidity Routing &amp; Atomic Arbitrage Infrastructure
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl font-normal">
              The proprietary quantitative capital engine behind Optimal Dynamic Decision Systems S.A.S. Engineered to capture cross-DEX inefficiencies and non-toxic MEV on Layer-2 networks, generating sustainable yield to compound on-chain treasury assets and self-fund our long-term AI &amp; Martech R&amp;D.
            </p>

            <div className="pt-2">
              <a
                href="mailto:jaime.parra@oddsbots.online?subject=Infrastructure%20Inquiries%20%E2%80%94%20ODDS%20Quant"
                className="h-14 px-8 text-base font-bold bg-indigo-950 hover:bg-indigo-900 text-white shadow-xl shadow-indigo-900/20 rounded-xl transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2.5 no-underline hover:no-underline"
              >
                <Mail className="h-5 w-5 text-indigo-200" />
                Infrastructure Inquiries
                <ArrowRight className="h-4 w-4 text-indigo-200" />
              </a>
            </div>
          </div>
        </Section>

        {/* System Architecture (3-Card Grid matching Services.tsx) */}
        <Section id="architecture" className="py-16 md:py-24 bg-white border-b border-slate-200">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              System Architecture
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-600">
              Deterministic on-chain execution paired with low-latency off-chain state modeling.
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {architecturePillars.map((pillar) => {
              const Icon = pillar.Icon;
              return (
                <Card
                  key={pillar.code}
                  className="border border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col"
                >
                  {pillar.accent && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />
                  )}

                  <CardHeader className="p-6 md:p-8 border-b border-slate-100">
                    <CardTitle className="flex items-start gap-3 text-lg md:text-xl font-bold text-indigo-950 leading-snug">
                      <div className="p-2.5 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="h-6 w-6 text-indigo-700" />
                      </div>
                      <span>{pillar.code}</span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-6 md:p-8 flex-1">
                    <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Section>

        {/* Infrastructure Roadmap (Clean structured phase cards matching repo Card style) */}
        <Section id="roadmap" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200 bg-indigo-50 mb-4">
              <Layers className="h-3.5 w-3.5 mr-1.5 text-indigo-500" />
              Execution Milestones
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Infrastructure Roadmap
            </h2>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {roadmapPhases.map((item) => (
              <Card
                key={item.phase}
                className="border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <CardHeader className="p-6 border-b border-slate-100">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wider border ${item.statusStyle}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <CardTitle className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                    {item.phase}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6 flex-1">
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* Strategic Thesis (Highlighted Dark Container matching Contact/Agents style) */}
        <Section id="thesis" className="py-20 md:py-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="bg-indigo-950/60 border border-indigo-800/60 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

              <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-indigo-300 bg-indigo-900/50 border border-indigo-700/50 mb-5 uppercase tracking-wider">
                Strategic Thesis
              </div>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 leading-tight">
                Self-Sustaining Capital Architecture
              </h2>

              <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-8">
                Rather than relying on dilutive venture capital to fund enterprise software development, ODDS operates a dual-engine model: our Layer-2 MEV and quantitative infrastructure converts market dislocations into non-directional yield—compounding strategic on-chain token allocations while directly backing the engineering and scaling of our autonomous AI marketing platform.
              </p>

              <a
                href="mailto:jaime.parra@oddsbots.online?subject=Infrastructure%20Inquiries%20%E2%80%94%20ODDS%20Quant"
                className="inline-flex items-center justify-center text-sm font-bold text-indigo-950 bg-indigo-100 hover:bg-white px-6 py-3 rounded-lg transition-colors duration-300 ring-1 ring-indigo-200 hover:ring-white no-underline hover:no-underline gap-2"
              >
                Infrastructure Inquiries
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Section>
      </main>

      {/* Footer matching repo base footer */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm">
          <p className="text-slate-400">
            &copy; 2026 Optimal Dynamic Decision Systems S.A.S. (ODDS)
          </p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300 tracking-wide">
              Arbitrum One · Base
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
