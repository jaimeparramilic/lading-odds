import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Globe,
  Lock,
  Mail,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { Pill } from '../landing/Pill';
import { Section } from '../landing/Section';

type LegalMode = 'terms' | 'privacy';

function LegalSectionBlock({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pt-6 border-t border-slate-100 first:pt-0 first:border-t-0">
      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 flex items-baseline gap-2.5">
        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-md px-2 py-0.5 shrink-0">
          {number}
        </span>
        <span>{title}</span>
      </h3>
      <div className="space-y-3 text-sm md:text-base text-slate-600 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function MetadataGrid({
  roleLabel,
  contactLabel,
}: {
  roleLabel: string;
  contactLabel: string;
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs md:text-sm mb-8">
      <div>
        <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] block">
          Effective Date / Last Updated
        </span>
        <span className="text-slate-900 font-semibold">November 19, 2026</span>
      </div>
      <div>
        <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] block">
          {roleLabel}
        </span>
        <span className="text-slate-900 font-semibold">
          Optimal Dynamic Decision Systems S.A.S. (&ldquo;ODDS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
        </span>
      </div>
      <div>
        <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] block">
          Website
        </span>
        <a
          href="https://oddsbots.online"
          className="text-indigo-700 hover:text-indigo-900 font-medium underline underline-offset-4"
        >
          https://oddsbots.online
        </a>
      </div>
      <div>
        <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] block">
          {contactLabel}
        </span>
        <a
          href="mailto:jaime.parra@oddsbots.online"
          className="text-indigo-700 hover:text-indigo-900 font-medium underline underline-offset-4"
        >
          jaime.parra@oddsbots.online
        </a>
      </div>
    </div>
  );
}

