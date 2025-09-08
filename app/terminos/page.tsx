// app/terminos/page.tsx
import { Section } from '../components/landing/Section';

export const metadata = {
  title: 'Términos de Servicio | ODDS',
  description: 'Condiciones para el uso del sitio y la prestación de servicios.',
};

export default function TerminosPage() {
  return (
    <div className="bg-white text-neutral-900">
      <Section className="py-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight">Términos de Servicio</h1>
          <p className="mt-2 opacity-80 text-sm">Última actualización: 8 de septiembre de 2025</p>

          <div className="prose prose-neutral mt-6">
            <h2>1. Objeto</h2>
            <p>
              Estos términos regulan el uso del sitio <strong>odds.la</strong> y la prestación de servicios de
              marketing digital por parte de <strong>ODDS</strong> a clientes empresariales.
            </p>

            <h2>2. Alcance del servicio</h2>
            <p>
              Incluye auditoría, setup, operación y optimización de campañas en plataformas como Google Ads, Meta,
              TikTok y LinkedIn; medición (GA4, píxeles, UTMs) e integraciones con tu sitio/ecommerce.
            </p>

            <h2>3. Responsabilidades del cliente</h2>
            <ul>
              <li>Proveer accesos y datos necesarios, veraces y oportunos.</li>
              <li>Cumplir políticas de las plataformas publicitarias y leyes aplicables.</li>
              <li>Aprobar creatividades y configuraciones antes de su activación, cuando aplique.</li>
            </ul>

            <h2>4. Honorarios y facturación</h2>
            <p>
              Se pactan por propuesta. Los costos de pauta son asumidos por el cliente. Retrasos en pago pueden
              suspender la ejecución hasta normalizarse.
            </p>

            <h2>5. Propiedad intelectual</h2>
            <p>
              El cliente mantiene la titularidad de sus marcas, datos y cuentas. ODDS conserva metodologías,
              plantillas y know-how. Las piezas entregadas al cliente podrán usarse conforme a la propuesta.
            </p>

            <h2>6. Confidencialidad</h2>
            <p>
              La información no pública se mantendrá confidencial y se usará solo para la ejecución del servicio.
            </p>

            <h2>7. Datos personales</h2>
            <p>
              El tratamiento se rige por nuestra <a href="/privacidad">Política de Tratamiento de Datos</a>.
            </p>

            <h2>8. Limitación de responsabilidad</h2>
            <p>
              ODDS no garantiza resultados específicos. No seremos responsables por daños indirectos o pérdida de
              beneficios. La responsabilidad total se limita al monto pagado por el servicio en los últimos 3 meses.
            </p>

            <h2>9. Vigencia, terminación y cambios</h2>
            <p>
              Estos términos aplican desde su aceptación y pueden actualizarse. Las partes pueden terminar el servicio
              con aviso escrito conforme a la propuesta específica.
            </p>

            <h2>10. Ley aplicable y controversias</h2>
            <p>
              Se rigen por las leyes de <strong>Colombia</strong>. Cualquier disputa se resolverá ante los
              tribunales competentes de <strong>Bogotá</strong>.
            </p>

            <p className="text-sm opacity-70 mt-6">
              Este documento es informativo y no constituye asesoría legal. Ajusta los campos [[…]] según tu empresa.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
