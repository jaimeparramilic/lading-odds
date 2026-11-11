// app/terminos/page.tsx
import { Section } from '../components/landing/Section';

export const metadata = {
  title: 'Terms of Service | ODDS',
  description: 'Conditions governing use of the ODDS platform and services.',
};

export default function TerminosPage() {
  return (
    <div className="bg-white text-neutral-900">
      <Section className="py-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-2 opacity-80 text-sm">Last updated: November 11, 2026</p>

          <div className="prose prose-neutral mt-6">
            <h2>1. Scope</h2>
            <p>
              These terms govern the use of <strong>oddsbots.online</strong> and the multi-agent AI media and creative
              platform provided by <strong>ODDS S.A.S.</strong> to enterprise clients.
            </p>

            <h2>2. Platform Capabilities</h2>
            <p>
              Includes automated account auditing, AI strategy and creative generation, autonomous media planning,
              attribution telemetry (GA4, pixels, UTMs), and native API integrations with e-commerce platforms.
            </p>

            <h2>3. Client Responsibilities</h2>
            <ul>
              <li>Provide accurate, timely API access and required account permissions.</li>
              <li>Comply with advertising platform policies and applicable laws.</li>
              <li>Review and approve automated campaign configurations where required.</li>
            </ul>

            <h2>4. Fees &amp; Billing</h2>
            <p>
              Platform fees are agreed by contract or subscription plan. Media spend is paid directly to ad networks by
              the client. Late payments may suspend automated pipeline execution until resolved.
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
              The client retains ownership of its brands, data, and ad accounts. ODDS retains all rights to its multi-agent
              software architecture, models, and proprietary workflows.
            </p>

            <h2>6. Confidentiality</h2>
            <p>
              Non-public information shall remain confidential and be used solely for operating the platform and delivering
              contracted services.
            </p>

            <h2>7. Personal Data</h2>
            <p>
              Data processing is governed by our <a href="/privacidad">Privacy &amp; Data Processing Policy</a>.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              ODDS does not guarantee specific revenue outcomes. We are not liable for indirect damages or lost profits.
              Total liability is limited to platform fees paid during the preceding 3 months.
            </p>

            <h2>9. Term, Termination &amp; Updates</h2>
            <p>
              These terms apply upon acceptance and may be updated from time to time. Either party may terminate service
              with written notice as specified in the applicable agreement.
            </p>

            <h2>10. Governing Law &amp; Jurisdiction</h2>
            <p>
              These terms are governed by the laws of <strong>Colombia</strong>. Any dispute shall be resolved before
              the competent courts of <strong>Bogotá</strong>.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
