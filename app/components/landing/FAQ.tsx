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
  { question: 'What is the minimum ad spend capacity?', answer: <>We work with brands investing upwards of <strong>USD 400/month</strong> in <strong>algorithmic media buying</strong>. We also offer standalone audit sprints to validate our multi-agent platform before scaling.</> },
  { question: 'Is there a minimum contract?', answer: <>No long-term contracts. You can start with a <strong>4–5 week sprint</strong> or <strong>month-to-month</strong> to validate autonomous performance before scaling.</> },
  { question: 'What is included in the platform fee?', answer: <>Platform access, AI setup, optimization, and reporting. Media spend (<strong>Google, Meta, TikTok</strong>, etc.) is paid directly to platforms with zero hidden markups.</> },
  { question: 'How fast will I see results?', answer: <><strong>Audits in 72 hours.</strong> Automated campaigns launch in under a week, with continuous algorithmic optimization compounding results from day one.</> },
  { question: 'Do I need an internal marketing team?', answer: <>No. Our <strong>multi-agent platform replaces your performance agency</strong>—zero extra headcount required.</> },
  { question: 'What does your tech stack include?', answer: <><strong>Native API integrations with Shopify, Meta, Google Ads, GA4, Python, Snowflake, and Advanced LLMs (Claude/OpenAI).</strong></> },
  { question: 'Do you offer standalone data audits?', answer: <><strong>Yes, our audit delivers an algorithmic action plan</strong> with prioritized quick wins and pipeline recommendations you can deploy immediately.</> },
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
        <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {faqs.map((f, i) => (
            <FAQItemComponent key={i} {...f} />
          ))}
        </div>
      </div>
    </Section>
  );
}