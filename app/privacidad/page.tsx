import {
  LegalShell,
  PrivacyPolicyCard,
} from '../components/legal/LegalDocuments';

export const metadata = {
  title: 'Privacy Policy | ODDS Agents',
  description:
    'Privacy Policy and Personal Data Processing Policy for ODDS Agents (Optimal Dynamic Decision Systems S.A.S.).',
};

export default function PrivacidadPage() {
  return (
    <LegalShell
      mode="privacy"
      title="Privacy Policy"
      subtitle="Personal data processing, workspace isolation, retention, and security commitments for ODDS Agents."
    >
      <PrivacyPolicyCard />
    </LegalShell>
  );
}
