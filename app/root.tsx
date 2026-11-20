import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { useEffect } from "react";
import type { Route } from "./+types/root";
import { localeFromPath, useT } from "~/i18n";
import { Nav } from "~/components/Nav";
import { Footer } from "~/components/Footer";
import { Kofi } from "~/components/Kofi";
import { LocaleRedirect } from "~/components/LocaleRedirect";
import { NotFoundView } from "~/components/NotFoundView";
import "./styles/global.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "icon", href: "/favicon.png", type: "image/png" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Inter:wght@400..700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const lang = localeFromPath(useLocation().pathname);
  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b0a0d" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const t = useT();
  // Keep <html lang> in sync on client-side navigation between locales.
  useEffect(() => {
    document.documentElement.lang = t.locale;
  }, [t.locale]);
  return (
    <>
      <a className="skip-link" href="#main">
        {t("a11y.skip")}
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <div className="grain" aria-hidden="true" />
      <Kofi label={t("home.supportUs")} />
      <LocaleRedirect />
    </>
  );
}

export default function App() {
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const is404 = isRouteErrorResponse(error) && error.status === 404;
  if (is404) {
    return (
      <Shell>
        <NotFoundView />
      </Shell>
    );
  }
  const message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : "Something broke.";
  const stack = import.meta.env.DEV && error instanceof Error ? error.stack : undefined;
  return (
    <Shell>
      <section className="container section">
        <h1 className="section-title">{message}</h1>
        {stack && (
          <pre style={{ overflow: "auto", marginTop: "2rem", fontSize: 13 }}>
            <code>{stack}</code>
          </pre>
        )}
      </section>
    </Shell>
  );
}