export function TermsOfServiceCard() {
  return (
    <article
      id="terms"
      className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden scroll-mt-8"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

      <div className="p-6 md:p-10 border-b border-slate-100 bg-slate-50/60">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 uppercase tracking-wider mb-4">
          <Scale className="w-3.5 h-3.5 mr-1.5" />
          Terms of Service
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          ODDS Agents — Terms of Service
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Governing access to and use of the ODDS Agents platform, APIs, and automated marketing infrastructure.
        </p>
      </div>

      <div className="p-6 md:p-10">
        <MetadataGrid roleLabel="Operator" contactLabel="Contact Email" />

        <div className="space-y-6">
          <LegalSectionBlock number="01" title="Acceptance of Terms">
            <p>
              By accessing or using the <strong className="text-slate-900">ODDS Agents</strong> web application,
              APIs, scripts, or related services (collectively, the &ldquo;Service&rdquo;) available at{' '}
              <code className="text-xs bg-slate-100 text-indigo-900 px-1.5 py-0.5 rounded">
                https://oddsbots.online
              </code>
              , you (&ldquo;Customer&rdquo;, &ldquo;Client&rdquo;, or &ldquo;User&rdquo;) agree to be bound by these
              Terms of Service (&ldquo;Terms&rdquo;). If you accept these Terms on behalf of a company, brand, or
              agency, you represent that you have the legal authority to bind that entity.
            </p>
          </LegalSectionBlock>

          <LegalSectionBlock number="02" title="Description of the Service">
            <p>
              ODDS Agents is a cloud-based marketing analytics, campaign management, and e-commerce optimization
              platform designed for merchants, brands, and marketing agencies. The Service enables authorized users to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Audit connected digital storefronts and advertising/social accounts;</li>
              <li>Generate marketing strategies, media plans, creative assets, and SEO/GEO content;</li>
              <li>
                Create, deploy, and optimize advertising campaigns on third-party platforms (such as TikTok, Meta, and
                Google) through official APIs;
              </li>
              <li>Configure conversion event forwarding and campaign attribution reporting.</li>
            </ul>
          </LegalSectionBlock>

          <LegalSectionBlock number="03" title="Account Registration & Access Control">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-900">Eligibility:</strong> You must be at least 18 years old and legally
                able to enter into binding contracts to use the Service.
              </li>
              <li>
                <strong className="text-slate-900">Security:</strong> You are responsible for safeguarding your account
                credentials, API keys, and role-based access controls within your workspace, and for all actions taken
                under your account.
              </li>
              <li>
                <strong className="text-slate-900">Workspace Isolation:</strong> Each customer operates within an
                isolated tenant workspace (
                <code className="text-xs bg-slate-100 text-indigo-900 px-1.5 py-0.5 rounded">BrandWorkspace</code>)
                restricted to its authorized users.
              </li>
            </ul>
          </LegalSectionBlock>

          <LegalSectionBlock number="04" title="Third-Party Platform Integrations">
            <p>
              The Service integrates via official OAuth 2.0 flows and authorized APIs with third-party platforms,
              including <strong className="text-slate-900">TikTok for Business</strong>,{' '}
              <strong className="text-slate-900">Meta (Facebook &amp; Instagram)</strong>,{' '}
              <strong className="text-slate-900">Google Ads / YouTube</strong>,{' '}
              <strong className="text-slate-900">Shopify</strong>,{' '}
              <strong className="text-slate-900">WooCommerce</strong>,{' '}
              <strong className="text-slate-900">VTEX</strong>, and{' '}
              <strong className="text-slate-900">PrestaShop</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-900">Compliance with Platform Rules:</strong> You agree to comply with
                the terms of service, developer policies, advertising guidelines, and privacy rules of every connected
                third-party platform.
              </li>
              <li>
                <strong className="text-slate-900">Authorization &amp; Revocation:</strong> By connecting an external
                account, you authorize ODDS Agents to read account metrics, manage authorized campaign assets, create
                draft/paused campaigns, and transmit authorized conversion signals strictly on your behalf. You may
                revoke access at any time from your workspace settings or directly within the third-party platform.
              </li>
              <li>
                <strong className="text-slate-900">Third-Party Availability:</strong> ODDS is not liable for API
                downtime, rate limits, policy changes, or account restrictions imposed by third-party platforms.
              </li>
            </ul>
          </LegalSectionBlock>

          <LegalSectionBlock number="05" title="Customer Data Ownership & Exclusive Use">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-900">Exclusive Ownership:</strong> You retain 100% of all rights, title,
                and interest in and to your store data, advertising account metrics, creative assets, and end-customer
                records (&ldquo;Customer Data&rdquo;).
              </li>
              <li>
                <strong className="text-slate-900">Exclusive Customer Purpose:</strong> ODDS processes Customer Data
                strictly on your behalf and for your exclusive use in providing the Service to your workspace. We do not
                sell, rent, or disclose your Customer Data to third parties for independent marketing or cross-client
                profiling.
              </li>
              <li>
                <strong className="text-slate-900">Compliance Responsibility:</strong> Where you deploy tracking tags,
                conversion APIs, or customer surveys through the Service, you represent and warrant that you have
                obtained all required user consents and provided legally compliant privacy notices under applicable law
                (including Colombian Law 1581 of 2012, GDPR, CCPA/CPRA, LGPD, and LFPDPPP, as applicable).
              </li>
              <li>
                <strong className="text-slate-900">Privacy Policy:</strong> Our data handling practices are governed by
                our Privacy Policy at{' '}
                <a
                  href="/privacy"
                  className="text-indigo-700 hover:text-indigo-900 font-medium underline underline-offset-4"
                >
                  https://oddsbots.online/privacy
                </a>
                .
              </li>
            </ul>
          </LegalSectionBlock>

          <LegalSectionBlock number="06" title="AI-Generated Outputs & Human-in-the-Loop Controls">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-900">Decision Support:</strong> The Service uses artificial intelligence
                models to generate strategic recommendations, media allocations, ad copy, images, videos, and
                storefront suggestions.
              </li>
              <li>
                <strong className="text-slate-900">Customer Review:</strong> You are responsible for reviewing and
                approving all campaigns, budgets, creative claims, and storefront updates before activating them in
                live production environments.
              </li>
              <li>
                <strong className="text-slate-900">No Performance Guarantee:</strong> ODDS provides analytical and
                automation tools on a best-efforts basis and does not guarantee specific return on ad spend (ROAS),
                revenue, or third-party ad approval.
              </li>
            </ul>
          </LegalSectionBlock>

          <LegalSectionBlock number="07" title="Fees, Billing & Ad Spend">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-900">Service Fees:</strong> Applicable subscription fees, fixed
                management fees, usage credits, and performance commissions are governed by your executed Order Form or
                Service Agreement.
              </li>
              <li>
                <strong className="text-slate-900">Platform Ad Spend:</strong> Media spend on TikTok, Meta, Google, or
                other ad networks is billed directly to you by the respective platform.
              </li>
            </ul>
          </LegalSectionBlock>

          <LegalSectionBlock number="08" title="Prohibited Uses">
            <p>You may not:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use the Service to promote unlawful, deceptive, infringing, or prohibited products or claims;</li>
              <li>
                Attempt to bypass multi-tenant isolation, scrape data, reverse engineer the software, or exceed API rate
                limits;
              </li>
              <li>Introduce malware or interfere with the security or availability of the Service.</li>
            </ul>
          </LegalSectionBlock>

          <LegalSectionBlock number="09" title="Intellectual Property">
            <p>
              All software, source code, algorithms, interfaces, and documentation comprising ODDS Agents (excluding
              Customer Data and third-party trademarks) remain the exclusive property of Optimal Dynamic Decision
              Systems S.A.S.
            </p>
          </LegalSectionBlock>

          <LegalSectionBlock number="10" title="Disclaimer of Warranties & Limitation of Liability">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-900">As-Is Basis:</strong> The Service (including sandbox and preview
                environments) is provided &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; without warranties of any
                kind, express or implied.
              </li>
              <li>
                <strong className="text-slate-900">Liability Cap:</strong> To the maximum extent permitted by applicable
                law, ODDS shall not be liable for indirect, incidental, consequential, or punitive damages, or loss of
                profits. ODDS&apos;s total aggregate liability under these Terms shall not exceed the fees paid by you
                to ODDS during the three (3) months preceding the event giving rise to the claim.
              </li>
            </ul>
          </LegalSectionBlock>

          <LegalSectionBlock number="11" title="Termination">
            <p>
              Either party may terminate use of the Service in accordance with the applicable agreement or by written
              notice. Upon termination, your access ceases and connected OAuth tokens and customer records are revoked
              and deleted in accordance with our Privacy Policy.
            </p>
          </LegalSectionBlock>

          <LegalSectionBlock number="12" title="Governing Law & Jurisdiction">
            <p>
              These Terms are governed by the laws of the{' '}
              <strong className="text-slate-900">Republic of Colombia</strong>, and any disputes shall be resolved
              before the competent courts of <strong className="text-slate-900">Bogotá D.C., Colombia</strong>, unless
              mandatory local law requires otherwise.
            </p>
          </LegalSectionBlock>

          <LegalSectionBlock number="13" title="Updates to Terms">
            <p>
              We may update these Terms periodically by posting the revised version at{' '}
              <a
                href="/terms"
                className="text-indigo-700 hover:text-indigo-900 font-medium underline underline-offset-4"
              >
                https://oddsbots.online/terms
              </a>{' '}
              and updating the Effective Date. Continued use of the Service constitutes acceptance of the updated Terms.
            </p>
          </LegalSectionBlock>

          <LegalSectionBlock number="14" title="Contact">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm">
              <p className="font-bold text-slate-900">Optimal Dynamic Decision Systems S.A.S.</p>
              <p className="text-slate-600">Bogotá D.C., Colombia</p>
              <p className="text-slate-600 mt-1">
                Email:{' '}
                <a
                  href="mailto:jaime.parra@oddsbots.online"
                  className="text-indigo-700 hover:text-indigo-900 font-medium underline underline-offset-4"
                >
                  jaime.parra@oddsbots.online
                </a>
              </p>
            </div>
          </LegalSectionBlock>
        </div>
      </div>
    </article>
  );
}

