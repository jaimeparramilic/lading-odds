import {
  LegalShell,
  TermsOfServiceCard,
} from '../components/legal/LegalDocuments';

export const metadata = {
  title: 'Terms of Service | ODDS Agents',
  description:
    'Terms of Service governing access to and use of the ODDS Agents platform (oddsbots.online).',
};

export default function TermsPage() {
  return (
    <LegalShell
      mode="terms"
      title="Terms of Service"
      subtitle="Terms and conditions governing use of the ODDS Agents web application, APIs, and automated marketing platform."
    >
      <TermsOfServiceCard />
    </LegalShell>
  );
}
