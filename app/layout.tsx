import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Link } from "@heroui/link";

export const metadata: Metadata = {
  title: {
    default: "MangEakkk - Tonton Drama Melayu",
    template: "%s | MangEakkk",
  },
  description: "Tonton semua drama Melayu terkini secara percuma dan cepat.",
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
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <Navbar />
          <main className="container mx-auto max-w-7xl  px-6 flex-grow">
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
              <p className="text-primary">MangEakkk</p>
            </Link>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
