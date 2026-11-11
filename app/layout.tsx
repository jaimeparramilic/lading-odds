import './globals.css';

export const metadata = {
  title: 'ODDS | End-to-End Multi-Agent AI Platform',
  description: 'The full-cycle AI media and creative platform that replaces your agency.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
