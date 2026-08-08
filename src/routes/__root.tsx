import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

const SITE_URL = "https://agenciafacility.com.br";
const SITE_NAME = "Facility Software Brasil";
const SITE_DESC =
  "Agência digital e software house com mais de 16 anos de experiência em São Paulo. Criamos sistemas, aplicativos, automações e marketing de performance.";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

const jsonLD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description: SITE_DESC,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Paulista, 1080, 9º andar, sala 907",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "01310-100",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -23.5632,
    longitude: -46.6544,
  },
  telephone: "+55-11-98296-9676",
  email: "suporte@coconudi.com",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [],
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: `${SITE_NAME} | Agência Digital e Software House em São Paulo`,
      },
      {
        name: "description",
        content:
          "Agência digital e software house em São Paulo com mais de 16 anos. Criamos sistemas, aplicativos, automações e marketing de performance. Fale conosco!",
      },
      { name: "author", content: SITE_NAME },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "BR-SP" },
      { name: "geo.placename", content: "São Paulo" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: SITE_URL },
      {
        property: "og:title",
        content: `${SITE_NAME} | Agência Digital e Software House em São Paulo`,
      },
      {
        property: "og:description",
        content: SITE_DESC,
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE_URL}/favicon.ico` },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: `${SITE_NAME} | Agência Digital e Software House em São Paulo`,
      },
      {
        name: "twitter:description",
        content: SITE_DESC,
      },
    ],

    scripts: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(jsonLD),
      },
    ],

    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@300;400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
