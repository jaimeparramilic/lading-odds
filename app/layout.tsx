import './globals.css';

export const metadata = {
  title: 'ODDS Landing',
  description: 'Performance + AI para ecommerce y servicios',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
