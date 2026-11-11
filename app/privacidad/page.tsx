// app/privacidad/page.tsx
import { Section } from '../components/landing/Section';

export const metadata = {
  title: 'Privacy & Data Processing Policy | ODDS',
  description: 'How we collect, process, and protect your personal and enterprise data.',
};

export default function PrivacidadPage() {
  return (
    <div className="bg-white text-neutral-900">
      <Section className="py-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight">Privacy &amp; Data Processing Policy</h1>
          <p className="mt-2 opacity-80 text-sm">Last updated: November 11, 2026</p>

          <div className="prose prose-neutral mt-6">
            <p>
              This policy describes how <strong>ODDS S.A.S.</strong> (&ldquo;we&rdquo;) processes personal and business information of
              users and enterprise clients. Data Controller: <strong>ODDS S.A.S.</strong>, email{' '}
              <a href="mailto:jaime.parra@oddsbots.online">jaime.parra@oddsbots.online</a>.
            </p>

            <h2>Data We Collect</h2>
            <ul>
              <li><strong>Contact</strong>: full name, work email, company, ad spend range, and primary objective (contact form).</li>
              <li><strong>Analytics</strong>: page visited, referrer, language, time zone, viewport dimensions, and
                  UTM parameters (e.g., <code>utm_source</code>, <code>gclid</code>, <code>fbclid</code>).</li>
              <li><strong>Platform Operations</strong>: minimal telemetry and API credentials required to operate autonomous pipelines (e.g., ad account IDs and e-commerce integrations).</li>
            </ul>

            <h2>Purposes</h2>
            <ul>
              <li>Respond to platform access requests and schedule product demos.</li>
              <li>Operate multi-agent AI media, creative, and attribution services (GA4, Meta, Google Ads, Shopify, VTEX).</li>
              <li>Improve platform reliability, latency, and usability through aggregated metrics.</li>
              <li>Transactional and commercial communications with your consent.</li>
            </ul>

            <h2>Legal Basis</h2>
            <p>
              Consent, execution of a contract or pre-contractual measures, and legitimate interest for essential analytics
              and platform security. You may withdraw consent at any time.
            </p>

            <h2>Data Sharing &amp; Processors</h2>
            <p>
              We do not sell your data. We may rely on enterprise infrastructure and LLM providers (such as Google Cloud,
              Vercel, and AI API providers) acting as data processors under appropriate security safeguards.
            </p>

            <h2>Retention</h2>
            <p>
              We retain data only for as long as necessary to fulfill the purposes described or comply with legal obligations.
              You may request deletion at any time.
            </p>

            <h2>Security</h2>
            <p>
              We enforce technical and organizational security controls (access control, encryption in transit, audit logs).
              No system is 100% impervious; we will notify affected parties of any incident as required by applicable law.
            </p>

            <h2>Your Rights</h2>
            <p>
              You have the right to access, update, rectify, delete, and object to the processing of your data, as well as data portability where applicable.
              To exercise these rights, write to <a href="mailto:jaime.parra@oddsbots.online">jaime.parra@oddsbots.online</a>.
            </p>

            <h2>Enterprise Audience</h2>
            <p>
              Our platform is intended exclusively for business and enterprise users and is not directed at minors.
            </p>

            <h2>Contact</h2>
            <p>
              Questions or requests: <a href="mailto:jaime.parra@oddsbots.online">jaime.parra@oddsbots.online</a>. Updates to this policy will be published on this page.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