export function PrivacyPolicyCard() {
  return (
    <article
      id="privacy"
      className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden scroll-mt-8"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />

      <div className="p-6 md:p-10 border-b border-slate-100 bg-slate-50/60">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 uppercase tracking-wider mb-4">
          <Lock className="w-3.5 h-3.5 mr-1.5" />
          Privacy Policy
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          Privacy Policy &amp; Personal Data Processing Policy
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          How Optimal Dynamic Decision Systems S.A.S. collects, processes, isolates, and protects data in ODDS Agents.
        </p>
      </div>

      <div className="p-6 md:p-10">
        <MetadataGrid roleLabel="Data Controller / Processor" contactLabel="Privacy Contact" />

        <div className="space-y-6">
          <LegalSectionBlock number="01" title="Scope & Purpose">
            <p>
              This Privacy Policy explains how{' '}
              <strong className="text-slate-900">Optimal Dynamic Decision Systems S.A.S.</strong> collects, uses,
              protects, and deletes information when you visit{' '}
              <code className="text-xs bg-slate-100 text-indigo-900 px-1.5 py-0.5 rounded">
                https://oddsbots.online
              </code>{' '}
              or use the <strong className="text-slate-900">ODDS Agents</strong> platform (&ldquo;Service&rdquo;),
              including integrations with <strong className="text-slate-900">TikTok for Business</strong>,{' '}
              <strong className="text-slate-900">Meta</strong>, <strong className="text-slate-900">Google</strong>,{' '}
              <strong className="text-slate-900">Shopify</strong>,{' '}
              <strong className="text-slate-900">WooCommerce</strong>,{' '}
              <strong className="text-slate-900">VTEX</strong>, and{' '}
              <strong className="text-slate-900">PrestaShop</strong>.
            </p>
          </LegalSectionBlock>

          <LegalSectionBlock number="02" title="Categories of Data We Process">
            <p>
              Depending on how you use the Service, we process only the minimum data necessary to operate the platform:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-900">Account &amp; Workspace Information:</strong> Name, business email
                address, company name, role permissions, and authentication credentials of authorized platform users.
              </li>
              <li>
                <strong className="text-slate-900">Platform Integration Tokens &amp; Configuration:</strong> OAuth 2.0
                access/refresh tokens, ad account IDs, pixel IDs, store URLs, and webhook configurations authorized by
                the Customer.
              </li>
              <li>
                <strong className="text-slate-900">
                  Campaign, Storefront &amp; Aggregated Performance Metrics:
                </strong>{' '}
                Ad spend, impressions, views, clicks, conversion counts, product catalog metadata, storefront SEO/UX
                diagnostics, and aggregated social engagement metrics retrieved via official APIs.
              </li>
              <li>
                <strong className="text-slate-900">Transient Conversion &amp; Attribution Signals:</strong> Technical
                event identifiers (
                <code className="text-xs bg-slate-100 text-indigo-900 px-1.5 py-0.5 rounded">event_id</code>, click
                IDs, UTM parameters) and cryptographic one-way hashes (
                <code className="text-xs bg-slate-100 text-indigo-900 px-1.5 py-0.5 rounded">SHA-256</code>) transmitted
                in real time on behalf of the Customer solely to measure ad conversions and deduplicate events with the
                Customer&apos;s authorized ad platforms.{' '}
                <strong className="text-slate-900">
                  ODDS does not retain or build persistent databases of end-consumer Personally Identifiable Information
                  (PII).
                </strong>
              </li>
            </ul>
          </LegalSectionBlock>

          <LegalSectionBlock number="03" title="How We Use Information (Exclusive Customer Purpose)">
            <p>
              All data accessed or processed through the Service is used{' '}
              <strong className="text-slate-900">
                exclusively to deliver and support the Service for the respective Customer workspace
              </strong>
              :
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Authenticate and maintain authorized API connections with TikTok, Meta, Google, and e-commerce
                platforms;
              </li>
              <li>
                Audit storefronts, generate marketing plans, creative assets, and SEO/GEO content requested by the
                Customer;
              </li>
              <li>
                Deploy, monitor, and optimize advertising campaigns under the Customer&apos;s explicit approval;
              </li>
              <li>
                Forward deduplicated conversion events and generate sales attribution reports strictly for the
                Customer&apos;s own accounts;
              </li>
              <li>Maintain platform security, prevent fraud, and provide technical support.</li>
            </ol>

            <div className="mt-4 p-4 rounded-xl bg-indigo-50/70 border border-indigo-100">
              <p className="font-bold text-indigo-950 text-sm mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                Strict Non-Sharing &amp; Exclusive Use Commitment
              </p>
              <ul className="space-y-1.5 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>
                    Customer data and connected platform data are strictly isolated per customer workspace and used{' '}
                    <strong className="text-slate-900">exclusively for the benefit of that Customer</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>
                    We <strong className="text-slate-900">never sell, rent, trade, or monetize</strong> Customer data
                    or third-party platform API data.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>
                    We <strong className="text-slate-900">do not</strong> use data obtained from TikTok, Meta, Google,
                    or Shopify APIs to train public/foundation AI models or to target ads on behalf of unrelated third
                    parties.
                  </span>
                </li>
              </ul>
            </div>
          </LegalSectionBlock>

          <LegalSectionBlock number="04" title="Legal Basis & Compliance with Platform Policies">
            <p>
              We process personal data based on contractual necessity, explicit user/customer authorization (OAuth
              consent), and legitimate security interests, in compliance with:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-900">Colombian Law 1581 of 2012</strong> and Decree 1377 of 2013 (
                <em>General Personal Data Protection Regime</em>);
              </li>
              <li>
                Applicable international frameworks (including <strong className="text-slate-900">GDPR</strong>,{' '}
                <strong className="text-slate-900">CCPA/CPRA</strong>,{' '}
                <strong className="text-slate-900">LGPD</strong>, and{' '}
                <strong className="text-slate-900">LFPDPPP</strong>);
              </li>
              <li>
                <strong className="text-slate-900">TikTok Developer Terms &amp; Data Protection Requirements</strong>,{' '}
                <strong className="text-slate-900">Meta Platform Terms</strong>,{' '}
                <strong className="text-slate-900">Google API Services User Data Policy</strong>, and{' '}
                <strong className="text-slate-900">Shopify API Terms</strong>.
              </li>
            </ul>
          </LegalSectionBlock>

          <LegalSectionBlock number="05" title="Data Retention & Deletion">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-900">Active Account Retention:</strong> Account and configuration data
                are retained only while the Customer&apos;s workspace remains active.
              </li>
              <li>
                <strong className="text-slate-900">Transient Event Processing:</strong> Conversion and attribution
                signals processed server-side are handled transiently for event forwarding and deduplication and are
                automatically purged after short operational windows (typically within 30 days) or converted into
                non-identifiable aggregated campaign metrics.
              </li>
              <li>
                <strong className="text-slate-900">Disconnection &amp; Account Termination:</strong> When a Customer
                disconnects an integration or terminates their account, associated OAuth tokens are immediately
                revoked/deleted, and workspace data is permanently erased within{' '}
                <strong className="text-slate-900">30 days</strong> (or sooner upon verified deletion request,
                including mandatory platform redaction webhooks such as{' '}
                <code className="text-xs bg-slate-100 text-indigo-900 px-1.5 py-0.5 rounded">customers/redact</code> and{' '}
                <code className="text-xs bg-slate-100 text-indigo-900 px-1.5 py-0.5 rounded">shop/redact</code>).
              </li>
            </ul>
          </LegalSectionBlock>

          <LegalSectionBlock number="06" title="Security Measures">
            <p>We implement industry-standard technical and organizational safeguards, including:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Encryption in transit (<strong className="text-slate-900">TLS 1.2/1.3</strong>) and encryption at rest (
                <strong className="text-slate-900">AES-256 / KMS envelope encryption</strong> for OAuth tokens and
                secrets);
              </li>
              <li>
                Strict multi-tenant isolation with Row-Level Security (RLS) and role-based access control (RBAC);
              </li>
              <li>Continuous audit logging, access monitoring, and regular vulnerability assessments.</li>
            </ul>
          </LegalSectionBlock>

          <LegalSectionBlock number="07" title="Subprocessors & Infrastructure Providers">
            <p>
              We use trusted cloud infrastructure and AI service providers (such as{' '}
              <strong className="text-slate-900">
                Amazon Web Services — AWS{' '}
                <code className="text-xs bg-slate-100 text-indigo-900 px-1.5 py-0.5 rounded">us-east-1</code>
              </strong>
              ) bound by strict data processing agreements and confidentiality obligations solely to host and operate
              the Service.
            </p>
          </LegalSectionBlock>

          <LegalSectionBlock number="08" title="Data Subject Rights (ARCO & International Rights)">
            <p>
              Users and data subjects may exercise their rights to{' '}
              <strong className="text-slate-900">Access, Rectify, Update, Delete (Cancel), or Object</strong> to the
              processing of their personal data, as well as revoke previously granted authorization, at any time by
              contacting:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm space-y-1">
              <p>
                <strong className="text-slate-900">Email:</strong>{' '}
                <a
                  href="mailto:jaime.parra@oddsbots.online?subject=Data%20Privacy%20Request%20%E2%80%94%20ODDS%20Agents"
                  className="text-indigo-700 hover:text-indigo-900 font-medium underline underline-offset-4"
                >
                  jaime.parra@oddsbots.online
                </a>
              </p>
              <p>
                <strong className="text-slate-900">Subject Line:</strong>{' '}
                <code className="text-xs bg-white border border-slate-200 text-indigo-900 px-2 py-0.5 rounded">
                  Data Privacy Request — ODDS Agents
                </code>
              </p>
            </div>
            <p>
              Requests are acknowledged and resolved within the statutory timelines established by Colombian Law 1581 of
              2012 (maximum 10 business days for access queries and 15 business days for claims/deletion requests) or
              shorter applicable local deadlines.
            </p>
          </LegalSectionBlock>

          <LegalSectionBlock number="09" title="Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect operational or legal updates. The latest
              version will always be published at{' '}
              <a
                href="/privacy"
                className="text-indigo-700 hover:text-indigo-900 font-medium underline underline-offset-4"
              >
                https://oddsbots.online/privacy
              </a>
              .
            </p>
          </LegalSectionBlock>
        </div>
      </div>
    </article>
  );
}

