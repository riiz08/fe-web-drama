"use client";

import { Link } from "@heroui/link";
import { Navbar } from "@heroui/navbar";

const AdsWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
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
    </div>
  );
};

export default AdsWrapper;
