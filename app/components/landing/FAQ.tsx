'use client';

import React, { useState } from 'react';
import { Section } from './Section';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { ChevronDown } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

const faqs: FAQItem[] = [
  { question: 'What is the minimum ad spend capacity?', answer: <>Our multi-agent platform is engineered for brands investing <strong>from USD 400/month</strong> in digital media. We also support automated audit deployments for teams validating our <strong>algorithmic media buying</strong> engine before scaling.</> },
  { question: 'Is there a minimum contract or lock-in period?', answer: <>No long-term lock-ins. You can start with a <strong>4–5 week AI-driven deployment sprint</strong> or run on a monthly SaaS subscription. Validate autonomous performance before scaling across all channels.</> },
  { question: 'What is included in the platform subscription?', answer: <>Your subscription covers full-cycle multi-agent orchestration: receipt-level data ingestion, strategy generation, dynamic creative pipelines, <strong>algorithmic media buying</strong>, and real-time telemetry. Media spend (<strong>Google, Meta, TikTok</strong>) is billed directly by each ad network with zero hidden markups.</> },
  { question: 'How fast is the AI-driven deployment?', answer: <>Automated account diagnostics complete within <strong>72 hours</strong>. Autonomous media plans and campaign pipelines go live in under a week, with <strong>24/7 algorithmic optimization</strong> compounding returns from day one.</> },
  { question: 'Do I need an internal marketing or data science team?', answer: <>No. Our <strong>autonomous multi-agent platform</strong> replaces the entire traditional media and creative agency cycle—zero extra headcount required. You focus on unit economics while our agents execute strategy, creatives, and bidding.</> },
  { question: 'What tech stack and integrations do you use?', answer: <><strong>Native API integrations with Shopify, Meta, Google Ads, GA4, and Advanced LLMs (Claude/OpenAI).</strong> Powered by <strong>Python</strong>, <strong>Snowflake</strong>, and enterprise <strong>Cloud Infrastructure</strong>, plus seamless connectors for <strong>WooCommerce</strong>, <strong>VTEX</strong>, and <strong>Tiendanube</strong>.</> },
  { question: 'Can we start with Data Ingestion & Audit only?', answer: <>Yes. Our <strong>Data Ingestion & Audit</strong> module connects to your ad accounts and receipt-level sales data to deliver an LLM-driven profitability report and actionable media plan before activating full autonomous execution.</> },
];

function FAQItemComponent({ question, answer }: FAQItem) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="overflow-hidden transition-shadow">
      <CardHeader
        className="cursor-pointer flex flex-row items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <CardTitle className="text-base md:text-lg font-medium">{question}</CardTitle>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </CardHeader>
      <div
        className={`transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <CardContent className="text-sm opacity-90">{answer}</CardContent>
      </div>
    </Card>
  );
}

export default function FAQ() {
  return (
    <Section id="faq" className="py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight">Preguntas frecuentes</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {faqs.map((f, i) => (
            <FAQItemComponent key={i} {...f} />
          ))}
        </div>
      </div>
    </Section>
  );
}