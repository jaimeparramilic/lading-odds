// app/privacidad/page.tsx
import { Section } from '../components/landing/Section';

export const metadata = {
  title: 'Política de Tratamiento de Datos | ODDS',
  description: 'Cómo recolectamos, usamos y protegemos tus datos personales.',
};

export default function PrivacidadPage() {
  return (
    <div className="bg-white text-neutral-900">
      <Section className="py-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight">Política de Tratamiento de Datos</h1>
          <p className="mt-2 opacity-80 text-sm">Última actualización: 8 de septiembre de 2025</p>

          <div className="prose prose-neutral mt-6">
            <p>
              Esta política describe cómo <strong>ODDS</strong> (“nosotros”) trata la información personal de
              usuarios y clientes. Responsable del tratamiento: <strong>[[Razón social / ODDS]]</strong>,
              <strong>[[NIT/ID]]</strong>, dirección <strong>[[Dirección]]</strong>, email{' '}
              <a href="mailto:hola@odds.la">hola@odds.la</a>.
            </p>

            <h2>Datos que recolectamos</h2>
            <ul>
              <li><strong>Contacto</strong>: nombre, email, teléfono, empresa y objetivo (formulario de contacto).</li>
              <li><strong>Analítica</strong>: página visitada, referencia, idioma, zona horaria, tamaño de pantalla y
                  parámetros UTM (p. ej. <code>utm_source</code>, <code>gclid</code>, <code>fbclid</code>).</li>
              <li><strong>Operación</strong>: información mínima necesaria para prestar servicios (p. ej. IDs de cuentas publicitarias).</li>
            </ul>

            <h2>Finalidades</h2>
            <ul>
              <li>Responder solicitudes y brindar el diagnóstico gratuito.</li>
              <li>Prestar servicios de marketing digital (GA4, Meta, Google Ads, píxeles, UTMs, integraciones con tu sitio/ecommerce).</li>
              <li>Mejorar performance y usabilidad del sitio (métricas agregadas y anónimas cuando sea posible).</li>
              <li>Comunicación transaccional y/o comercial con tu consentimiento.</li>
            </ul>

            <h2>Base legal</h2>
            <p>
              Consentimiento, ejecución de un contrato/medidas precontractuales e interés legítimo para analítica
              esencial y seguridad. Puedes retirar tu consentimiento en cualquier momento.
            </p>

            <h2>Compartición y encargados</h2>
            <p>
              No vendemos tus datos. Podemos usar proveedores como Google (Google Ads/GA4/Apps Script), hosting
              y herramientas de analítica, actuando como encargados del tratamiento. Puede haber transferencias
              internacionales sujetas a garantías adecuadas.
            </p>

            <h2>Conservación</h2>
            <p>
              Conservamos los datos el tiempo necesario para las finalidades descritas o por exigencias legales.
              Puedes solicitar su eliminación cuando ya no sean necesarios.
            </p>

            <h2>Seguridad</h2>
            <p>
              Implementamos medidas técnicas y organizativas razonables (control de acceso, cifrado en tránsito,
              registros). Ningún sistema es 100% seguro; notificaremos incidentes conforme a la ley aplicable.
            </p>

            <h2>Derechos del titular</h2>
            <p>
              Acceder, actualizar, rectificar, suprimir y oponerte al tratamiento; también portabilidad cuando aplique.
              Para ejercerlos, escribe a <a href="mailto:hola@odds.la">hola@odds.la</a>.
            </p>

            <h2>Menores</h2>
            <p>
              Nuestros servicios están dirigidos a empresas y no se orientan a menores de edad.
            </p>

            <h2>Contacto</h2>
            <p>
              Dudas o solicitudes: <a href="mailto:hola@odds.la">hola@odds.la</a>. Publicaremos cambios a esta política en esta página.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
