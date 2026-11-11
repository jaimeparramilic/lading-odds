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
              <Rocket className="h-5 w-5" /> Rapid Diagnostic
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm opacity-90">
            In 72&nbsp;hours we audit your campaigns, storefront, and telemetry (GA4, pixels, UTMs).
            We deliver a prioritized 5-step algorithmic action plan to recover lost revenue.
          </CardContent>
        </Card>

        {/* Paso 2 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" /> Setup &amp; Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm opacity-90">
            Within 7&nbsp;days everything is live: deterministic attribution, clean UTMs,
            and Meta/Google campaigns orchestrated with dynamic creatives.
          </CardContent>
        </Card>

        {/* Paso 3 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5" /> Autonomous Optimization
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm opacity-90">
            Continuous algorithmic adjustments to lower CPA and scale ROAS. Real-time telemetry:
            what changed, what scaled, and what comes next.
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