export function LegalShell({
  mode,
  title,
  subtitle,
  children,
}: {
  mode: LegalMode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header Band matching ODDS Hero aesthetic */}
      <header className="bg-slate-50 border-b border-slate-200">
        <Section className="pt-8 pb-10 md:pt-12 md:pb-14">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="https://oddsbots.online"
                  className="relative h-12 md:h-14 flex-shrink-0 flex items-center no-underline hover:no-underline"
                >
                  <Image
                    src="/logos/odds.png"
                    alt="ODDS Logo"
                    width={56}
                    height={56}
                    className="h-full w-auto object-contain rounded-lg"
                    priority
                  />
                </a>
                <Pill className="bg-white border-slate-200 shadow-sm text-slate-600 text-xs md:text-sm py-1.5 px-4">
                  ODDS Agents · Legal &amp; Compliance
                </Pill>
              </div>

              <a
                href="https://oddsbots.online"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-900 bg-white border border-slate-200 hover:border-indigo-200 px-4 py-2 rounded-xl shadow-sm transition-all no-underline hover:no-underline w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to ODDS
              </a>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                {title}
              </h1>
              <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
                {subtitle}
              </p>

              {/* Quick Navigation */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/terms"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all no-underline hover:no-underline ${
                    mode === 'terms'
                      ? 'bg-indigo-950 text-white shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-indigo-300 hover:text-indigo-900'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Terms of Service
                </Link>
                <Link
                  href="/privacy"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all no-underline hover:no-underline ${
                    mode === 'privacy'
                      ? 'bg-indigo-950 text-white shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-indigo-300 hover:text-indigo-900'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 md:py-16">
        <Section>
          <div className="max-w-5xl mx-auto space-y-10">{children}</div>
        </Section>
      </main>

      {/* Footer matching ODDS Contact dark slate palette */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
        <Section className="py-10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-sm font-bold text-white">
                Optimal Dynamic Decision Systems S.A.S. (ODDS)
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Bogotá D.C., Colombia · Effective Date: November 19, 2026
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link
                href="/terms"
                className="text-slate-300 hover:text-white transition-colors no-underline hover:underline"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-slate-300 hover:text-white transition-colors no-underline hover:underline"
              >
                Privacy Policy
              </Link>
              <a
                href="https://oddsbots.online"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors no-underline hover:underline"
              >
                <Globe className="w-4 h-4 text-indigo-400" />
                oddsbots.online
              </a>
              <a
                href="mailto:jaime.parra@oddsbots.online"
                className="inline-flex items-center gap-1.5 text-indigo-300 hover:text-white transition-colors no-underline hover:underline"
              >
                <Mail className="w-4 h-4" />
                jaime.parra@oddsbots.online
              </a>
            </div>
          </div>
        </Section>
      </footer>
    </div>
  );
}
