import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import Script from "next/script"; // Importing Script component

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <Script
          strategy="beforeInteractive" // or "lazyOnload" depending on the script
          src="//pl26373936.profitableratecpm.com/b2/5a/35/b25a352547c63a8a406bc8114678a2e3.js"
        />
        <Script
          strategy="beforeInteractive"
          async={false}
          data-cfasync="false"
          src="//pl26374070.profitableratecpm.com/aebe990fb5438a745c69d6f8f1cb32a9/invoke.js"
        />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl  px-6 flex-grow">
              <div id="container-aebe990fb5438a745c69d6f8f1cb32a9"></div>
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://github.com/riiz08"
                title="Github Riiz"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">MangEakkk Drama</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
