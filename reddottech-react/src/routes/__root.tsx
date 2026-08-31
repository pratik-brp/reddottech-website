import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import SmoothScroll from "@/components/SmoothScroll";
import { PauseOffscreenAnimations } from "@/components/PauseOffscreenAnimations";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-[var(--brand-red)]">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[var(--brand-red)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-[var(--brand-red)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-slate-100"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Red Dot Technologies | Nepal's Certification Hub" },
      {
        name: "description",
        content:
          "Empowering Nepalese professionals with globally recognized certifications, immersive labs, and workforce-ready skills.",
      },
      { property: "og:site_name", content: "Red Dot Technologies" },
      { property: "og:title", content: "Red Dot Technologies | Professional Certification Hub" },
      {
        property: "og:description",
        content: "Global certifications and IT training delivered in partnership with USC Upstate.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://reddottech.com.np" },
      { property: "og:image", content: "https://reddottech.com.np/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Red Dot Technologies | Professional Certification Hub" },
      {
        name: "twitter:description",
        content: "Global certifications and IT training delivered in partnership with USC Upstate.",
      },
      { name: "twitter:image", content: "https://reddottech.com.np/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://reddottech.com.np" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Red Dot Technologies",
    url: "https://reddottech.com.np",
    logo: "https://reddottech.com.np/images/common/reddot-logo.svg",
    description:
      "Nepal's premier ICT certification and applied learning hub, partnered with the University of South Carolina Upstate (USA).",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Baluwatar-04",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      addressCountry: "NP",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+977-1-4535691",
      contactType: "admissions",
      email: "info@reddottech.com.np",
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61576029361697",
      "https://www.instagram.com/reddot.tech/",
      "https://www.linkedin.com/company/red-dot-technologies-nepal/",
      "https://www.tiktok.com/@reddot.tech",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const routerState = useRouterState();
  const pathname = routerState?.location?.pathname || "";
  const isAdminRoute = pathname.startsWith("/admin");

  const content = (
    <QueryClientProvider client={queryClient}>
      <LoadingIndicator />
      <Toaster position="top-right" richColors />
      {!isAdminRoute && <Navbar />}
      <main className="min-h-screen">
        <Outlet />
      </main>
      {!isAdminRoute && <Footer />}
    </QueryClientProvider>
  );

  if (isAdminRoute) {
    return content;
  }

  return (
    <SmoothScroll>
      <PauseOffscreenAnimations />
      {content}
    </SmoothScroll>
  );
}
